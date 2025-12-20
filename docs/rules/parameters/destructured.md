# Parameters (destructured)

- **Selector:** `parameter` with `destructured` modifier
- Allowed: `camelCase`, `snake_case`
- Leading underscore: allowed

## Why This Rule

Destructured parameters often come from external sources where you don't control the naming convention. Enforcing a specific format would force you to:

1. Rename immediately: `({ user_name: userName })` - adds noise
2. Not use destructuring: defeats the purpose of the feature
3. Compromise on interoperability with external APIs

By allowing flexibility, we honor the "respect real-world interoperability" principle. If an API returns `{ first_name, last_name }`, your function can naturally accept `({ first_name, last_name }) => ...`

This is consistent with our approach to destructured variables and object literal properties: when dealing with external shapes, flexibility beats forced consistency.

**References:**

- [MDN - Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [TypeScript Handbook - Destructuring](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#destructuring)

## ✅ Good

```ts
function greet({ firstName, last_name }: { firstName: string; last_name: string }) {
  return `${firstName} ${last_name}`;
}
```

## ❌ Bad

```ts
function greet({ Foo_bar }: { Foo_bar: string }) {
  return Foo_bar;
}
```
