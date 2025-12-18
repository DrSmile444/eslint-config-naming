
# Public static members

**Modifiers:** `public`, `static`
Allowed: `PascalCase`, `UPPER_CASE`
Leading underscore: allowed

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
