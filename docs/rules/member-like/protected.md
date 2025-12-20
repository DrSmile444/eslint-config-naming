# Protected members

- **Modifiers:** `protected`
- Format: `camelCase`
- Leading underscore: forbidden

## Why This Rule

Protected members are special: they're neither fully private nor fully public. They form the **inheritance contract** between a base class and its subclasses.

**Why forbid the underscore:**

The TypeScript `protected` keyword already signals restricted visibility. Adding an underscore is redundant and uncommon in modern TypeScript codebases.

```ts
class BaseService {
  // Public API - for everyone
  public fetchData() {
    return this.loadFromCache();
  }

  // Protected - for subclasses only
  protected loadFromCache() { // WHY: camelCase protected method, no underscore
    return this.cache.get();
  }

  // Private - truly internal
  private cache = new Map();
}
```

**Benefits:**

- **Consistency with TS/JS ecosystem**: Most TypeScript codebases don't use `_` for protected members
- **No redundancy**: The visibility modifier already communicates intent
- **Cleaner API surface**: Member names read naturally without an underscore prefix

**References:**

- [TypeScript Handbook - Protected](https://www.typescriptlang.org/docs/handbook/2/classes.html#protected)

## ✅ Good

```ts
class Base {
  protected logger = console; // WHY: camelCase, no underscore, clear for subclasses
}
```

## ❌ Bad

```ts
class Base {
  protected _logger = console; // WHY: leading underscore redundant and forbidden for protected members
  protected Logger = console; // WHY: PascalCase for instance member is inconsistent
}
```
