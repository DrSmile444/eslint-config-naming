# Getting Started

This project provides **rules only** (no parser, no plugins, no `files` globs). You wire those in your own `eslint.config.js`.

It supports:

- **Flat Config** (`eslint.config.js`) for modern ESLint
- **Legacy config** (`.eslintrc.*`) for older projects that haven’t migrated yet

> This package intentionally does **not** ship `parser`, `plugins`, or `files` for Flat Config.
> You wire those in your repo because parserOptions differ across projects.

## Install

Install peer dependencies (example):

```bash
npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript
npm i -D @drsmile444/eslint-config-naming
```

---

## Option A: Flat Config (ESLint v9+)

```js
// eslint.config.js
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import naming from '@drsmile444/eslint-config-naming';

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
  ...naming,
];
```

---

## Option B: Legacy `.eslintrc.*` (ESLint v8 or older)

Use the legacy shareable config entry:

- `@drsmile444/eslint-config-naming/legacy`

```js
// .eslintrc.cjs
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['@drsmile444/eslint-config-naming/legacy'],
  parserOptions: {
    project: './tsconfig.json',
  },
};
```

> If you’re on ESLint v9 and still want `.eslintrc.*`, you may need to run ESLint in legacy mode (depending on your setup).
> Prefer Flat Config when possible.

---

## Next steps

- Flat Config details: [Flat Config (ESLint v9)](/usage/flat-config)
- Legacy config details: [Legacy .eslintrc](/usage/eslintrc)
- Why parser is BYO: [Bring Your Own Parser](/usage/parser-setup)
- Explore all selectors: [Rule Matrix](/rules/)
