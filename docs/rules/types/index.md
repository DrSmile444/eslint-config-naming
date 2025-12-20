# Types

This section covers naming for:

- `interface`
- `class`
- `enum`
- `typeLike` (type aliases and similar)

Pages:

- [Enum names](/rules/types/enum-name)
- [Enum members](/rules/types/enum-member)
- [Classes](/rules/types/class)
- [Interfaces](/rules/types/interface)
- [Type-like](/rules/types/type-like)

## ✅ Good

```ts
interface User { // WHY: PascalCase for interface/type names
  id: string;
}

class UserService {} // WHY: PascalCase for classes
```

## ❌ Bad

```ts
interface IUser { // WHY: leading 'I' prefix is discouraged
  id: string;
}

class userService {} // WHY: camelCase for class name is confusing
```
