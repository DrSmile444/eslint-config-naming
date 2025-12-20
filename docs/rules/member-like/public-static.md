# Public static members

- **Modifiers:** `public`, `static`
- Allowed: `camelCase`, `PascalCase`, `UPPER_CASE`
- Leading underscore: allowed
- **Debatable**: yes, typescript docs specifies `camelCase` for everything, but many popular style guides recommend `PascalCase` for statics

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
  public static Empty = new User('', ''); // WHY: PascalCase used for a static value representing a special instance

  // Singleton accessor
  public static get Instance() { // WHY: PascalCase getter for singleton accessor reads like a property
    return instance;
  }

  // Native-like static method naming, the same as Array.from
  public static fromPayload(payload: any) { // WHY: camelCase for static method similar to built-in APIs
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
  public static readonly MAX_NAME_LENGTH = 100; // WHY: UPPER_CASE indicates an unchanging constant value
}

console.log(User.MAX_NAME_LENGTH);
```

Constants are static and immutable across the application. Use `UPPER_CASE_WITH_UNDERSCORES` (e.g., `API_BASE_URL`). This clearly indicates an immutable value determined at compile time.

**Why allow underscore:**

Rare, but useful for internal static helpers that are technically public but discouraged:

```ts
class ExampleInternal {
  public static _internalTestHelper() { } // WHY: leading underscore signals internal-use despite being public
}
```

**References:**

- [TypeScript Handbook - Static Members](https://www.typescriptlang.org/docs/handbook/2/classes.html#static-members)

## ✅ Good

```ts
class Example {
  public static fooBar = 1; // WHY: camelCase is allowed for static properties/methods
  public static FooBar = 2; // WHY: PascalCase allowed for static values or factory-like members
  public static FOO_BAR = 3; // WHY: UPPER_CASE for constants communicates immutability
}
```

## ❌ Bad

```ts
class Example {
  public static foo_bar = 1; // WHY: snake_case is discouraged for public static members
  public static Foo_bar = 2; // WHY: Mixed conventions reduce clarity
}
```
