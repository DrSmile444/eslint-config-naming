# Using with ESLint v9 Flat Config

This config exports an array of Flat Config objects. You spread it into your ESLint config.

## Recommended order

1. Your TypeScript wiring (`files`, `languageOptions.parser`, `plugins`)
2. This naming config
3. Your local overrides

```js
import naming from '@drsmile444/eslint-config-naming';

export default [
  // 1) your TS wiring
  // 2) naming rules
  ...naming,
  // 3) local overrides
  {
    rules: {
      // example: soften rule in legacy folder
      // "@typescript-eslint/naming-convention": "warn",
    },
  },
];
```

## Overriding safely

Prefer path-based overrides:

```js
export default [
  ...naming,
  {
    files: ['**/legacy/**'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
];
```
