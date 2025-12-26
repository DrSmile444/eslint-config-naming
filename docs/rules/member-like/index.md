# Member-like

**Selector:** `memberLike`

Member-like covers class fields, methods, accessors, etc. Rules depend on modifiers:

- `public` / `private` / `protected`
- `static`
- `readonly`

## Pages

- [Public](/rules/member-like/public)
- [Private](/rules/member-like/private)
- [Private readonly](/rules/member-like/private-readonly)
- [Readonly](/rules/member-like/readonly)
- [Public static](/rules/member-like/public-static)
- [Private static](/rules/member-like/private-static)
- [Protected](/rules/member-like/protected)

## Why this matters

Member naming is the most visible surface of your API—both inside and outside the class.

## ✅ Good

```ts
class Example {
  public userName = 'Alice'; // WHY: public instance in camelCase
  private cacheKey = 'x'; // WHY: private instance in camelCase without underscore
  protected loadFromCache() {} // WHY: protected method in camelCase, no underscore
  public static readonly MAX_COUNT = 10; // WHY: public static constant in UPPER_CASE
}
```

## ❌ Bad

```ts
class Bad {
  public UserName = 'Alice'; // WHY: PascalCase for instance member is inconsistent
  private _cache = new Map(); // WHY: redundant underscore for private
  protected _load() {} // WHY: underscore not allowed for protected members
  public static foo_bar = 1; // WHY: snake_case not allowed for public static members
}
```

Short examples to show the common dos and don'ts across member-like selectors.
