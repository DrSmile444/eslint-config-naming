# Public static members

- **Modifiers:** `public`, `static`
- Allowed: `camelCase`, `PascalCase`, `UPPER_CASE`
- Leading underscore: allowed
- **Debatable**: yes, typescript docs specifies `camelCase` for everything, but many popular style guides recommend PascalCase for statics

## Why This Rule

Public static members serve as class-level API - they're accessible without instantiation. The naming reflects their role:

- **camelCase**: For static methods and native-like static helpers (`Array.from`, `Promise.allSettled`) and general JS/TS static APIs
- **PascalCase**: For factory methods, singleton accessors, or class-level values (`User.Empty`, `Config.Default`)
- **UPPER_CASE**: For true constants (`Math.PI`, `Number.MAX_VALUE`)

**Why allow camelCase or PascalCase for statics:**

Static members often represent special values or factory patterns:

```ts
class User {
  // Factory or special instance
  public static Empty = new User('', '');

  // Singleton accessor
  public static get Instance() {
    return instance;
  }

  // Native-like static method naming, the same as Array.from
  public static fromPayload(payload: any) {
    return new User(payload.name, payload.email);
  }
}
```

- JavaScript and TypeScript built-in APIs commonly use `camelCase` for static methods (e.g. `Array.from`, `Promise.resolve`).
- `PascalCase` remains useful for static factory values or singleton properties and mirrors conventions from languages like C# and Java.

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
  public static fooBar = 1; // camelCase is allowed
  public static FooBar = 2; // PascalCase is allowed
  public static FOO_BAR = 3; // UPPER_CASE for constants
}
```

## ❌ Bad

```ts
class Example {
  public static foo_bar = 1; // snake_case is not allowed for public static
}
```
