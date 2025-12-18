
# Variables (const / global)

**Selector:** `variable` with modifiers `const`, `global`
Allowed: `camelCase`, `UPPER_CASE`, `PascalCase`
Leading underscore: allowed

## ✅ Good

```ts
const MAX_RETRIES = 3;
const ApiBaseUrl = "https://example.com";
```

## ❌ Bad

```ts
const max_retries = 3;
```
