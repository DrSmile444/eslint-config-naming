import { defineConfig } from 'eslint/config';

/**
 * @description ESLint overrides for CLI scripts in scripts/**. These are build/dev tools,
 * not production code, so console output, process.exit(), and devDependency imports are expected.
 * @author Dmytro Vakulenko
 */
export default defineConfig([
  {
    name: 'scripts/overrides',
    files: ['scripts/**/*'],
    rules: {
      'no-console': 'off',
      'lintlord/prefer-logger': 'off',
      'n/no-process-exit': 'off',
      'n/no-unpublished-import': 'off',
      // Scripts target the current Node runtime, not the package.json engines range
      'n/no-unsupported-features/es-syntax': 'off',
      'n/no-unsupported-features/es-builtins': 'off',
    },
  },
]);
