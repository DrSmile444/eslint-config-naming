# Legacy `.eslintrc.*` support

Some projects still use legacy config files:

- `.eslintrc.js`
- `.eslintrc.cjs`
- `.eslintrc.json`

This package provides a dedicated legacy shareable config:

- `eslint-config-naming/legacy`

## Minimal setup

```js
// .eslintrc.cjs
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint-config-naming/legacy'],
  parserOptions: {
    project: './tsconfig.json',
  },
};
```

## What the legacy config contains

- `overrides` for `**/*.ts` and `**/*.tsx`
- `plugins: ["@typescript-eslint"]`
- `rules: { "@typescript-eslint/naming-convention": ... }`

It **does not** set `parser` or `parserOptions` — you own those, because repos vary.

## Monorepo example

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint-config-naming/legacy'],
  parserOptions: {
    project: ['./packages/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
};
```

## Prefer Flat Config when possible

Flat Config is the modern standard and is the primary supported format.

- See: [Flat Config (ESLint v9)](/usage/flat-config)
