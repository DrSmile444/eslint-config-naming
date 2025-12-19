
# Exported / global functions

**Selector:** `function` with modifiers `exported`, `global`
Allowed: `PascalCase`, `camelCase`, leading `_` allowed

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
  return 1;
}

export function exportedFunction() {
  return 1;
}
```

## ❌ Bad

```ts
export function exported_function_bad() {
  return 1;
}
```
