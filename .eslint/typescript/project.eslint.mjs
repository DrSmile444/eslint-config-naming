/* eslint-disable security/detect-non-literal-fs-filename */
import * as fs from 'node:fs';

import tseslint from 'typescript-eslint';

import { eslintLogger } from '../logger.mjs';
import { resolveTsconfigPath } from '../tsconfig.utils.mjs';

const logger = eslintLogger('typescript-project');

/**
 * Builds the TypeScript parser config, resolving tsconfig automatically or from options.
 * @param {{ rootDir?: string, tsconfig?: string, scriptstsconfig?: string }} [options]
 * @returns {import('typescript-eslint').ConfigArray}
 */
export function createProjectConfig(options = {}) {
  const rootDir = options.rootDir || process.cwd();
  const tsconfigPath = resolveTsconfigPath(options);

  if (!fs.existsSync(tsconfigPath)) {
    logger.warn(`tsconfig not found at ${tsconfigPath}. Falling back to projectService.`);
  }

  const scriptsTsconfigPath = options.scriptstsconfig
    ? resolveTsconfigPath({ rootDir, tsconfig: options.scriptstsconfig })
    : resolveTsconfigPath({ rootDir, tsconfig: 'tsconfig.scripts.json' });

  const scriptsConfig = fs.existsSync(scriptsTsconfigPath)
    ? {
        files: ['scripts/**/*.ts'],
        languageOptions: {
          parser: tseslint.parser,
          parserOptions: {
            project: scriptsTsconfigPath,
            tsconfigRootDir: rootDir,
          },
        },
      }
    : {
        files: ['scripts/**/*.ts'],
        languageOptions: {
          parser: tseslint.parser,
          parserOptions: {
            projectService: true,
            tsconfigRootDir: rootDir,
          },
        },
      };

  return tseslint.config(
    {
      files: ['**/*.{ts,tsx,mts,cts}'],
      ignores: ['scripts/**'],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: rootDir,
        },
      },
    },
    scriptsConfig,
  );
}

/**
 * @description ESLint config for TypeScript parser using projectService for type-aware linting.
 * @author Dmytro Vakulenko
 * @see https://typescript-eslint.io/linting/typed-linting/
 */
export default createProjectConfig();
