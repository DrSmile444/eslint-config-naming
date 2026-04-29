import tseslint from 'typescript-eslint';

/**
 * @description TypeScript-eslint strict + stylistic type-checked presets scoped to TypeScript files.
 * strictTypeChecked is a superset of recommendedTypeChecked so we omit the latter.
 * @author Dmytro Vakulenko
 * @see https://typescript-eslint.io/linting/typed-linting/
 */
export default tseslint.config({
  files: ['**/*.{ts,tsx,mts,cts}'],
  extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
});
