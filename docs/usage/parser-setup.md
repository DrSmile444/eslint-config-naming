# Bring Your Own Parser

This package intentionally does **not** ship:

- `languageOptions.parser`
- `plugins`
- `files` globs

Because projects differ (monorepos, project references, TS config paths, parserOptions).

::: tip Why?
This design choice is core to our philosophy of composable, conflict-free tooling. Read more about the [Bring Your Own Parser principle](/philosophy#bring-your-own-parser) in our Philosophy page.
:::

## Typical wiring

```js
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import naming from 'eslint-config-naming';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
  },
  ...naming,
];
```

## Common parserOptions

- `project`: enable type-aware rules (recommended)
- `tsconfigRootDir`: monorepos / custom locations
- `sourceType`: usually `module`
