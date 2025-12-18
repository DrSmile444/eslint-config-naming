
# Public instance members

**Modifiers:** `public`
Allowed: `camelCase`, `snake_case`
Leading underscore: allowed

## ✅ Good

```ts
class Example {
  public userName = "Alice";
  public user_name = "Alice";
}
```

## ❌ Bad

```ts
class Example {
  public UserName = "Alice";
}
```
