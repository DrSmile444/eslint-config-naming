# Protected members

**Modifiers:** `protected`
Format: `camelCase`
Leading underscore: required

## Why This Rule

Protected members are special: they're neither fully private nor fully public. They form the **inheritance contract** between a base class and its subclasses.

**Why require the underscore:**

The underscore provides a visual signal: "This is for inheritance. Think carefully before using it."

```ts
class BaseService {
  // Public API - for everyone
  public fetchData() {
    return this._loadFromCache();
  }

  // Protected - for subclasses only
  protected _loadFromCache() {
    return this.cache.get();
  }

  // Private - truly internal
  private cache = new Map();
}
```

**Benefits:**

- **Quick visual scan**: Easily identify the inheritance surface area
- **Prevents confusion**: Clear distinction from public and private members
- **Convention signal**: Matches patterns from other languages (Python uses `_` for "protected")

Unlike private members where the keyword is enough, protected members benefit from the extra signal because they're intentionally designed for extension, which is more dangerous than simple encapsulation.

**References:**

- [Python PEP 8 - Naming Conventions](https://pep8.org/#descriptive-naming-styles) - uses `_` for internal/protected
- [TypeScript Handbook - Protected](https://www.typescriptlang.org/docs/handbook/2/classes.html#protected)
- [Effective TypeScript - Item 14](https://effectivetypescript.com/) - discusses visibility modifiers

## ✅ Good

```ts
class Base {
  protected _logger = console;
}
```

## ❌ Bad

```ts
class Base {
  protected logger = console;
}
```
