# Variables (const / global)

**Selector:** `variable` with modifiers `const`, `global`
Allowed: `camelCase`, `UPPER_CASE`, `PascalCase`
Leading underscore: allowed

## Why This Rule

Global constants serve different purposes and benefit from naming flexibility:

- **UPPER_CASE**: Configuration constants (`MAX_RETRIES`, `API_BASE_URL`)
- **PascalCase**: Singletons, factory exports, or namespace-like objects (`AppConfig`, `Logger`)
- **camelCase**: Default export helpers or utility instances (`defaultClient`, `mainRouter`)
- **Leading underscore**: Internal constants not meant for external use (`_internalCache`)

Global scope often contains objects that aren't simple values - they might be configured instances, singletons, or complex objects that deserve PascalCase treatment. This flexibility prevents forcing awkward names like `LOGGER_INSTANCE` when `Logger` is clearer.

**Examples:**

```ts
// Configuration
export const MAX_RETRIES = 3;

// Singleton instance
export const DatabaseConnection = createConnection();

// Utility instance
export const apiClient = new ApiClient();
```

**References:**

- [Google TypeScript Style Guide - Exports](https://google.github.io/styleguide/tsguide.html#exports)
- [Module Pattern in JavaScript](https://www.patterns.dev/posts/module-pattern/)

## ✅ Good

```ts
const MAX_RETRIES = 3;
const ApiBaseUrl = 'https://example.com';
```

## ❌ Bad

```ts
const max_retries = 3;
```
