# Variables (const / global)

- **Selector:** `variable` with modifiers `const`, `global`
- Allowed: `camelCase`, `UPPER_CASE`, `PascalCase`
- Leading underscore: allowed
- **Abbreviation restrictions:** Applied (see [Abbreviations](../abbreviations.md))

## Why This Rule

Global constants serve different purposes and benefit from naming flexibility:

- **UPPER_CASE**: Configuration constants (`MAX_RETRIES`, `API_BASE_URL`)
- **PascalCase**: Singletons, factory exports, or namespace-like objects (`AppConfig`, `Logger`)
- **camelCase**: Default export helpers or utility instances (`defaultClient`, `mainRouter`)
- **Leading underscore**: Internal constants not meant for external use (`_internalCache`)

Global scope often contains objects that aren't simple values - they might be configured instances, singletons, or complex objects that deserve PascalCase treatment. This flexibility prevents forcing awkward names like `LOGGER_INSTANCE` when `Logger` is clearer.

**Abbreviation restrictions** apply to ensure global constants are descriptive and self-documenting. Common abbreviations like `msg`, `cfg`, `obj`, etc. are not allowed.

**Examples:**

```ts
// Configuration
export const MAX_RETRIES = 3; // WHY: UPPER_CASE shows a configuration constant

// Singleton instance
export const DatabaseConnection = createConnection(); // WHY: PascalCase indicates a named exported instance

// Utility instance
export const apiClient = new ApiClient(); // WHY: camelCase for runtime value
```

**References:**

- [Google TypeScript Style Guide - Exports](https://google.github.io/styleguide/tsguide.html#exports)

## ✅ Good

```ts
const MAX_RETRIES = 3; // WHY: UPPER_CASE for a true constant
const ApiBaseUrl = 'https://example.com'; // WHY: PascalCase used for exported namespace-like object
const AppConfig = {}; // WHY: PascalCase for global object
```

## ❌ Bad

```ts
const max_retries = 3; // WHY: snake_case global const is discouraged
export const msg = 'Hello'; // WHY: Abbreviation 'msg' should be 'message'
const cfg = {}; // WHY: Abbreviation 'cfg' should be 'config' or 'configuration'
```
