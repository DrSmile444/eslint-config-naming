import importAlias from '@dword-design/eslint-plugin-import-alias';
import { defineConfig } from 'eslint/config';

import { eslintLogger } from '../logger.mjs';
import { parseTsconfig, resolveTsconfigPath, resolveTsconfigPaths } from '../tsconfig.utils.mjs';

const logger = eslintLogger('import-alias');

/**
 * Builds the import-alias ESLint config, deriving aliases from tsconfig paths + baseUrl.
 * @param {{ rootDir?: string, tsconfig?: string }} [options]
 * @returns {import('eslint').Linter.FlatConfig[]}
 */
export function createImportAliasConfig(options = {}) {
  const tsconfigPath = resolveTsconfigPath(options);

  let aliases = {};

  try {
    const tsconfigContent = parseTsconfig(tsconfigPath);
    const baseUrl = tsconfigContent?.compilerOptions?.baseUrl || '';
    const paths = resolveTsconfigPaths(tsconfigPath);

    aliases = Object.fromEntries(
      Object.entries(paths).map(([key, valueArray]) => {
        const aliasKey = key.replace('/*', '');
        let aliasValue = valueArray[0].replace('/*', '');

        if (!aliasValue.startsWith('.') && !aliasValue.startsWith('/')) {
          aliasValue = `${baseUrl.replace(/\/$/, '')}/${aliasValue}`;

          if (!aliasValue.startsWith('./') && !aliasValue.startsWith('/')) {
            aliasValue = `./${aliasValue}`;
          }
        }

        return [aliasKey, aliasValue];
      }),
    );

    logger.info('Resolved import aliases from tsconfig paths:', aliases);
  } catch {
    logger.warn('Failed to resolve import aliases — import-alias rules will be skipped.');
  }

  if (Object.keys(aliases).length === 0) {
    return [];
  }

  return defineConfig([
    importAlias.configs.recommended,
    {
      name: 'import-alias',
      rules: {
        '@dword-design/import-alias/prefer-alias': ['error', { alias: aliases }],
      },
    },
  ]);
}

/**
 * ESLint config for import alias linting using `@dword-design/eslint-plugin-import-alias`.
 * Aliases are built dynamically from tsconfig.json using baseUrl.
 * @author Dmytro Vakulenko
 * @see https://github.com/dword-design/eslint-plugin-import-alias
 */
export default createImportAliasConfig();
