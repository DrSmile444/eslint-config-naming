# Boolean variables (destructured)

**Selector:** `variable` with `types: ["boolean"]` + modifier `destructured`
Format: `null` (no constraint)

## Why This Rule

Destructured booleans get a pass on the prefix requirement because they often come from external sources:

**Common scenarios:**

```ts
// API response
const { enabled, visible } = featureFlags;

// Library options
const { strict, verbose } = config;

// Props in React
const { disabled, loading } = props;
```

Forcing prefixes would require immediate renaming:

```ts
// Forced - verbose and noisy
const { enabled: isEnabled, visible: isVisible } = featureFlags;

// Natural - clean
const { enabled, visible } = featureFlags;
```

This exception follows the same principle as other destructuring rules: **respect external contracts**. You don't control how external APIs or libraries name their properties.

**When to rename anyway:**
If the destructured value will be used extensively in your code, consider renaming for clarity:

```ts
const { enabled: isFeatureEnabled } = config; // Worth it for long-term readability
```

**References:**

- [MDN - Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- Aligns with the "respect real-world interoperability" principle from the project philosophy

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
