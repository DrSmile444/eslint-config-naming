# Getting Started

This project provides **rules only** (no parser, no plugins, no `files` globs). You wire those in your own `eslint.config.js`.

## Install

Install peer dependencies (example):

```bash
npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript
npm i -D @drsmile444/eslint-config-naming
````

## Minimal Flat Config (ESLint v9)

```js
// eslint.config.js
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import naming from "@drsmile444/eslint-config-naming";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // your project settings
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
  },
  ...naming,
];
```

## Next steps

* Learn why parser is BYO: [Bring Your Own Parser](/usage/parser-setup)
* Understand all selectors: [Rule Matrix](/rules/)
* Copy/paste patterns: [Quick Reference](/examples/quick-reference)
