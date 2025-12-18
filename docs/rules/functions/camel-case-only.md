
# CamelCase enforcement (final)

**Selector:** `function`
Final rule: `camelCase` only

This is a “last word” rule: it keeps function names predictable.

## ✅ Good

```ts
function doWork() {
  return 1;
}
```

## ❌ Bad

```ts
function DoWork() {
  return 1;
}

function do_work() {
  return 1;
}
```
