# Enum members

- **Selector:** `enumMember`
- Required: `UPPER_CASE`

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

- [Enums considered harmful - Matt Pocock](https://www.youtube.com/watch?v=jjMbPt_H3RQ)
- [Java Enums - Oracle](https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html)

## ✅ Good

```ts
enum Status {
  IN_PROGRESS, // WHY: UPPER_CASE signals a constant enum member
  DONE, // WHY: short, uppercase tokens make intent clear
}
```

## ❌ Bad

```ts
enum Status {
  InProgress, // WHY: PascalCase blurs the line between types and values
}

enum Other {
  inProgress, // WHY: camelCase is not appropriate for enum members
}
```
