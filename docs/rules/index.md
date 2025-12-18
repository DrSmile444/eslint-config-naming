
# Rule Matrix

This page maps each enforced selector to the naming format.

| Area            | Selector                                    | What it targets                | Enforced                                |
| --------------- | ------------------------------------------- | ------------------------------ | --------------------------------------- |
| Object literals | `objectLiteralProperty`                     | `{ fooBar: 1 }`                | `camelCase`, `snake_case`, `PascalCase` |
| Members         | `memberLike`                                | class fields/methods/accessors | varies by modifiers                     |
| Parameters      | `parameter`                                 | function params                | `camelCase`, `snake_case`, `_` allowed  |
| Types           | `class` / `interface` / `typeLike` / `enum` | type names                     | `PascalCase` (+ extra rules)            |
| Enums           | `enumMember`                                | members                        | `UPPER_CASE`                            |
| Variables       | `variable`                                  | locals/consts/etc              | varies by modifiers/types               |
| Functions       | `function`                                  | function declarations          | final `camelCase` enforcement           |
| Quoted keys     | `requiresQuotes`                            | `"Content-Type"` etc           | ignored (format: null)                  |

Jump to details:

* [Object literal properties](/rules/object-literal-property)
* [Member-like overview](/rules/member-like/)
* [Parameters](/rules/parameters/)
* [Types](/rules/types/)
* [Variables](/rules/variables/)
* [Functions](/rules/functions/)
* [Quoted members](/rules/quoted-members)
