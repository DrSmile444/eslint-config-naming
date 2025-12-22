<p align="center">
  <img src="docs/public/logo.svg" alt="eslint-config-naming logo" width="160" />
</p>

<h1 align="center">ESLint Config Naming</h1>

<p align="center">
  Best-practice naming conventions for TypeScript via ESLint.
</p>

<p align="center">
  <a href="https://drsmile444.github.io/eslint-config-naming/">Documentation</a> •
  <a href="#why">Why</a> •
  <a href="#what-you-get">What you get</a> •
  <a href="#installation">Install</a> •
  <a href="#usage">Usage</a> •
  <a href="#rule-overview">Rule overview</a>
</p>

---

## Why

Naming conventions in software development offer numerous benefits:

- **Readability**: Consistent naming makes code easier to read and understand, reducing cognitive load when scanning files.
- **Maintainability**: Enforces best practices, improving code quality and consistency across the codebase.
- **Code Review and Collaboration**: Eliminates debates on naming styles, allowing reviewers to focus on logic and speeding up the process.
- **Code Uniformity**: Uniform naming promotes collective code ownership, as code looks the same regardless of who wrote it.
- **Aesthetics**: Provides functional benefits and aesthetic appeal, with a visually pleasing and harmonious structure.

This config makes naming **predictable** and **review-friendly** by enforcing a coherent set of rules that scale well across:

- Apps and Libraries
- Frontend and Backend
- Monorepos and Multi-team codebases

It is intentionally **BYO parser setup** — it ships rules only and does not assume your repo layout or `parserOptions.project`.

---

## Documentation

Full rule explanations (with good/bad examples) live in the documentation site:

[**Documentation**](https://drsmile444.github.io/eslint-config-naming/)

---

## What you get

### ✅ Two supported config formats

This package supports both:

- **Flat Config** (modern): `eslint.config.js`
- **Legacy `.eslintrc.*`** (older projects): `.eslintrc.js`, `.eslintrc.cjs`, etc.

### ✅ Rules only (BYO parser)

This package **does not** export:

- `files` globs
- `plugins`
- `@typescript-eslint/parser` configuration

Because projects differ (monorepos, TS project references, different `tsconfig` paths).  
You configure the parser on your side and keep full control.

---

## Installation

### 1. Install peer dependencies

**Option A (recommended - modern):**

```bash
npm i -D eslint typescript typescript-eslint
```

The `typescript-eslint` package is a convenient meta-package that re-exports both the parser and plugin.

**Option B (explicit packages):**

```bash
npm i -D eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Both options work identically — choose whichever fits your project style.

### 2. Install this config

```bash
npm i -D eslint-config-naming
```

---

## Usage

### Option A: Flat Config (ESLint v9+)

```js
// eslint.config.js
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import naming from 'eslint-config-naming';

export default [
  // Your TS wiring (BYO parserOptions)
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
  },

  // Naming rules
  ...naming,
];
```

::: tip Using typescript-eslint meta-package?
If you installed `typescript-eslint`, import from there:
```js
import tseslint from 'typescript-eslint';
const tsParser = tseslint.parser;
const tsPlugin = tseslint.plugin;
```
:::

### Option B: Legacy `.eslintrc.*`

Use the legacy shareable entry:

- `eslint-config-naming/legacy`

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

---

## How it’s structured

Internally, the config is built as a set of **small rule fragments** grouped by selector:

- `memberLike` rules (public/private/protected/static/readonly)
- `variables` rules (default, const/global, destructured, boolean prefixes, \*Component)
- `types` rules (class, interface, enum, typeLike, enumMember)
- `parameters` rules (base, destructured)
- `functions` rules (including final camelCase enforcement)
- quoted-key escape hatch (`requiresQuotes` → ignored)

They are combined in a single `@typescript-eslint/naming-convention` rule entry list, preserving precedence.

---

## Rule overview

This is a quick “what it enforces” list.
For full details (and good/bad examples), see the docs site.

### Types

- `class`: **PascalCase**
- `interface`: **PascalCase** and forbids `I*` / `T*` prefixes
- `typeLike`: **PascalCase** and forbids `I*` / `T*` prefixes
- `enum`: **PascalCase**, forbids plural-ish names (like `Statuses`) and `I*`/`T*`
- `enumMember`: **UPPER_CASE**

### Members (`memberLike`)

- `public static`: **camelCase**, **PascalCase** or **UPPER_CASE**
- `private static`: **camelCase**, **PascalCase** or **UPPER_CASE**, no leading `_`
- `public`: **camelCase** or **snake_case**
- `private`: **camelCase**, no leading `_`
- `private readonly`: **camelCase** or **UPPER_CASE**, no leading `_`
- `protected`: **camelCase** with **required leading `_`**

### Variables

- default: **camelCase** or **UPPER_CASE**
- `const` + `global`: allows **PascalCase** (in addition to camelCase/UPPER_CASE)
- destructured: allows **PascalCase**, **camelCase**, **snake_case**
- booleans: **PascalCase** and must start with `is|should|has|can|did|will`
- destructured booleans: no prefix requirement (interop friendly)
- `*Component`: allows PascalCase if variable name ends with `Component`

### Functions

- exported/global: **camelCase** or **PascalCase**
- final enforcement: functions must be **camelCase**

### Object Literals

- `objectLiteralProperty`: **camelCase**, **snake_case**, **PascalCase**, or **UPPER_CASE** (flexible to support various use cases including constant objects)

### Quoted members

If a name **requires quotes** (e.g. HTTP headers, data contracts), it’s ignored.

---

## Update policy

This project treats rule and packaging changes as user-facing. Before submitting a change that affects rules, exports, or packaging, please follow the project's update policy (full text in [Update Policy Docs](https://drsmile444.github.io/eslint-config-naming/policies/update-policy)). In short, every rule-related change must include:

- Source changes (`src/`) implementing the rule or selector.
- Tests (`tests/`) covering both accepted and rejected examples.
- Snippets (`tests/snippets/...`) for positive/negative cases where applicable.
- Documentation updates in `docs/` explaining the rule and examples.
- README updates if usage or exports change.
- Package metadata changes (`package.json`) such as version bump and export adjustments.

See `docs/policies/update-policy.md` for the complete checklist, versioning rules, and CI expectations.

---

## License

MIT © 2025-Present [Dmytro Vakulenko](https://github.com/DrSmile444) 🇺🇦
