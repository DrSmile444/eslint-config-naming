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
- [\*Component](/rules/variables/component)
- [Node.js Common Variables](/rules/variables/node-common)
