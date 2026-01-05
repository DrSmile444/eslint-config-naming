# Type Parameters (Generics)

- **Selector:** `typeParameter`
- Required: `PascalCase`
- Custom: Must match one of the allowed patterns for generic type parameters

## Why This Rule

Generic type parameters in TypeScript use specific conventions that differ from regular types:

- **Single uppercase letters** (T, U, V, K): Most common for general-purpose type parameters
- **T/K/V prefix + descriptive name**: Combines clarity with convention (TData, KKey, VValue)
- **Numeric subscripts** (T0, T1, T2, T3): For sequences of related types

These conventions are:

- **Widely recognized**: Established patterns across TypeScript, Java, C#, and other languages
- **Self-documenting**: Instantly recognizable as generic placeholders
- **Concise**: Short names reduce noise in generic-heavy code

## Allowed Patterns

### Single Letters

The four standard single-letter generics follow clear conventions:

- `T`: Most common for a single generic type (Type)
- `U`: Second generic type (alphabetical progression after T)
- `V`: Third generic type (alphabetical progression after U)
- `K`: Standard for keys in key-value pairs (e.g., `Map<K, V>`, `Record<K, V>`)

### Descriptive with Prefix

For better clarity, prefix descriptive names with:

- `T` prefix: `TData`, `TItem`, `TElement`, `TError`
- `K` prefix: `KKey` (for keys)
- `V` prefix: `VValue` (for values)

### Numeric Subscripts

Use numeric subscripts for sequences of related types:

- `T0, T1 T2, T3, ...`: Useful for tuples or multiple similar generic parameters
- `K1, K2`: For multiple key types
- `V1, V2`: For multiple value types

**Note:** The number must start with 1-9 (not 0), and can be followed by additional digits.

## References

- [Generic Type Parameters in TypeScript](https://shramko.dev/blog/generic-type-parameters) - Comprehensive guide to generic naming
- [Tidy TypeScript: Name your generics](https://oida.dev/tidy-typescript-name-your-generics/) - Best practices for generic names
- [How to Name your Types - Matt Pocock](https://www.totaltypescript.com/tips/how-to-name-your-types) - Expert advice on type naming
- [TypeScript Generic Naming Conventions](https://stackoverflow.com/questions/66325117/does-typescript-really-follow-the-naming-convention-for-parameterized-types-t) - Community discussion on conventions

## ✅ Good

<<< ../../../tests/snippets/type-parameters/positive/type-parameter-positive.ts

## ❌ Bad

<<< ../../../tests/snippets/type-parameters/negative/type-parameter-negative.ts
