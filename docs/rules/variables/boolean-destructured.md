# Boolean variables (destructured)

- **Selector:** `variable` with `types: ["boolean"]` + modifier `destructured`
- Format: `null` (no constraint)

## Why This Rule

Destructured booleans get a pass on the prefix requirement because they often come from external sources:

**Common scenarios:**

```ts
// API response
const { enabled, visible } = featureFlags; // WHY: destructured names mirror external flags, acceptable without prefixes

// Library options
const { strict, verbose } = config; // WHY: preserves library-provided option names

// Props in React
const { disabled, loading } = props; // WHY: component props commonly use plain booleans
```

Forcing prefixes would require immediate renaming:

```ts
// Forced - verbose and noisy
const { enabled: isEnabled, visible: isVisible } = featureFlags; // WHY: verbose renaming is sometimes unnecessary

// Natural - clean
const { enabled, visible } = featureFlags; // WHY: simple and clear when preserving external API
```

This exception follows the same principle as other destructuring rules: **respect external contracts**. You don't control how external APIs or libraries name their properties.

**When to rename anyway:**
If the destructured value will be used extensively in your code, consider renaming for clarity:

```ts
const { enabled: isFeatureEnabled } = config; // WHY: rename when the variable becomes a long-term local identifier
```

**References:**

- [MDN - Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- Aligns with the "respect real-world interoperability" principle from the project philosophy

## ✅ Good

```ts
const flags = { enabled: true, visible: false };
const { enabled, visible } = flags; // WHY: destructured booleans are allowed without prefixes
```

## ❌ Bad (not destructured)

```ts
const flags = { enabled: true };
const enabled: boolean = flags.enabled; // WHY: not destructured here — should use a boolean prefix when used as a standalone variable
```
