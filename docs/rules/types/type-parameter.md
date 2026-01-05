# Type Parameters (Generics)

- **Selector:** `typeParameter`
- Required: `PascalCase`
- Custom: Must match one of the allowed patterns for generic type parameters

## Why This Rule

Generic type parameters in TypeScript use specific conventions that differ from regular types:

- **Single uppercase letters** (T, U, V, K, etc.): Most common for general-purpose type parameters
- **T/K/V prefix + descriptive name**: Combines clarity with convention (TData, KKey, VValue)
- **Numeric subscripts** (T1, T2, T3): For sequences of related types

These conventions are:

- **Widely recognized**: Established patterns across TypeScript, Java, C#, and other languages
- **Self-documenting**: Instantly recognizable as generic placeholders
- **Concise**: Short names reduce noise in generic-heavy code

## Allowed Patterns

### Single Letters

Common single-letter generics follow alphabetical conventions:

- `T`: Most common for a single generic type
- `U, V`: Additional generic types (alphabetical progression)
- `K, V`: Standard for key-value pairs (e.g., `Map<K, V>`, `Record<K, V>`)
- `R`: Common for return/response types
- `E`: Often used for error types
- `P`: Frequently used for props in React
- Other uppercase letters: `A`, `B`, `C`, `D`, `M`, `N`, `S`, `W`, `X`, `Y`, `Z`

### Descriptive with Prefix

For better clarity, prefix descriptive names with:

- `T` prefix: `TData`, `TItem`, `TElement`, `TError`
- `K` prefix: `KKey` (for keys)
- `V` prefix: `VValue` (for values)

### Numeric Subscripts

Use numeric subscripts for sequences of related types:

- `T1, T2, T3, ...`: Useful for tuples or multiple similar generic parameters
- `K1, K2`: For multiple key types
- `V1, V2`: For multiple value types

**Note:** The number must start with 1-9 (not 0), and can be followed by additional digits.

## References

- [Generic Type Parameters in TypeScript](https://shramko.dev/blog/generic-type-parameters) - Comprehensive guide to generic naming
- [Tidy TypeScript: Name your generics](https://oida.dev/tidy-typescript-name-your-generics/) - Best practices for generic names
- [How to Name your Types - Matt Pocock](https://www.totaltypescript.com/tips/how-to-name-your-types) - Expert advice on type naming
- [TypeScript Generic Naming Conventions](https://stackoverflow.com/questions/66325117/does-typescript-really-follow-the-naming-convention-for-parameterized-types-t) - Community discussion on conventions

## ✅ Good

```ts
// Single letter generics
function identity<T>(arg: T): T {
  return arg;
}

// Multiple generic types
function map<T, U>(value: T, transform: (v: T) => U): U {
  return transform(value);
}

// Key-Value pairs
interface Dictionary<K, V> {
  get(key: K): V | undefined;
}

// Descriptive with T prefix
function mapArray<TItem, TResult>(items: TItem[], transform: (item: TItem) => TResult): TResult[] {
  return items.map(transform);
}

// Numeric subscripts
type Tuple<T1, T2, T3> = [T1, T2, T3];

// Other common letters
interface Response<R> {
  data: R;
}

interface ErrorWrapper<E> {
  error: E;
}
```

## ❌ Bad

```ts
// ❌ Descriptive name without prefix
function bad<Type>(arg: Type): Type {
  // WHY: Use T or TType instead
  return arg;
}

// ❌ Lowercase
function bad<t>(arg: t): t {
  // WHY: Generic type parameters must be uppercase
  return arg;
}

// ❌ No T prefix for descriptive names
function bad<Data>(data: Data): Data {
  // WHY: Use TData to indicate it's a generic
  return data;
}

// ❌ Redundant Type suffix
function bad<TItemType>(item: TItemType): TItemType {
  // WHY: TItem is sufficient; Type suffix is redundant
  return item;
}

// ❌ Snake case
function bad<T_Item>(items: T_Item[]): T_Item[] {
  // WHY: Use camelCase: TItem
  return items;
}
```
