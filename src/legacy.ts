import { namingConventionRule } from './rules/naming';

/**
 * Legacy (eslintrc) shareable config.
 *
 * - Designed for `.eslintrc.*` projects that don't use Flat Config yet.
 * - Still "BYO parser": you should set `parser` and `parserOptions` in your own config,
 *   because those differ across repos (monorepos, references, custom tsconfig paths).
 *
 * Usage:
 *   // .eslintrc.cjs
 *   module.exports = {
 *     parser: '@typescript-eslint/parser',
 *     plugins: ['@typescript-eslint'],
 *     extends: ['@drsmile444/eslint-config-naming/legacy'],
 *     parserOptions: { project: './tsconfig.json' },
 *   };
 */
export const legacyEslintrcConfig = {
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/naming-convention': namingConventionRule,
      },
    },
  ],
} as const;

export default legacyEslintrcConfig;
