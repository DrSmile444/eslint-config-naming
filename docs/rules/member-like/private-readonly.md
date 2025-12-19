# Private readonly members

**Modifiers:** `private`, `readonly`
Allowed: `UPPER_CASE`, `camelCase`
Leading underscore: forbidden

## Why This Rule

Private readonly members are immutable internals. They can represent either constants or configuration:

- **UPPER_CASE**: For true constants set at compile time (`MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- **camelCase**: For values initialized in the constructor or set once (`apiKey`, `userId`)

**When to use each:**

```ts
class ApiClient {
  // True constant - known at compile time
  private readonly MAX_RETRIES = 3;

  // Configuration value - set in constructor
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
}
```

**No underscore:** The `private` keyword already signals encapsulation. The underscore adds no value.

**Why allow both formats:**

Not all readonly values are constants. Some are set once during initialization and never change, but they're instance-specific configuration rather than universal constants. Using camelCase for these feels more natural than SHOUTING_CASE.

**References:**

- [TypeScript Handbook - Readonly Properties](https://www.typescriptlang.org/docs/handbook/2/classes.html#readonly)
- [Effective TypeScript - Item 19](https://effectivetypescript.com/) - discusses readonly
- [Google TypeScript Style Guide - Constants](https://google.github.io/styleguide/tsguide.html#naming-style)

## ✅ Good

```ts
class Example {
  private readonly MAX_RETRIES = 3;
  private readonly maxRetries = 3;
}
```

## ❌ Bad

```ts
class Example {
  private readonly _maxRetries = 3;
  private readonly MaxRetries = 3;
}
```
