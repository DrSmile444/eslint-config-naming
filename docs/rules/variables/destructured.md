
# Variables (destructured)

**Selector:** `variable` with modifier `destructured`
Allowed: `PascalCase`, `camelCase`, `snake_case`

## ✅ Good

```ts
const dto = { userName: "A", user_age: 10, UserId: "1" };
const { userName, user_age, UserId } = dto;
```

## ❌ Bad

```ts
const dto = { Foo_bar: 1 };
const { Foo_bar } = dto;
```
