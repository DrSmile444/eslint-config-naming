<p align="center">
  <img src="docs/public/logo.svg" alt="eslint-config-naming logo" width="160" />
</p>

<h1 align="center">ESLint Config Naming</h1>

<p align="center">
  Best-practice naming conventions for TypeScript via ESLint.
</p>

<p align="center">
  <a href="https://drsmile444.github.io/eslint-config-naming/">Documentation</a> •
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

Comprehensive documentation with detailed rule explanations and examples is available at **[drsmile444.github.io/eslint-config-naming](https://drsmile444.github.io/eslint-config-naming/)**.

Key resources:

- **[Getting Started Guide](https://drsmile444.github.io/eslint-config-naming/getting-started)** — Installation and configuration
- **[Rule Matrix](https://drsmile444.github.io/eslint-config-naming/rules/)** — Complete rule matrix with examples
- **[Changelog](https://drsmile444.github.io/eslint-config-naming/reference/changelog)** — Version history and updates

---

## At a Glance

This configuration enforces consistent naming patterns across TypeScript constructs:

| Category                      | Enforced Style                                  | Example                            |
| ----------------------------- | ----------------------------------------------- | ---------------------------------- |
| **Types**                     | PascalCase, no `I`/`T` prefixes                 | `ApiResponse`, `UserData`          |
| **Classes**                   | PascalCase                                      | `HttpClient`, `DataService`        |
| **Interfaces**                | PascalCase                                      | `Config`, `Options`                |
| **Enums**                     | PascalCase (name), UPPER_CASE (members)         | `enum Status { ACTIVE, INACTIVE }` |
| **Variables**                 | camelCase or UPPER_CASE                         | `userName`, `MAX_RETRIES`          |
| **Booleans**                  | Prefixed with `is\|should\|has\|can\|did\|will` | `isValid`, `hasAccess`             |
| **Functions**                 | camelCase                                       | `calculateTotal()`, `fetchData()`  |
| **Class Members (public)**    | camelCase or snake_case                         | `userCount`, `api_key`             |
| **Class Members (protected)** | camelCase with `_` prefix                       | `_internalState`                   |
| **Generic Types**             | Single letter or T-prefixed                     | `T`, `TData`, `TKey`               |

**Abbreviations are restricted** — descriptive names like `errorMessage` are enforced over vague shortcuts like `err` or `str`.

### Code Examples

<table>
<tr>
<th>❌ Incorrect</th>
<th>✅ Correct</th>
</tr>
<tr>
<td>

```ts
// Type prefixes
interface IApiResponse {}
type TUserData = {};

// Wrong casing
enum status {
  active,
  inactive,
}
class userService {}

// Variables
const Myvariable = 'value';
const my_constant = 'constant';
const ready = true;

// Abbreviations
const str = 'message';

// Generics
type Cache<Key, val> = Map<Key, val>;
```

</td>
<td>

```ts
// Clean type names
interface ApiResponse {}
type UserData = {};

// Proper casing
enum Status {
  ACTIVE,
  INACTIVE,
}
class UserService {}

// Variables
const myVariable = 'value';
const MY_CONSTANT = 'constant';
const isReady = true;

// Descriptive names
const message = 'message';

// Proper generics
type Cache<TKey, TValue> = Map<TKey, TValue>;
```

</td>
</tr>
</table>

> **Note:** This is a high-level overview and most rules have additional conditions and exceptions. See the [Rule Matrix](https://drsmile444.github.io/eslint-config-naming/rules/) for complete details and examples.

---

## Installation

### 1. Install peer dependencies

```bash
npm i -D eslint typescript typescript-eslint
```

### 2. Install this config

```bash
npm i -D eslint-config-naming
```

> For other installation options, see [Flat Config Usage](https://drsmile444.github.io/eslint-config-naming/usage/flat-config).

---

## Usage

### Option A: Flat Config (ESLint v9+)

```js
// eslint.config.js
import tseslint from 'typescript-eslint';
import namingConfig from 'eslint-config-naming';

export default [
  // Your TS wiring (BYO parserOptions)
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
  },

  // Naming rules
  ...namingConfig,
];
```

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
- `types` rules (class, interface, enum, typeLike, enumMember, generics)
- `parameters` rules (base, destructured)
- `functions` rules (including final camelCase enforcement)
- quoted-key escape hatch (`requiresQuotes` → ignored)

They are combined in a single `@typescript-eslint/naming-convention` rule entry list, preserving precedence.

---

## Rule overview

This is a quick “what it enforces” list.
For full details (and good/bad examples), check the [Rule Matrix.](https://drsmile444.github.io/eslint-config-naming/rules/).

### Types

- `class`: **PascalCase**
- `interface`: **PascalCase** and forbids `I*` / `T*` prefixes
- `typeAlias`: **PascalCase** and forbids `I*` / `T*` prefixes
- `typeParameter`: Single uppercase letters (`T`, `U`, `V`, `K`) or prefixed descriptive names (`TData`, `KKey`, `VValue`) or numeric subscripts (`T1`, `T2`, `K1`, etc.)
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

If a name **requires quotes** (e.g. HTTP headers, data contracts), it's ignored.

### Abbreviation Restrictions

Automatically bans common abbreviations and anti-patterns:

- Single-letter names: `i`, `j`, `k`, `e` → use `index`, `itemIndex`, `error`
- Vague abbreviations: `str`, `num`, `arr`, `obj` → use `string`, `number`, `array`, `object`
- Intent-hiding names: `data`, `info`, `tmp` → use `payload`, `metadata`, `temporary`
- Ambiguous abbreviations: `res`, `req`, `dir`, `cfg` → use `response`, `request`, `directory`, `config`

Well-known technical terms like `id`, `url`, `api`, `json`, `html`, `uuid` are allowed.

See [Abbreviation Restrictions docs](https://drsmile444.github.io/eslint-config-naming/rules/abbreviations) for the complete list and customization options.

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
