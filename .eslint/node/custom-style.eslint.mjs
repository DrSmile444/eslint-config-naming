import { defineConfig } from 'eslint/config';

/**
 * ESLint config for logic-level code style rules in JS/TS projects.
 * Formatting concerns (quotes, semicolons, spacing) are delegated entirely to Prettier.
 * @author Dmytro Vakulenko
 * @see https://eslint.org/docs/latest/rules/
 */
export default defineConfig([
  {
    name: 'custom-style',
    rules: {
      'import/extensions': 'off',
      'class-methods-use-this': 'off',
      'import/prefer-default-export': 'off',
      'no-unneeded-ternary': 'error',
      'arrow-body-style': 'error',
      'constructor-super': 'error',
      curly: ['error', 'all'],
      'dot-notation': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'guard-for-in': 'error',
      'id-denylist': 'off',
      'id-match': 'off',
      'no-bitwise': 'off',
      'no-caller': 'error',
      'no-console': 'error',
      'no-debugger': 'error',
      'no-empty': 'off',
      'no-empty-function': 'off',
      'no-eval': 'error',
      'no-fallthrough': 'error',
      'no-new-wrappers': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'off',
      'no-unused-expressions': 'error',
      'no-unused-labels': 'error',
      'no-use-before-define': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      radix: 'error',
      'spaced-comment': ['error', 'always', { markers: ['/'] }],
      'valid-typeof': 'error',
    },
  },
]);
