/* eslint-disable security/detect-non-literal-fs-filename */
import * as fs from 'node:fs';
import path from 'node:path';

import json5 from 'json5';

import { eslintLogger } from './logger.mjs';

const logger = eslintLogger('tsconfig-utils');

/** Ordered list of tsconfig filenames to try during auto-discovery. */
const TSCONFIG_CANDIDATES = ['tsconfig.json', 'tsconfig.base.json', 'tsconfig.main.json', 'tsconfig.app.json'];

/**
 * Resolves the path to a tsconfig file.
 * If `tsconfig` is provided in options, resolves it relative to `rootDir`.
 * Otherwise, walks `TSCONFIG_CANDIDATES` in order and returns the first that exists.
 * Falls back to `tsconfig.json` if none are found.
 * @param {{ rootDir?: string, tsconfig?: string }} [options]
 * @returns {string} Absolute path to the tsconfig file.
 */
export function resolveTsconfigPath(options = {}) {
  const rootDir = options.rootDir ?? process.cwd();

  if (options.tsconfig) {
    return path.resolve(rootDir, options.tsconfig);
  }

  for (const candidate of TSCONFIG_CANDIDATES) {
    const fullPath = path.resolve(rootDir, candidate);

    if (fs.existsSync(fullPath)) {
      logger.info(`Auto-discovered tsconfig at: ${fullPath}`);

      return fullPath;
    }
  }

  return path.resolve(rootDir, 'tsconfig.json');
}

/**
 * Parses a tsconfig file and returns its contents as a typed object.
 * @param {string} tsconfigPath - Path to the tsconfig file
 * @returns {import('type-fest').TsConfigJson | undefined} - Parsed tsconfig object, or undefined if parsing fails
 */
export function parseTsconfig(tsconfigPath) {
  try {
    const fileContent = fs.readFileSync(tsconfigPath, 'utf8');

    return json5.parse(fileContent);
  } catch (error) {
    logger.warn(`Warning: Failed to parse ${tsconfigPath}:`, error.message);
    throw error;
  }
}

/**
 * Resolves tsconfig paths from a tsconfig file and its references
 * @param {string} tsconfigPath - Path to the tsconfig file
 * @param {Set<string>} visited - Set of already visited files to prevent circular references
 * @returns {Record<string, string[]>} - An object where each key is a path alias (e.g. "@app/*") and the value is an array of paths (e.g. ["src/app/*"]).
 *
 * @example
 * // Given tsconfig.json:
 * {
 *   "compilerOptions": {
 *     "paths": {
 *       "@app/*": ["src/app/*"],
 *       "@utils/*": ["src/utils/*"]
 *     }
 *   }
 * }
 *
 * // Calling resolveTsconfigPaths('path/to/tsconfig.json') returns:
 * {
 *   "@app/*": ["src/app/*"],
 *   "@utils/*": ["src/utils/*"]
 * }
 */
export function resolveTsconfigPaths(tsconfigPath, visited = new Set()) {
  if (visited.has(tsconfigPath)) {
    return {};
  }

  visited.add(tsconfigPath);

  let mergedPaths = {};

  try {
    const tsconfigContent = parseTsconfig(tsconfigPath);

    if (!tsconfigContent) {
      return mergedPaths;
    }

    // Add paths from current config
    if (tsconfigContent?.compilerOptions?.paths && typeof tsconfigContent.compilerOptions.paths === 'object') {
      mergedPaths = {
        ...mergedPaths,
        ...tsconfigContent.compilerOptions.paths,
      };
    }

    // Recursively process references
    if (Array.isArray(tsconfigContent?.references)) {
      const tsconfigDirectory = path.dirname(tsconfigPath);

      for (const reference of tsconfigContent.references) {
        const referencePath = path.resolve(tsconfigDirectory, reference.path);
        const referencesPaths = resolveTsconfigPaths(referencePath, visited);

        mergedPaths = { ...mergedPaths, ...referencesPaths };
      }
    }
  } catch {
    logger.warn(`Warning: Failed to resolve paths from ${tsconfigPath}`);
  }

  return mergedPaths;
}
