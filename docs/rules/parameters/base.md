
# Parameters (base)

**Selector:** `parameter`
Allowed: `camelCase`, `snake_case`
Leading underscore: allowed

## ✅ Good

```ts
function fn(userId: string, _unused: number, user_name: string) {
  return userId + user_name;
}
```

## ❌ Bad

```ts
function fn(UserId: string) {
  return UserId;
}
```
