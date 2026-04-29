/* eslint-disable sonarjs/slow-regex,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,no-continue,no-plusplus,no-use-before-define,@typescript-eslint/no-require-imports,global-require,@typescript-eslint/no-unsafe-call,sonarjs/no-alphabetical-sort,unicorn/no-array-sort,security/detect-non-literal-fs-filename,security/detect-object-injection,security/detect-unsafe-regex,regexp/no-super-linear-backtracking */
import { spawn } from 'node:child_process';
import type { Dirent } from 'node:fs';
import { promises as fs } from 'node:fs';
import { builtinModules } from 'node:module';
import path from 'node:path';

import { resolveTsconfigPaths } from '../.eslint/tsconfig.utils.mjs';

interface CliOptions {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  dir: string;
  dryRun: boolean;
  dev: boolean;
  packageManager?: 'bun' | 'npm' | 'pnpm' | 'yarn';
}

class ExitError extends Error {
  readonly exitCode: number;

  constructor(exitCode: number, message = '') {
    super(message);
    this.name = 'ExitError';
    this.exitCode = exitCode;
  }
}

const BUILTIN_SET = new Set([
  ...builtinModules,
  ...builtinModules
    .map((nodeModule) => `node:${nodeModule}`)
    .map((nodeModule) => (nodeModule.startsWith('node:') ? nodeModule.slice(5) : nodeModule)),
]);

const DEFAULT_INCLUDE_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);

const DEFAULT_EXCLUDE_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.turbo', '.output', 'coverage', '.vercel']);

/**
 * Minimal, robust-enough extractor for import specifiers from TS/JS files.
 * Handles:
 *   import x from 'pkg'
 *   import 'pkg'
 *   export * from 'pkg'
 *   export {x} from 'pkg'
 *   const x = require('pkg')
 *   await import('pkg')
 *
 * It ignores relative/absolute paths and filters built-ins later.
 * @param code - Source code string to extract specifiers from.
 * @returns Set of module specifier strings.
 */
function extractModuleSpecifiers(code: string): string[] {
  const specs = new Set<string>();

  // ESM static imports & re-exports
  const importExportRe = /\b(?:import|export)\s+(?:[^'"]*?\sfrom\s*)?['"]([^'"]+)['"]/g;

  for (const moduleSpecifier of code.matchAll(importExportRe)) {
    specs.add(moduleSpecifier[1]);
  }

  // CommonJS require()
  const requireRe = /\brequire\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

  for (const moduleArray of code.matchAll(requireRe)) {
    specs.add(moduleArray[1]);
  }

  // Dynamic import()
  const dynImportRe = /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

  for (const moduleSpecifier of code.matchAll(dynImportRe)) {
    specs.add(moduleSpecifier[1]);
  }

  return [...specs];
}

/**
 * Convert 'lodash/map' -> 'lodash', '@types/node/fs' -> '@types/node'
 * @param spec - Module specifier string.
 * @returns Top-level package name.
 */
function toTopLevelPackageName(spec: string): string {
  if (spec.startsWith('@')) {
    const parts = spec.split('/');

    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : spec;
  }

  return spec.split('/')[0];
}

/**
 * Returns true if the specifier looks like an npm package name (not a relative or absolute path).
 * @param spec - Module specifier string.
 * @returns Whether the specifier is a package-like import.
 */
function isPackageLike(spec: string): boolean {
  return !!spec && !spec.startsWith('.') && !spec.startsWith('/') && !spec.includes(':');
}

/**
 * Recursively walks a directory, yielding file paths matching the given extensions.
 * @param directory - Root directory to walk.
 * @param includeExtension - Set of file extensions to include (e.g. `'.ts'`).
 * @param excludeDirectories - Set of directory names to skip (e.g. `'node_modules'`).
 * @yields {string} Absolute paths to matching files.
 */
async function* walkDirectory(directory: string, includeExtension: Set<string>, excludeDirectories: Set<string>): AsyncGenerator<string> {
  let entries: Dirent[];

  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const full = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!excludeDirectories.has(entry.name)) {
        yield* walkDirectory(full, includeExtension, excludeDirectories);
      }
    } else if (entry.isFile()) {
      const extension = path.extname(entry.name).toLowerCase();

      if (includeExtension.has(extension)) {
        yield full;
      }
    }
  }
}

/**
 * Reads and parses a JSON file, returning null on any error.
 * @param filePath - Path to the JSON file.
 * @returns Parsed JSON value, or null if the file cannot be read or parsed.
 */
async function readJson<T = unknown>(filePath: string): Promise<T | null> {
  try {
    const txt = await fs.readFile(filePath, 'utf8');

    return JSON.parse(txt) as T;
  } catch {
    return null;
  }
}

/**
 * Detects the package manager in use by checking lockfile presence or the `packageManager` field.
 * @param projectDirectory - Root directory of the project.
 * @param forced - Optional override to skip detection and use a specific package manager.
 * @returns The detected or forced package manager name.
 */
function detectPackageManager(projectDirectory: string, forced?: CliOptions['packageManager']) {
  if (forced) {
    return forced;
  }

  const has = (filePath: string) => safeExists(path.join(projectDirectory, filePath));

  // lockfile-based detection
  if (has('pnpm-lock.yaml')) {
    return 'pnpm';
  }

  if (has('yarn.lock')) {
    return 'yarn';
  }

  if (has('bun.lockb')) {
    return 'bun';
  }

  // packageManager field
  try {
    const packageJsonPath = path.join('package.json');

    const packageFile = JSON.parse(fs.readFile(packageJsonPath, 'utf8') as unknown as string);

    const pm: string | undefined = packageFile?.packageManager;

    if (pm?.startsWith('pnpm@')) {
      return 'pnpm';
    }

    if (pm?.startsWith('yarn@')) {
      return 'yarn';
    }

    if (pm?.startsWith('bun@')) {
      return 'bun';
    }

    if (pm?.startsWith('npm@')) {
      return 'npm';
    }
  } catch {
    /* ignore */
  }

  return 'npm'; // default fallback
}

/**
 * Returns true if the given path is accessible on the filesystem.
 * @param filePath - Path to check.
 * @returns Whether the path exists and is accessible.
 */
function safeExists(filePath: string): boolean {
  try {
    // Using sync here is fine: tiny calls and avoids race conditions
    require('node:fs').accessSync(filePath);

    return true;
  } catch {
    return false;
  }
}

/**
 * Returns true if the package is present in the project's node_modules directory.
 * @param projectDirectory - Root directory of the project.
 * @param topLevel - Top-level package name (e.g. `'lodash'` or `'@types/node'`).
 * @returns Whether the package is installed.
 */
function isInstalledInNodeModules(projectDirectory: string, topLevel: string): boolean {
  // Support scoped packages in node_modules
  const nmPath = path.join(projectDirectory, 'node_modules', topLevel);

  return safeExists(nmPath);
}

/**
 * Reads the `paths` aliases from a tsconfig file and returns them as a list of alias prefixes.
 * @param tsconfigPath - Path to the tsconfig.json file.
 * @returns Array of alias prefix strings (trailing `*` stripped).
 */
function getTsconfigAliases(tsconfigPath: string): string[] {
  try {
    const pathsObject = resolveTsconfigPaths(tsconfigPath);

    return Object.keys(pathsObject).map((alias) => alias.replace(/\*$/, ''));
  } catch {
    return [];
  }
}

/**
 * Reads a source file and adds all referenced external package names to the `referenced` set.
 * @param file - Absolute path to the source file.
 * @param tsconfigAliases - List of tsconfig path alias prefixes to skip.
 * @param referenced - Set to accumulate discovered package names into.
 */
async function collectReferencedFromFile(file: string, tsconfigAliases: string[], referenced: Set<string>) {
  const code = await fs.readFile(file, 'utf8');

  for (const spec of extractModuleSpecifiers(code)) {
    if (!isPackageLike(spec)) {
      continue;
    }

    if (tsconfigAliases.some((alias) => spec.startsWith(alias))) {
      continue;
    }

    const bare = spec.startsWith('node:') ? spec.slice(5) : spec;

    if (BUILTIN_SET.has(bare)) {
      continue;
    }

    referenced.add(toTopLevelPackageName(bare));
  }
}

interface FindUninstalledDepsReturn {
  referencedTopLevel: Set<string>;
  uninstalled: string[];
}

/**
 * Scans a directory tree for all imported packages and returns those not found in node_modules.
 * @param root - Root directory to scan.
 * @returns Sets of all referenced packages and the subset that are not installed.
 */
async function findUninstalledDeps(root: string): Promise<FindUninstalledDepsReturn> {
  const referenced = new Set<string>();

  // Get tsconfig path aliases
  const tsconfigPath = path.join(root, '../tsconfig.json');
  const tsconfigAliases = getTsconfigAliases(tsconfigPath);

  for await (const file of walkDirectory(root, DEFAULT_INCLUDE_EXT, DEFAULT_EXCLUDE_DIRS)) {
    await collectReferencedFromFile(file, tsconfigAliases, referenced);
  }

  const uninstalled = [...referenced].filter((packageFile) => !isInstalledInNodeModules(root, packageFile));

  return { referencedTopLevel: referenced, uninstalled };
}

/**
 * Runs the package manager install command for the given packages.
 * @param projectDirectory - Root directory of the project.
 * @param pkgs - Package names to install.
 * @param pm - Package manager to use.
 * @param development - Whether to install as devDependencies.
 * @returns Exit code from the package manager process.
 */
async function installDependencies(
  projectDirectory: string,
  pkgs: string[],
  pm: ReturnType<typeof detectPackageManager>,
  development: boolean,
): Promise<number> {
  if (pkgs.length === 0) {
    return 0;
  }

  const cmds: Record<string, [string, string[]]> = {
    pnpm: development ? ['pnpm', ['add', '-D', ...pkgs]] : ['pnpm', ['add', ...pkgs]],
    yarn: development ? ['yarn', ['add', '--dev', ...pkgs]] : ['yarn', ['add', ...pkgs]],
    npm: development ? ['npm', ['i', '-D', ...pkgs]] : ['npm', ['i', ...pkgs]],
    bun: development ? ['bun', ['add', '-d', ...pkgs]] : ['bun', ['add', ...pkgs]],
  };

  const [cmd, parsedArguments] = cmds[pm] ?? cmds.npm;

  return new Promise<number>((resolve, reject) => {
    const child = spawn(cmd, parsedArguments, { stdio: 'inherit', cwd: projectDirectory, shell: process.platform === 'win32' });

    child.on('close', (code) => {
      resolve(code ?? 1);
    });

    child.on('error', reject);
  });
}

/**
 * Parses command-line arguments into a CliOptions object.
 * @param argv - Raw process.argv array.
 * @returns Parsed CLI options.
 */
function parseArguments(argv: string[]): CliOptions {
  const out: CliOptions = { dir: '', dryRun: false, dev: false };

  for (let index = 2; index < argv.length; index += 1) {
    const option = argv[index];

    if (option === '--dry-run') {
      out.dryRun = true;
    } else if (option === '--dev' || option === '-D') {
      out.dev = true;
    } else if (option.startsWith('--dir=')) {
      out.dir = option.slice('--dir='.length);
    } else if (option === '--dir' && index + 1 < argv.length) {
      out.dir = argv[++index];
    } else if (option.startsWith('--package-manager=')) {
      out.packageManager = option.slice('--package-manager='.length) as CliOptions['packageManager'];
    } else if (option === '--package-manager' && index + 1 < argv.length) {
      out.packageManager = argv[++index] as CliOptions['packageManager'];
    } else if (option === '-h' || option === '--help') {
      printHelpAndExit();
    } else {
      // ignore unknowns to keep it simple/forwards-compatible
    }
  }

  if (!out.dir) {
    console.error('Error: --dir is required');
    printHelpAndExit(1);
  }

  out.dir = path.resolve(process.cwd(), out.dir);

  return out;
}

/**
 * Prints usage help to stdout and throws an ExitError to terminate the process.
 * @param code - Exit code to use (0 for help, 1 for error).
 */
function printHelpAndExit(code = 0): never {
  console.info(
    `
Usage:
  tsx tools/find-uninstalled-deps.ts --dir <project> [--dry-run] [--dev|-D] [--package-manager <pnpm|yarn|npm|bun>]

Description:
  Scans the project for imported/required packages that are NOT present in node_modules.
  Prints the list. If not --dry-run, installs them as dependencies (default) or devDependencies (with --dev/-D).

Examples:
  tsx tools/find-uninstalled-deps.ts --dir . --dry-run
  tsx tools/find-uninstalled-deps.ts --dir ./packages/app --dev
  tsx tools/find-uninstalled-deps.ts --dir ./packages/app -D --package-manager pnpm
`.trim(),
  );

  throw new ExitError(code);
}

/**
 * CLI entry point: scans the project, reports uninstalled dependencies, and optionally installs them.
 */
async function main() {
  const options = parseArguments(process.argv);

  const packageJsonPath = path.join('package.json');

  const packageJson = await readJson(packageJsonPath);

  if (!packageJson) {
    throw new Error(`Error: package.json not found under ${options.dir}`);
  }

  console.info(`🔎 Scanning: ${options.dir}`);
  const { uninstalled, referencedTopLevel } = await findUninstalledDeps(options.dir);

  const pm = detectPackageManager(options.dir, options.packageManager);

  console.info(`📦 Package manager: ${pm}`);

  // Optional: give visibility into what's referenced
  console.info(`📚 Referenced packages (top-level): ${String(referencedTopLevel.size)}`);

  if (referencedTopLevel.size > 0) {
    console.info([...referencedTopLevel].sort().join(', '));
  }

  if (uninstalled.length === 0) {
    console.info('✅ No uninstalled dependencies detected.');

    return;
  }

  console.info('\n🚩 Uninstalled dependencies:');

  for (const optionalParameters of uninstalled) {
    console.info('  -', optionalParameters);
  }

  if (options.dryRun) {
    console.info('\nℹ️  Dry-run enabled; skipping installation.');

    return;
  }

  const installType = options.dev ? 'devDependencies' : 'dependencies';

  console.info(`\n🧰 Installing as ${installType}...`);
  const code = await installDependencies(options.dir, uninstalled, pm, options.dev);

  if (code === 0) {
    console.info(`✅ Installed missing packages as ${installType}.`);
  } else {
    throw new ExitError(code, `❌ Installer exited with code ${String(code)}`);
  }
}

main().catch((error: unknown) => {
  if (error instanceof ExitError) {
    if (error.message) {
      console.error(error.message);
    }

    process.exitCode = error.exitCode;
  } else {
    console.error('Unexpected error:', error);
    process.exitCode = 1;
  }
});
