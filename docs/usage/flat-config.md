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

## Example with typescript-eslint meta-package

This is the recommended way, as it ensures version compatibility.

```js
// eslint.config.js
import tseslint from 'typescript-eslint';
import namingConfig from 'eslint-config-naming';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // your project settings
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
  },
  ...namingConfig,
];
```

## Example with native @typescript-eslint packages

This works too, but you must ensure version compatibility yourself.

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

## When typing information doesn't work

If your ESLint config is too complicated and typing information doesn't work with the full config array, you can apply the rules directly:

```js
// eslint.config.js
import tseslint from 'typescript-eslint';
import namingConfig from 'eslint-config-naming';
import someOtherConfig from 'some-other-eslint-config';
import anotherConfig from 'another-eslint-config';

export default [
  ...someOtherConfig, // spreads many config objects
  ...anotherConfig, // more spreads
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // your project settings
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
  },
  // Instead of ...namingConfig, which might cause typing issues with complex configs
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: namingConfig[0].rules,
  },
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
