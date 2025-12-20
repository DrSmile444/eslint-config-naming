# Type-like

- **Selector:** `typeLike`
- Required: `PascalCase`
- Custom: forbids prefix `I*` / `T*`

## Why This Rule

Type aliases, type parameters, and other type-like constructs follow the same reasoning as interfaces:

- **PascalCase**: Consistency with all other types (classes, interfaces, enums)
- **No `T*` prefix**: Same rationale as avoiding `I*` - it's redundant in modern TypeScript

The `T*` prefix was common in older codebases (`TUserId`, `TCallback`) but adds no value:

- **Type context is clear**: If you're using it as a type, it's obviously a type
- **Creates naming conflicts**: `TUser` vs `User` - which is the "real" name?
- **Inconsistent across codebases**: Some use `T`, others use `I`, others use nothing - standardizing on no prefix is clearest

**References:**

- [This TS naming convention is weird - Matt Pocock](https://www.youtube.com/watch?v=qA65QjWCl60) - section about unions, I and T prefixes
- [TypeScript Handbook - Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
- [Avoid the `I` prefix for interfaces - Mário S. Camargo](https://dev.to/mscamargo/why-you-should-avoid-using-the-i-prefix-for-interfaces-in-typescript-43gd) - detailed explanation applicable to type-like constructs

## ✅ Good

```ts
type UserId = string;
```

## ❌ Bad

```ts
type IUserId = string;
```
