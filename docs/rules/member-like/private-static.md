# Private static members

- **Modifiers:** `private`, `static`
- Allowed: `camelCase`, `PascalCase`, `UPPER_CASE`
- Leading underscore: forbidden
- **Debatable**: yes, we don't have docs online for this one yet. So we allow multiple formats for different use cases, including public static members, but forbid underscore to avoid redundancy.

## Why This Rule

Private static members are class-level internals - shared across all instances but not exposed externally.

**Allowed formats:**

- **camelCase**: For internal helpers and caches that follow native-like JS naming
- **PascalCase**: For singleton instances, caches, or shared resources
- **UPPER_CASE**: For internal constants

**No underscore:** The `private` keyword is explicit enough - adding an underscore is redundant.

**Common use cases:**

```ts
class DatabaseService {
  // Singleton instance (private static)
  private static Instance: DatabaseService;

  // Shared cache (private static)
  private static QueryCache = new Map();

  // Internal helper (private static)
  private static computeKey(value: string) { return value.trim(); }

  // Internal constant (private static)
  private static readonly MAX_POOL_SIZE = 10;
}
```

Private statics often manage class-level state or configuration. camelCase works well for internal helper methods and caches, PascalCase for object instances, while UPPER_CASE works for true constants.

**References:**

- [TypeScript Handbook - Static Members](https://www.typescriptlang.org/docs/handbook/2/classes.html#static-members)

## ✅ Good

```ts
class Example {
  private static fooBar = 1; // camelCase allowed for internal helpers/caches
  private static FooBar = 2; // PascalCase allowed for instances
  private static FOO_BAR = 3; // UPPER_CASE for constants
}
```

## ❌ Bad

```ts
class Example {
  private static _FooBar = 1; // leading underscore forbidden
}
```
