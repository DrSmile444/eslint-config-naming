# Variables

Variable naming changes based on context:

- Default variables: `camelCase` / `UPPER_CASE`
- Global consts: may be `PascalCase`
- Destructured variables: flexible for interop
- Booleans: prefixes required (unless destructured)
- `*Component` filter allows PascalCase component variables
- Node.js common variables (`__filename`, `__dirname`) are exempted

Pages:

- [Default](/rules/variables/default)
- [Const / Global](/rules/variables/const-global)
- [Destructured](/rules/variables/destructured)
- [Boolean Prefix](/rules/variables/boolean-prefix)
- [Boolean Destructured](/rules/variables/boolean-destructured)
- [Node.js Common Variables](/rules/variables/node-common)
- [\*Component](/rules/variables/component)

## ✅ Good

```ts
const MAX_RETRIES = 3; // WHY: UPPER_CASE for configuration constant
let userName = 'Alice'; // WHY: camelCase runtime variable
```

## ❌ Bad

```ts
const max_retries = 3; // WHY: snake_case discouraged for global/const variables
```
