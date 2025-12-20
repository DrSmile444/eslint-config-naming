# Parameters

Base parameters allow `camelCase` only. Destructured parameters allow `camelCase` or `snake_case` to preserve external API naming. All parameters can start with `_` when intentionally unused.

Pages:

- [Base](/rules/parameters/base)
- [Destructured](/rules/parameters/destructured)

## ✅ Good

```ts
function fn(userId: string, _unused: any) { // WHY: camelCase and leading underscore for unused param
  return userId;
}
```

## ❌ Bad

```ts
function fn(user_id: string) { // WHY: snake_case not allowed for base parameters
  return user_id;
}
```
