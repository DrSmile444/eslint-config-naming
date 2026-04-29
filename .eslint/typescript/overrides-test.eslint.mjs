import tseslint from 'typescript-eslint';

/**
 * @description TypeScript overrides for test files: relaxes documentation and TS-strict rules
 * that are impractical in test code (mocks, stubs, empty functions).
 * Globals are handled by the vitest config — not defined here.
 * @author Dmytro Vakulenko
 */
export default tseslint.config({
  name: 'overrides-test',
  files: ['**/*.test.ts', '**/*.spec.ts'],
  rules: {
    'jsdoc/require-description': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-param-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/unbound-method': 'off',
  },
});
