# Exported / global functions

- **Selector:** `function` with modifiers `exported`, `global`
- Allowed: `PascalCase`, `camelCase`, leading `_` allowed

## Why This Rule

Exported functions form your module's public API. We allow both PascalCase and camelCase to support different patterns:

- **camelCase**: Standard for regular functions (`fetchUser`, `calculateTotal`)
- **PascalCase**: Common for factory functions and React functional components exported as functions
- **Leading underscore**: Rare but allowed for explicitly marked internal exports (e.g., `_internalTestHelper`)

This flexibility acknowledges that exported functions serve different roles. A utility function (`formatDate`) has different conventions than a component factory (`UserCard`).

**Note**: While this rule allows flexibility, the final camelCase enforcement rule may override this depending on your configuration. See [CamelCase enforcement](/rules/functions/camel-case-only).

**References:**

- [Airbnb JavaScript Style Guide - Naming Conventions](https://github.com/airbnb/javascript#naming--Acronyms-and-Initialisms)
- [React TypeScript Cheatsheet - Function Components](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/)

## ✅ Good

```ts
export function ExportedFunction() {
  // WHY: PascalCase allowed for factory-like exported functions
  return 1;
}

export function exportedFunction() {
  // WHY: camelCase allowed for regular exported functions
  return 1;
}

export const _internalHelper = () => 42; // WHY: leading underscore allowed for intentionally internal exports
```

These examples show allowed exported names: PascalCase for factory-style functions, camelCase for normal functions, and an underscore-prefixed export for internal helpers.

## ❌ Bad

```ts
export function exported_function_bad() {
  // WHY: snake_case is not allowed for exported functions in this rule set
  return 1;
}

export function Exported_Function() {
  // WHY: Mixed underscores and PascalCase are disallowed — inconsistent with conventions
  return 1;
}
```

The 'Bad' examples use underscores in function names which goes against the permitted patterns and reduces consistency in the public API surface.
