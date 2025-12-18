
# Private static members

**Modifiers:** `private`, `static`
Allowed: `PascalCase`, `UPPER_CASE`
Leading underscore: forbidden

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
