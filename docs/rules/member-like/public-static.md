# Public static members

- **Modifiers:** `public`, `static`
- Allowed: `PascalCase`, `UPPER_CASE`
- Leading underscore: allowed
- **Debatable**: yes, typescript docs specifies `camelCase` for everything, but many popular style guides recommend PascalCase for statics

## Why This Rule

Public static members serve as class-level API - they're accessible without instantiation. The naming reflects their role:

- **PascalCase**: For factory methods, singleton accessors, or class-level values (`User.Empty`, `Config.Default`)
- **UPPER_CASE**: For true constants (`Math.PI`, `Number.MAX_VALUE`)

**Why PascalCase for statics:**

Static members often represent special values or factory patterns:

```ts
class User {
  // Factory or special instance
  public static Empty = new User('', '');

  // Singleton accessor
  public static get Instance() {
    return instance;
  }
}
```

- This matches conventions from other languages (C#, Java) where static members use `PascalCase` unless they're constants.
- This aligns with conventions for class names and modules, which are effectively "static classes" in some cases.

**Why UPPER_CASE for constants:**

```ts
class User {
  // True constants, the same as Number.MAX_VALUE
  public static readonly MAX_NAME_LENGTH = 100;
}

console.log(User.MAX_NAME_LENGTH);
```

Constants are static and immutable across the application. Use `UPPER_CASE_WITH_UNDERSCORES` (e.g., `API_BASE_URL`). This clearly indicates an immutable value determined at compile time.

**Why allow underscore:**

Rare, but useful for internal static helpers that are technically public but discouraged:

```ts
public static _internalTestHelper() { } // Available for testing but marked as internal
```

**References:**

- [TypeScript Handbook - Static Members](https://www.typescriptlang.org/docs/handbook/2/classes.html#static-members)

## ✅ Good

```ts
class Example {
  public static FooBar = 1;
  public static FOO_BAR = 2;
}
```

## ❌ Bad

```ts
class Example {
  public static fooBar = 1;
}
```
