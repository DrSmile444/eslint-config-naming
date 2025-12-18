
# Naming booleans

Booleans should read like a question in `if (...)` statements.

Preferred prefixes:

* `is` (state)
* `has` (possession)
* `can` (capability)
* `should` (recommendation)
* `did` (past action outcome)
* `will` (future expectation)

## ✅ Good

```ts
if (isReady && hasToken && canRetry) {}
```

## ❌ Bad

```ts
if (ready && token && retry) {}
```

## Exception: destructuring

When destructuring external data, prefixes are not required:

```ts
const { enabled } = flags; // allowed
```
