# Boolean variables (prefix required)

**Selector:** `variable` with `types: ["boolean"]`
Format: `PascalCase`
Required prefixes: `is`, `should`, `has`, `can`, `did`, `will`

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
- `has`: Possession or presence (`hasAccess`, `hasError`)
- `should`: Conditional logic (`shouldRetry`, `shouldValidate`)
- `can`: Capability or permission (`canEdit`, `canDelete`)
- `did`: Past action (`didComplete`, `didTimeout`)
- `will`: Future action (`willExpire`, `willReset`)

This convention is nearly universal in professional codebases and recommended by every major style guide.

**References:**

- [Clean Code by Robert C. Martin - Chapter 2: Meaningful Names](https://www.goodreads.com/book/show/3735293-clean-code)
- [Airbnb JavaScript Style Guide - Boolean Prefixes](https://github.com/airbnb/javascript#naming--boolean-prefix)
- [Google Java Style Guide - Boolean Names](https://google.github.io/styleguide/javaguide.html#s5.2.3-method-names)

## ✅ Good

```ts
const isActive: boolean = true;
const hasPermission: boolean = false;
const shouldRetry: boolean = true;
```

## ❌ Bad

```ts
const active: boolean = true;
const enabled: boolean = false;
```
