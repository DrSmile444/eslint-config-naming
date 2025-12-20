# CamelCase enforcement (final)

- **Selector:** `function`
- Final rule: `camelCase` only

## Why This Rule

This is the "final word" on function naming. Despite earlier rules allowing PascalCase or underscores, this rule enforces strict camelCase for all functions.

**Rationale:**

- **Consistency**: Functions in JavaScript/TypeScript are traditionally camelCase (following the language's own built-in functions)
- **Predictability**: Developers can immediately recognize functions vs. classes (PascalCase) vs. constants (UPPER_CASE)
- **Community standard**: The overwhelming majority of JavaScript/TypeScript codebases use camelCase for functions

This "last rule wins" approach is intentional: it allows the configuration to define general patterns first, then enforce the specific convention. If you need PascalCase functions (e.g., for React components), consider using arrow function variables instead: `const MyComponent = () => ...`

**References:**

- [JavaScript Naming Conventions - MDN](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/JavaScript#function_names)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/tsguide.html#naming-rules-by-identifier-type)

This is a "last word" rule: it keeps function names predictable.

## ✅ Good

```ts
function doWork() {
  // WHY: camelCase — follows the enforced final rule and matches JS conventions
  return 1;
}

function handleClickEvent() {
  // WHY: camelCase — descriptive and idiomatic for event handlers
  return;
}
```

## ❌ Bad

```ts
function DoWork() {
  // WHY: PascalCase looks like a constructor/class and is disallowed by the final rule
  return 1;
}

function do_work() {
  // WHY: snake_case is inconsistent with JavaScript naming conventions for functions
  return 1;
}
```
