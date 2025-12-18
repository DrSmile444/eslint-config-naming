
# Object literal properties

**Selector:** `objectLiteralProperty`

Allows: `camelCase`, `snake_case`, `PascalCase`.

## ✅ Good

```ts
const obj = {
  fooBar: 1,
  foo_bar: 2,
  FooBar: 3,
};
```

## ❌ Bad

```ts
const obj = {
  Foo_bar: 1,
};
```

## Notes

If a property requires quotes (e.g. headers), it is ignored. See [Quoted Members](/rules/quoted-members).
