
# Private instance members

**Modifiers:** `private`
Allowed: `camelCase`
Leading underscore: forbidden

## ✅ Good

```ts
class Example {
  private cacheKey = "x";
}
```

## ❌ Bad

```ts
class Example {
  private _cacheKey = "x";
  private CacheKey = "y";
}
```
