
# Exported / global functions

**Selector:** `function` with modifiers `exported`, `global`
Allowed: `PascalCase`, `camelCase`, leading `_` allowed

## ✅ Good

```ts
export function ExportedFunction() {
  return 1;
}

export function exportedFunction() {
  return 1;
}
```

## ❌ Bad

```ts
export function exported_function_bad() {
  return 1;
}
```
