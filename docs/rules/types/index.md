# Types

This section covers naming for:

- `interface`
- `class`
- `enum`
- `typeAlias` (type aliases)
- `typeParameter` (generics)

Pages:

- [Enum names](/rules/types/enum-name)
- [Enum members](/rules/types/enum-member)
- [Classes](/rules/types/class)
- [Interfaces](/rules/types/interface)
- [Type aliases](/rules/types/type-like)
- [Type parameters (generics)](/rules/types/type-parameter)

## ✅ Good

```ts
interface User {
  // WHY: PascalCase for interface/type names
  id: string;
}

class UserService {} // WHY: PascalCase for classes
```

## ❌ Bad

```ts
interface IUser {
  // WHY: leading 'I' prefix is discouraged
  id: string;
}

class userService {} // WHY: camelCase for class name is confusing
```
