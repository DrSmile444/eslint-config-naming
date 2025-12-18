
# Protected members

**Modifiers:** `protected`
Format: `camelCase`
Leading underscore: required

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
