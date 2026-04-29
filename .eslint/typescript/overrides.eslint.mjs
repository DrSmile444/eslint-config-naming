import tseslint from 'typescript-eslint';

/**
 * @description TypeScript-specific rule overrides: enables TS equivalents of base JS rules,
 * disables conflicting base rules, and enforces TypeScript best practices.
 * @author Dmytro Vakulenko
 */
export default tseslint.config(
  {
    name: 'overrides-ts',
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'off',

      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',

      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/prefer-readonly': 'error',

      'no-undef': 'off',

      // TypeScript compiler handles module resolution — n plugin doesn't understand
      // extensionless TS imports or path aliases, so these produce false positives.
      'n/no-missing-import': 'off',
      'n/no-unresolved': 'off',
    },
  },
  {
    name: 'overrides-modules',
    files: ['**/*.module.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
);
