
# Parameters (destructured)

**Selector:** `parameter` with `destructured` modifier
Allowed: `camelCase`, `snake_case`
Leading underscore: allowed

## ✅ Good

```ts
function greet({ firstName, last_name }: { firstName: string; last_name: string }) {
  return `${firstName} ${last_name}`;
}
```

## ❌ Bad

```ts
function greet({ Foo_bar }: { Foo_bar: string }) {
  return Foo_bar;
}
```
