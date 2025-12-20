# Functions

Functions are validated in multiple passes.

Key idea: even if an earlier entry allows more, the **last matching entry wins** (rule order matters).

Pages:

- [Local (default)](/rules/functions/default)
- [Exported / global](/rules/functions/exported-global)
- [CamelCase enforcement](/rules/functions/camel-case-only)

## ✅ Good

```ts
// Local function - camelCase is preferred
function doWork() {
  // WHY: camelCase - consistent and the final rule of the config enforces this
  return true;
}

// Exported function - PascalCase sometimes allowed for factories
export function CreateUser() {
  // WHY: PascalCase allowed for factory-style exports, but final camelCase rule may override in strict configs
  return {};
}
```

## ❌ Bad

```ts
function Do_Work() {
  // WHY: Mixed PascalCase/underscores is inconsistent and disallowed by final rules
  return false;
}
```

A small summary to show how the cascade works and what the final enforced pattern usually is.
