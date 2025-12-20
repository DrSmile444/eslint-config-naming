# Local functions (default)

- **Selector:** `function`
- Earlier allowance: `PascalCase` / `camelCase` with leading `_` allowed

## Why This Rule

Local functions (non-exported) initially have broader naming flexibility to support various patterns:

- **PascalCase**: Useful for factory functions or constructor-like functions
- **camelCase**: The standard JavaScript convention for functions
- **Leading underscore**: Signals internal/private utility functions

However, this is **superseded by the final camelCase enforcement** (see below). This layered approach exists because ESLint's `@typescript-eslint/naming-convention` evaluates rules in order, and the last matching rule wins.

**Important**: In practice, all functions end up requiring camelCase due to the final enforcement rule. This entry exists as part of the rule cascade.

But note: a later rule enforces **camelCase** for all functions. See [CamelCase enforcement](/rules/functions/camel-case-only).

## ✅ Good

```ts
function localFunction() { // WHY: camelCase is the standard and widely accepted for local functions
  return 1;
}

function LocalFactory() { // WHY: PascalCase can be acceptable for constructor-like or factory functions (but later rules may override)
  return {};
}
```

## ❌ Bad

```ts
function local_function() { // WHY: snake_case is not a preferred convention for functions here
  return 1;
}

function Local_Function() { // WHY: mixed PascalCase and underscores are inconsistent and discouraged
  return {};
}
```

These bad examples illustrate alternative styles the default rule originally allowed but which should be avoided in favor of consistent camelCase once the final enforcement applies.
