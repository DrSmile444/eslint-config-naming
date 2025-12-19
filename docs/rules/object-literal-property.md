
# Object literal properties

**Selector:** `objectLiteralProperty`

Allows: `camelCase`, `snake_case`, `PascalCase`.

## Why This Rule

Object literal properties need flexibility to handle diverse use cases:

- **Interoperability**: External APIs often use different conventions (snake_case from Python/Ruby APIs, PascalCase from .NET)
- **Data transformation**: When mapping between different systems, forcing a single convention creates unnecessary friction
- **Domain modeling**: Sometimes property names represent external concepts that have established conventions

By allowing all three common conventions, we respect real-world constraints while maintaining internal consistency within each object. Mixed naming in the same object is still bad (see examples below), but you can choose the convention that matches your context.

**References:**
- [Airbnb JavaScript Style Guide - Naming Conventions](https://github.com/airbnb/javascript#naming-conventions)
- [Google TypeScript Style Guide - Identifiers](https://google.github.io/styleguide/tsguide.html#identifiers)

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
