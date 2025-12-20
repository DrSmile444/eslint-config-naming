# Object literal properties

- **Selector:** `objectLiteralProperty`
- Allows: `camelCase`, `snake_case`, `PascalCase`.

## Why This Rule

Object literal properties need flexibility to handle diverse use cases:

- **Interoperability**: External APIs often use different conventions (snake_case from Python/Ruby APIs, PascalCase from .NET)
- **Data transformation**: When mapping between different systems, forcing a single convention creates unnecessary friction
- **Domain modeling**: Sometimes property names represent external concepts that have established conventions

By allowing all three common conventions, we respect real-world constraints while maintaining internal consistency within each object. Mixed naming in the same object is still bad (see examples below), but you can choose the convention that matches your context.

**References:**

- [Airbnb JavaScript Style Guide - Naming Conventions](https://github.com/airbnb/javascript#naming-conventions)
- [TypeScript Handbook - Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)

## ✅ Good

```ts
const obj = {
  fooBar: 1, // WHY: camelCase — standard JS style for object properties
  foo_bar: 2, // WHY: snake_case — allowed for interop with external APIs
  FooBar: 3, // WHY: PascalCase — allowed when mirroring .NET/other external schemas
};

// Choosing a single convention per object is recommended for readability
```

## ❌ Bad

```ts
const obj = {
  Foo_bar: 1, // WHY: Mixed casing within a single property name is confusing and inconsistent
};

const mixed = {
  userName: 'Alice', // WHY: camelCase
  user_id: 42, // WHY: snake_case in same object - mixing conventions reduces readability
};
```

## Notes

If a property requires quotes (e.g. headers), it is ignored. See [Quoted Members](/rules/quoted-members).
