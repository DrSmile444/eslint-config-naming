
# Boolean variables (prefix required)

**Selector:** `variable` with `types: ["boolean"]`
Format: `PascalCase`
Required prefixes: `is`, `should`, `has`, `can`, `did`, `will`

## ✅ Good

```ts
const isActive: boolean = true;
const hasPermission: boolean = false;
const shouldRetry: boolean = true;
```

## ❌ Bad

```ts
const active: boolean = true;
const enabled: boolean = false;
```
