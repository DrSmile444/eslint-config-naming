
# Private static members

**Modifiers:** `private`, `static`
Allowed: `PascalCase`, `UPPER_CASE`
Leading underscore: forbidden

## Why This Rule

Private static members are class-level internals - shared across all instances but not exposed externally.

**Allowed formats:**
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
  
  // Internal constant (private static)
  private static readonly MAX_POOL_SIZE = 10;
}
```

Private statics often manage class-level state or configuration. PascalCase works well for object instances, while UPPER_CASE works for true constants.

**References:**
- [TypeScript Handbook - Static Members](https://www.typescriptlang.org/docs/handbook/2/classes.html#static-members)
- [Singleton Pattern](https://www.patterns.dev/posts/singleton-pattern/)
- [Microsoft TypeScript Coding Guidelines](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines#names)

## ✅ Good

```ts
class Example {
  private static FooBar = 1;
  private static FOO_BAR = 2;
}
```

## ❌ Bad

```ts
class Example {
  private static _FooBar = 1;
  private static fooBar = 2;
}
```
