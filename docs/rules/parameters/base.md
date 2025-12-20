# Parameters (base)

- **Selector:** `parameter`
- Allowed: `camelCase`
- Leading underscore: allowed

## Why This Rule

Function parameters should follow standard JavaScript/TypeScript conventions:

- **camelCase**: Standard JavaScript/TypeScript convention for parameters you define
- **Leading underscore**: Conventional signal for intentionally unused parameters (e.g., `_event`, `_req`)

**Why not snake_case?**

Unlike destructured parameters (which preserve external naming), regular parameters are part of your function's API. They should follow idiomatic JavaScript naming:

```ts
// ❌ Bad - snake_case isn't idiomatic for JS/TS parameters
function processUser(user_id: string, first_name: string) {
  return `${first_name} (${user_id})`;
}

// ✅ Good - camelCase is the JavaScript standard
function processUser(userId: string, firstName: string) {
  return `${firstName} (${userId})`;
}
```

**What about external APIs?**

Use destructured parameters instead - they preserve the original naming from external sources:

```ts
// ✅ Good - destructuring preserves API shape
function processUser({ user_id, first_name }: ApiUser) {
  return `${first_name} (${user_id})`;
}
```

The leading underscore is especially valuable in TypeScript where the `noUnusedLocals` compiler option would error on genuinely unused parameters (like in interface implementations).

**References:**

- [ESLint no-unused-vars - Ignoring with underscore](https://eslint.org/docs/latest/rules/no-unused-vars#argsignorepattern)
- [TypeScript Handbook - Unused Parameters](https://www.typescriptlang.org/docs/handbook/compiler-options.html#handbook-content)

## ✅ Good

```ts
function fn(userId: string, _unused: number, firstName: string) {
  return userId + firstName;
}
```

## ❌ Bad

```ts
// PascalCase not allowed
function fn(UserId: string) {
  return UserId;
}

// snake_case not allowed for base parameters
function fn(user_id: string) {
  return user_id;
}
```


