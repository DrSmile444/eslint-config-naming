import { includeIgnoreFile } from '@eslint/compat';
import pluginJs from '@eslint/js';
import { defineConfig } from 'eslint/config';

import lintlordEslint from './lintlord/lintlord.eslint.mjs';
import airbnbBaseEslint from './node/airbnb-base.eslint.mjs';
import customStyleEslint from './node/custom-style.eslint.mjs';
import dependEslint from './node/depend.eslint.mjs';
import eslintRulesEslint from './node/eslint-rules.eslint.mjs';
import { createImportAliasConfig } from './node/import-alias.eslint.mjs';
import jsdocEslint from './node/jsdoc.eslint.mjs';
import nConfig from './node/n.eslint.mjs';
import noBarrelFilesEslint from './node/no-barrel-files.eslint.mjs';
import noSecretsEslint from './node/no-secrets.eslint.mjs';
import { createOrderedImportsConfig } from './node/ordered-imports.eslint.mjs';
import perfectionistEslint from './node/perfectionist.eslint.mjs';
import prettierEslint from './node/prettier.eslint.mjs';
import promiseEslint from './node/promise.eslint.mjs';
import regexpEslint from './node/regexp.eslint.mjs';
import scriptsEslint from './node/scripts.eslint.mjs';
import securityEslint from './node/security.eslint.mjs';
import sonarEslint from './node/sonar.eslint.mjs';
import stylisticEslint from './node/stylistic.eslint.mjs';
import unicornEslint from './node/unicorn.eslint.mjs';
import unusedImportsEslint from './node/unused-imports.eslint.mjs';
import { createTypescriptConfig } from './typescript/typescript.eslint.mjs';
import { eslintLogger } from './logger.mjs';

const logger = eslintLogger('node');

/**
 * @typedef {object} NodeConfigOptions
 * @property {string} [rootDir] - Project root for resolving tsconfig. Defaults to process.cwd().
 * @property {string} [tsconfig] - Explicit tsconfig filename (e.g. 'tsconfig.main.json').
 *   When omitted, auto-discovers from: tsconfig.json → tsconfig.base.json → tsconfig.main.json → tsconfig.app.json
 * @property {string} [scriptstsconfig] - Explicit tsconfig for the scripts/ directory.
 * @property {string} [gitignore] - Explicit path to .gitignore. Defaults to <rootDir>/.gitignore.
 */

/**
 * Creates the Node.js ESLint configuration.
 * Supports auto-discovery of tsconfig or an explicit path via options.
 *
 * @param {NodeConfigOptions} [options]
 * @returns {import('eslint').Linter.FlatConfig[]}
 *
 * @example
 * // Auto-discovery (uses tsconfig.json by default)
 * import nodeConfigs from './.eslint/node.eslint.mjs';
 *
 * @example
 * // Explicit tsconfig
 * import { createNodeConfig } from './.eslint/node.eslint.mjs';
 * export default createNodeConfig({ tsconfig: 'tsconfig.main.json' });
 */
export function createNodeConfig(options = {}) {
  const rootDir = options.rootDir || process.cwd();
  const gitignorePath = options.gitignore || `${rootDir}/.gitignore`;

  logger.info('Root directory:', rootDir);
  logger.info('Using .gitignore at:', gitignorePath);

  return defineConfig([
    // ──────────────────────────────────────────────
    // Ignores
    // ──────────────────────────────────────────────
    {
      name: 'ignore/node-modules',
      ignores: ['node_modules'],
    },
    includeIgnoreFile(gitignorePath),

    // ──────────────────────────────────────────────
    // Shared: JavaScript + TypeScript
    // ──────────────────────────────────────────────
    pluginJs.configs.recommended,
    ...airbnbBaseEslint,
    ...jsdocEslint,
    ...stylisticEslint,
    ...nConfig,
    ...sonarEslint,
    ...prettierEslint,
    ...createOrderedImportsConfig(options),
    ...createImportAliasConfig(options),
    ...unusedImportsEslint,
    ...noSecretsEslint,
    ...securityEslint,
    ...perfectionistEslint,
    ...unicornEslint,
    ...noBarrelFilesEslint,
    ...promiseEslint,
    ...regexpEslint,
    ...dependEslint,
    ...lintlordEslint,
    ...customStyleEslint,
    {
      name: 'javascript-language-options',
      files: ['**/*.{js,jsx,cjs,mjs}'],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },

    // ──────────────────────────────────────────────
    // TypeScript-specific
    // Remove the spread below and its import to use JavaScript only.
    // ──────────────────────────────────────────────
    ...createTypescriptConfig(options),

    // Per-file overrides — must be last so they win over all plugin rules above
    ...scriptsEslint,
    ...eslintRulesEslint,
  ]);
}

export default createNodeConfig();
