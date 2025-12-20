# Classes

- **Selector:** `class`
- Required: `PascalCase`

## Why This Rule

PascalCase for classes is a universal convention across almost all programming languages (Java, C#, Python, Ruby, etc.). This convention:

- **Instantly distinguishes** types from values at a glance
- **Matches constructor usage**: `new UserService()` reads naturally
- **Aligns with community standards**: 99% of TypeScript codebases follow this

**Benefits:**

- When you see `UserService`, you immediately know it's a `class` or type.
- When you see `userService`, you know it's an `instance` or `variable`.

This visual distinction reduces cognitive load and prevents naming conflicts.

**References:**

- [TypeScript Handbook - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [Airbnb JavaScript Style Guide - PascalCase for Classes](https://github.com/airbnb/javascript#naming--PascalCase)

## ✅ Good

```ts
class UserService {}
```

## ❌ Bad

```ts
class userService {}
```
