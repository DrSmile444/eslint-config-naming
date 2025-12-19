
# CamelCase enforcement (final)

**Selector:** `function`
Final rule: `camelCase` only

## Why This Rule

This is the "final word" on function naming. Despite earlier rules allowing PascalCase or underscores, this rule enforces strict camelCase for all functions.

**Rationale:**
- **Consistency**: Functions in JavaScript/TypeScript are traditionally camelCase (following the language's own built-in functions)
- **Predictability**: Developers can immediately recognize functions vs. classes (PascalCase) vs. constants (UPPER_CASE)
- **Community standard**: The overwhelming majority of JavaScript/TypeScript codebases use camelCase for functions

This "last rule wins" approach is intentional: it allows the configuration to define general patterns first, then enforce the specific convention. If you need PascalCase functions (e.g., for React components), consider using arrow function variables instead: `const MyComponent = () => ...`

**References:**
- [JavaScript Naming Conventions - MDN](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/JavaScript#function_names)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html#naming-camel-case-defined)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#naming-conventions)

This is a "last word" rule: it keeps function names predictable.

## ✅ Good

```ts
function doWork() {
  return 1;
}
```

## ❌ Bad

```ts
function DoWork() {
  return 1;
}

function do_work() {
  return 1;
}
```
