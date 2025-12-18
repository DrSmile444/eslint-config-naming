
# Type-like

**Selector:** `typeLike`
Required: `PascalCase`
Custom: forbids prefix `I*` / `T*`

## ✅ Good

```ts
type UserId = string;
```

## ❌ Bad

```ts
type IUserId = string;
```
