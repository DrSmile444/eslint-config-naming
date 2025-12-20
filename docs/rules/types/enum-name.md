# Enum names

- **Selector:** `enum`
- Required: `PascalCase`
- Custom: forbids `I*`/`T*` prefix and some plural-ish forms (`*es`, `*s` but not `*us`)

## Why This Rule

**PascalCase**: Enums are types, so they follow the same convention as classes and interfaces.

**Singular names**: Enums represent a category or type, not a collection:

- `Status` not `Statuses` - the enum represents the concept of "status"
- `OrderType` not `OrderTypes` - it's a type classification
- `Direction` not `Directions` - it's a category

**Why singular reads better:**

```ts
// Good - reads naturally
if (order.status === Status.PENDING) {
}

// Bad - awkward phrasing
if (order.status === Statuses.PENDING) {
}
```

The singular form makes usage read like natural language: "the order's status is PENDING" not "the order's statuses is PENDING."

**Exception**: Names ending in `*us` (like `Status`, `Radius`) are allowed because they're singular Latin words, not plural forms.

**References:**

- [Singular vs. Plural Naming for Enumerations - Stack Overflow](https://stackoverflow.com/questions/1335959/what-are-the-arguments-for-using-singular-vs-plural-for-enumerations)
- [Enums considered harmful - Matt Pocock](https://www.youtube.com/watch?v=jjMbPt_H3RQ)
- [TypeScript Handbook - Enums](https://www.typescriptlang.org/docs/handbook/enums.html)

## ✅ Good

```ts
enum OrderStatus {
  PENDING,
}
```

## ❌ Bad

```ts
enum OrderStatuses {
  PENDING,
}
```
