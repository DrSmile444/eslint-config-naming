
# Interfaces

**Selector:** `interface`
Required: `PascalCase`
Custom: forbids prefix `I*` / `T*` when `I`/`T` is followed by uppercase

## ✅ Good

```ts
interface UserProfile {
  id: string;
}
```

## ❌ Bad

```ts
interface IUserProfile {
  id: string;
}
```
