
# Private readonly members

**Modifiers:** `private`, `readonly`
Allowed: `UPPER_CASE`, `camelCase`
Leading underscore: forbidden

## ✅ Good

```ts
class Example {
  private readonly MAX_RETRIES = 3;
  private readonly maxRetries = 3;
}
```

## ❌ Bad

```ts
class Example {
  private readonly _maxRetries = 3;
  private readonly MaxRetries = 3;
}
```
