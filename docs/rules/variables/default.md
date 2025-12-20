# Variables (default)

- **Selector:** `variable`
- Allowed: `camelCase`, `UPPER_CASE`

## Why This Rule

Variables follow JavaScript's standard conventions:

- **camelCase**: Standard for regular variables (`userName`, `orderTotal`)
- **UPPER_CASE**: Convention for true constants (`MAX_RETRIES`, `API_KEY`)

**When to use each:**

- Use `camelCase` for values that represent program state: `let currentUser`, `const responseData`
- Use `UPPER_CASE` for configuration constants and magic numbers: `const MAX_ATTEMPTS = 3`, `const DEFAULT_TIMEOUT = 5000`

This dual-format approach is nearly universal in JavaScript/TypeScript. It provides a visual cue: UPPER_CASE screams "this value never changes and represents a configuration constant," while camelCase says "this is a normal variable."

**References:**

- [Airbnb JavaScript Style Guide - Naming Conventions](https://github.com/airbnb/javascript#naming-conventions)
- [MDN JavaScript Guide - Variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables)

## ✅ Good

```ts
let userName = 'Alice'; // WHY: camelCase for runtime variables
const MAX_RETRIES = 3; // WHY: UPPER_CASE for constants
```

## ❌ Bad

```ts
let UserName = 'Alice'; // WHY: PascalCase suggests a type or class, not a runtime variable
```
