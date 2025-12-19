
# Parameters (base)

**Selector:** `parameter`
Allowed: `camelCase`, `snake_case`
Leading underscore: allowed

## Why This Rule

Function parameters need flexibility because they often mirror external data or conventions:

- **camelCase**: Standard JavaScript/TypeScript convention
- **snake_case**: Common when interfacing with Python, Ruby, or SQL-based systems
- **Leading underscore**: Conventional signal for intentionally unused parameters (e.g., `_event`, `_req`)

**Practical scenarios:**
- Callbacks: `function handler(_event) { }` - clearly marking unused params
- External APIs: `function process({ user_id, created_at }) { }` - matching API response shape
- Destructuring: Parameters often destructure from objects with specific naming conventions

The leading underscore is especially valuable in TypeScript where the `noUnusedLocals` compiler option would error on genuinely unused parameters (like in interface implementations).

**References:**
- [TypeScript Handbook - Unused Parameters](https://www.typescriptlang.org/docs/handbook/compiler-options.html#handbook-content)
- [ESLint no-unused-vars - Ignoring with underscore](https://eslint.org/docs/latest/rules/no-unused-vars#argsignorepattern)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#naming-conventions)

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
