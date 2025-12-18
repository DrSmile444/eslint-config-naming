
# Enum names

**Selector:** `enum`
Required: `PascalCase`
Custom: forbids `I*`/`T*` prefix and some plural-ish forms (`*es`, `*s` but not `*us`)

## ✅ Good

```ts
enum OrderStatus {
  PENDING,
}
```

## ❌ Bad

```ts
enum OrderStatuses {
  PENDING,
}
```
