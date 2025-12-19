
# Variables (destructured)

**Selector:** `variable` with modifier `destructured`
Allowed: `PascalCase`, `camelCase`, `snake_case`

## Why This Rule

Destructured variables often come from external sources where you don't control the naming:

- **API responses**: `const { user_id, created_at } = apiResponse`
- **Third-party libraries**: `const { StatusCode } = imports`
- **Database queries**: `const { first_name, last_name } = row`

Forcing a rename defeats the purpose of destructuring. Compare:

```ts
// Forced rename - verbose and noisy
const { user_id: userId, created_at: createdAt } = apiResponse;

// Natural destructuring - clean and honest
const { user_id, created_at } = apiResponse;
```

By allowing flexibility for destructured variables, we honor the "respect real-world interoperability" principle. You can destructure external shapes as-is, then use standard naming for variables you create.

**Important**: This only allows consistent naming conventions (no mixed-case like `Foo_bar`), maintaining some standards while enabling interoperability.

**References:**
- [MDN - Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [TypeScript Deep Dive - Destructuring](https://basarat.gitbook.io/typescript/future-javascript/destructuring)

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
