# Interfaces

- **Selector:** `interface`
- Required: `PascalCase`
- Custom: forbids prefix `I*` / `T*` when `I`/`T` is followed by uppercase

## Why This Rule

**PascalCase**: Consistent with all other types (classes, type aliases), making the codebase uniform.

**No `I*` prefix**: The `I` prefix (inherited from C# and Java) is redundant in TypeScript:

- **Your editor shows the type**: Hover reveals whether something is an interface, type, or class
- **TypeScript is structurally typed**: The distinction between interface and type is often irrelevant
- **Refactoring pain**: Changing from `interface` to `type` shouldn't require renaming everything
- **Noise without value**: `IUser` vs `User` - the prefix adds no information the type system doesn't already provide

Modern TypeScript codebases overwhelmingly reject the `I` prefix. It's a holdover from languages where the distinction between abstract and concrete types is more critical.

**Note**: Prefixes like `IFrame` or `Identifiable` are allowed because they're actual words, not type prefixes.

**References:**

- [TypeScript ESLint - Naming Convention for Interfaces](https://typescript-eslint.io/rules/naming-convention/#enforce-that-interface-names-do-not-begin-with-an-i)
- [TypeScript Deep Dive - Interfaces](https://basarat.gitbook.io/typescript/type-system/interfaces)
- [Avoid the `I` prefix for interfaces - Mário S. Camargo](https://dev.to/mscamargo/why-you-should-avoid-using-the-i-prefix-for-interfaces-in-typescript-43gd) - detailed explanation
- [Microsoft TypeScript Coding Guidelines](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines#names) - explicitly avoids `I` prefix

## ✅ Good

```ts
interface UserProfile {
  id: string;
}
```

## ❌ Bad

```ts
interface IUserProfile {
  id: string;
}
```
