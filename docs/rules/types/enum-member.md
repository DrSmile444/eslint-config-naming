
# Enum members

**Selector:** `enumMember`
Required: `UPPER_CASE`

## Why This Rule

Enum members are compile-time constants, and UPPER_CASE is the universal convention for constants:

- **Instantly recognizable**: `Status.PENDING` is clearly a constant value
- **Distinguishes from methods**: `Status.PENDING` vs `status.toString()` 
- **Matches other constants**: Consistent with `const MAX_RETRIES = 3`
- **Industry standard**: This convention exists in Java, C#, Python, and most other languages

The visual distinction helps when scanning code:

```ts
enum Status {
  PENDING,
  APPROVED,
  REJECTED,
}

// Usage is immediately clear
if (order.status === Status.PENDING) {
  // Clearly using a constant value
}
```

Alternatives like PascalCase (`Status.Pending`) or camelCase (`Status.pending`) blur the line between types, values, and functions, reducing readability.

**References:**
- [Google Java Style Guide - Constant Names](https://google.github.io/styleguide/javaguide.html#s5.2.4-constant-names)
- [MDN JavaScript Guide - Constants](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#constants)
- [Airbnb JavaScript Style Guide - Constants](https://github.com/airbnb/javascript#naming--uppercase)

## ✅ Good

```ts
enum Status {
  IN_PROGRESS,
  DONE,
}
```

## ❌ Bad

```ts
enum Status {
  InProgress,
}
```
