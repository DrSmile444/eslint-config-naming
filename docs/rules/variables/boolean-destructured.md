
# Boolean variables (destructured)

**Selector:** `variable` with `types: ["boolean"]` + modifier `destructured`
Format: `null` (no constraint)

## ✅ Good

```ts
const flags = { enabled: true, visible: false };
const { enabled, visible } = flags; // no prefix requirement here
```

## ❌ Bad (not destructured)

```ts
const flags = { enabled: true };
const enabled: boolean = flags.enabled; // still requires prefix
```
