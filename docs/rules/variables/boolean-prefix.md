# Boolean variables (prefix required)

- **Selector:** `variable` with `types: ["boolean"]`
- Format: `PascalCase`
- Required prefixes: `is`, `are`, `should`, `has`, `can`, `did`, `will`

## Why This Rule

Boolean variables should read like yes/no questions. This makes conditionals read like natural language and eliminates ambiguity.

**Without prefixes:**

```ts
if (loading && permission && retry) {
}
// Is "loading" a boolean or a string status?
// Is "permission" a boolean or an object?
```

**With prefixes:**

```ts
if (isLoading && hasPermission && shouldRetry) {
}
// Crystal clear - all booleans, reads like English
```

**Why these specific prefixes:**

- `is`: State or condition (`isActive`, `isVisible`)
- `are`: Plural state (`areItemsSelected`, `areUsersOnline`)
- `has`: Possession or presence (`hasAccess`, `hasError`)
- `should`: Conditional logic (`shouldRetry`, `shouldValidate`)
- `can`: Capability or permission (`canEdit`, `canDelete`)
- `did`: Past action (`didComplete`, `didTimeout`)
- `will`: Future action (`willExpire`, `willReset`)

This convention is nearly universal in professional codebases and recommended by every major style guide.

**References:**

- [TypeScript ESLint - Naming Convention for Boolean Variables](https://typescript-eslint.io/rules/naming-convention/#enforce-that-boolean-variables-are-prefixed-with-an-allowed-verb)

## ✅ Good

```ts
const isActive: boolean = true; // WHY: 'is' prefix makes intention clear and reads like a boolean
const hasPermission: boolean = false; // WHY: 'has' prefix shows possession/presence
const shouldRetry: boolean = true; // WHY: 'should' prefix indicates conditional behavior
```

## ❌ Bad

```ts
const active: boolean = true; // WHY: missing prefix — unclear if boolean
const enabled: boolean = false; // WHY: ambiguous name without a boolean prefix
```
