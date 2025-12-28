# Using with ESLint v9 Flat Config

This config exports an array of Flat Config objects. You spread it into your ESLint config.

## Recommended order

1. Your TypeScript wiring (`files`, `languageOptions.parser`, `plugins`)
2. This naming config
3. Your local overrides

```js
import namingConfig from 'eslint-config-naming';

export default [
  // 1) your TS wiring
  // 2) naming rules
  ...namingConfig,
  // 3) local overrides
  {
    rules: {
      // example: soften rule in legacy folder
      // "@typescript-eslint/naming-convention": "warn",
    },
  },
];
```

## Example with TypeScript wiring

```js
// eslint.config.js
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import namingConfig from 'eslint-config-naming';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // your project settings
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
  },
  ...namingConfig,
];
```

## Overriding safely

Prefer path-based overrides:

```js
export default [
  ...namingConfig,
  {
    files: ['**/legacy/**'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
];
```

## Need legacy `.eslintrc.*`?

Use the legacy entry: [Legacy .eslintrc](/usage/eslintrc)
