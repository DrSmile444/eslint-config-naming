
# Migrating from Airbnb (or other presets)

## Typical conflicts

* Airbnb discourages some legacy syntax (iterators/generators, etc.)
* Your project may already have its own naming rules

## Recommended approach

1. Keep Airbnb (or any base) as-is
2. Add this naming config
3. Use file-based overrides for:

   * generated code
   * legacy folders
   * third-party DTOs

## Example

```js
export default [
  // your base configs...
  ...naming,
  {
    files: ["**/generated/**"],
    rules: {
      "@typescript-eslint/naming-convention": "off",
    },
  },
];
```
