
# Public static members

**Modifiers:** `public`, `static`
Allowed: `PascalCase`, `UPPER_CASE`
Leading underscore: allowed

## Why This Rule

Public static members serve as class-level API - they're accessible without instantiation. The naming reflects their role:

- **PascalCase**: For factory methods, singleton accessors, or class-level values (`User.Empty`, `Config.Default`)
- **UPPER_CASE**: For true constants (`Math.PI`, `Number.MAX_VALUE`)

**Why PascalCase for statics:**

Static members often represent special values or factory patterns:

```ts
class User {
  // Factory or special instance
  public static Empty = new User("", "");
  
  // Singleton accessor
  public static get Instance() {
    return instance;
  }
  
  // True constants
  public static readonly MAX_NAME_LENGTH = 100;
}
```

This matches conventions from other languages (C#, Java) where static members use PascalCase unless they're constants.

**Why allow underscore:**

Rare, but useful for internal static helpers that are technically public but discouraged:
```ts
public static _internalTestHelper() { } // Available for testing but marked as internal
```

**References:**
- [C# Naming Guidelines - Static Fields](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/names-of-type-members#names-of-fields)
- [Java Naming Conventions - Static Fields](https://www.oracle.com/java/technologies/javase/codeconventions-namingconventions.html)
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
