# Rule Matrix

This page maps each enforced selector to the naming format.

| Area            | Selector                                     | What it targets                | Enforced                                              |
| --------------- | -------------------------------------------- | ------------------------------ | ----------------------------------------------------- |
| Variables       | `variable`                                   | locals/consts/etc              | varies by modifiers/types                             |
| Abbreviations   | `variable` / `function` / `parameter`        | all identifiers                | bans common abbreviations (e.g., `str`, `arr`, `obj`) |
| Types           | `class` / `interface` / `typeAlias` / `enum` | type names                     | `PascalCase` (+ extra rules)                          |
| Type Parameters | `typeParameter`                              | generic type parameters        | Single letters (T, U, V) or prefixed (TData, KKey)    |
| Functions       | `function`                                   | function declarations          | final `camelCase` enforcement                         |
| Parameters      | `parameter`                                  | function params                | `camelCase`, `snake_case`, `_` allowed                |
| Members         | `memberLike`                                 | class fields/methods/accessors | varies by modifiers                                   |
| Enums           | `enumMember`                                 | members                        | `UPPER_CASE`                                          |
| Object literals | `objectLiteralProperty`                      | `{ fooBar: 1 }`                | `camelCase`, `snake_case`, `PascalCase`, `UPPER_CASE` |
| Quoted keys     | `requiresQuotes`                             | `"Content-Type"` etc           | ignored (format: null)                                |

Jump to details:

- [Variables](/rules/variables/)
- [Abbreviation Restrictions](/rules/abbreviations)
- [Types](/rules/types/)
- [Functions](/rules/functions/)
- [Parameters](/rules/parameters/)
- [Member-like overview](/rules/member-like/)
- [Object literal properties](/rules/object-literal-property)
- [Quoted members](/rules/quoted-members)

## ✅ Good

```ts
const MAX_RETRIES = 3; // WHY: UPPER_CASE for a configuration constant, matches the matrix
function doWork() {
  // WHY: camelCase function — final enforced pattern
  return;
}
```

## ❌ Bad

```ts
function Do_Work() {
  // WHY: Mixed case/underscore violates function camelCase enforcement
  return;
}
```
