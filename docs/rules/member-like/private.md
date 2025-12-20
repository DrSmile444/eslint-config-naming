# Private instance members

- **Modifiers:** `private`
- Allowed: `camelCase`
- Leading underscore: forbidden

## Why This Rule

**camelCase**: Consistent with JavaScript/TypeScript conventions for instance members.

**No leading underscore**: The `private` keyword is explicit enough. Adding an underscore is redundant:

```ts
// Redundant - the keyword already says "private"
private _userName: string; // WHY: Redundant underscore adds noise; private already enforces visibility

// Clear and concise
private userName: string; // WHY: Preferred form: clear and follows camelCase
```

**Historical context**: The underscore prefix comes from languages without access modifiers (JavaScript pre-ES6, Python). Developers used `_` to signal "don't touch this." TypeScript has real `private` modifiers - the compiler enforces privacy, so the visual signal is unnecessary.

**Benefits of no underscore:**

- Less noise in your code
- The `private` keyword is more reliable than convention
- Your IDE shows access levels clearly
- Easier refactoring (changing access level doesn't require renaming)

**References:**

- [Microsoft TypeScript Coding Guidelines](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines#names) - explicitly avoids underscore for private
- [TypeScript Handbook - Member Visibility](https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility)

## ✅ Good

```ts
class Example {
  private cacheKey = 'x'; // WHY: camelCase without underscore; private keyword expresses intent
  private userName: string; // WHY: clear camelCase name for a private instance field
}
```

Both examples show private members using camelCase without leading underscores, following modern TypeScript style.

## ❌ Bad

```ts
class Example {
  private _cacheKey = 'x'; // WHY: leading underscore is redundant and discouraged
  private CacheKey = 'y'; // WHY: PascalCase for instance members is inconsistent with conventions
}

class Bad2 {
  private MAX_RETRIES = 5; // WHY: UPPER_CASE implies global constant, not an instance field
}
```

These bad examples either use redundant underscores, the wrong case for instance members, or UPPER_CASE which implies a different semantic meaning.
