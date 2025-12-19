
# Private instance members

**Modifiers:** `private`
Allowed: `camelCase`
Leading underscore: forbidden

## Why This Rule

**camelCase**: Consistent with JavaScript/TypeScript conventions for instance members.

**No leading underscore**: The `private` keyword is explicit enough. Adding an underscore is redundant:

```ts
// Redundant - the keyword already says "private"
private _userName: string;

// Clear and concise
private userName: string;
```

**Historical context**: The underscore prefix comes from languages without access modifiers (JavaScript pre-ES6, Python). Developers used `_` to signal "don't touch this." TypeScript has real `private` modifiers - the compiler enforces privacy, so the visual signal is unnecessary.

**Benefits of no underscore:**
- Less noise in your code
- The `private` keyword is more reliable than convention
- Your IDE shows access levels clearly
- Easier refactoring (changing access level doesn't require renaming)

**References:**
- [Microsoft TypeScript Coding Guidelines](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines#names) - explicitly avoids underscore for private
- [Google TypeScript Style Guide - Private Fields](https://google.github.io/styleguide/tsguide.html#properties-used-outside-of-class-lexical-scope)
- [TypeScript Handbook - Member Visibility](https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility)

## ✅ Good

```ts
class Example {
  private cacheKey = "x";
}
```

## ❌ Bad

```ts
class Example {
  private _cacheKey = "x";
  private CacheKey = "y";
}
```
