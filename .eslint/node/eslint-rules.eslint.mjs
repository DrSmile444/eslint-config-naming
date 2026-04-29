import { defineConfig } from 'eslint/config';

/**
 * @description ESLint overrides for config files at the project root and in .eslint/.
 * These files import devDependencies and don't need type-safe rules applied.
 * @author Dmytro Vakulenko
 */
export default defineConfig([
  {
    name: 'eslint-rules/config-files',
    files: ['./.eslint/**/*.{js,mjs,cjs,ts,tsx}', './eslint.config.mjs', './vitest.config.ts', './*.config.{ts,js,mjs,cjs}'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
      'n/no-unpublished-import': 'off',
      'n/no-missing-import': 'off',
      'n/no-unsupported-features/node-builtins': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/tag-lines': 'off',
      'depend/ban-dependencies': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      // logger.mjs is the logger implementation — it uses console directly by design
      'lintlord/prefer-logger': 'off',
    },
  },
  {
    // src/index.ts and src/legacy.ts are public entry points — barrel files by design
    name: 'eslint-rules/package-entry-points',
    files: ['./src/index.ts', './src/legacy.ts'],
    rules: {
      'no-barrel-files/no-barrel-files': 'off',
    },
  },
]);
