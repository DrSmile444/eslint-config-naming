# Abbreviation Restrictions

Automatically enforces descriptive naming by banning common abbreviations and anti-patterns.

## Overview

This feature prevents usage of common abbreviations that reduce code readability. It's based on a comprehensive deny-list of anti-patterns, while allowing well-established technical terms and framework conventions through an allow-list.

**Selector:** `variable` (all types including const global), `function`, `parameter`  
**Applied:** Lowest precedence (catch-all safety net)

::: tip
Abbreviation restrictions apply to **all variable types**, including:
- Local variables
- Global const variables (module-level constants)
- Function parameters
- Function names
:::

## Why This Rule

Single-letter names and ambiguous abbreviations are among the most common sources of confusion in codebases:

- **Single-letter variables** → Banned except for coordinates (`x`, `y`, `z`)
  - **`i/j/k`** → Use `index`, `rowIndex`, `colIndex` instead
  - **`e`** → Use `error`, `event`, or `element` depending on context
  - **`s`** → Use `string`, `source`, or `status` depending on context
  - **`n`** → Use `count`, `length`, or `number` depending on context
  - **Only exception:** `x`, `y`, `z` are allowed for coordinate systems and geometry
- **Ambiguous abbreviations** → Use full descriptive names
  - **`data/info/obj`** → What kind of data? Use `responseBody`, `metadata`, `userPayload`, `payload`
  - **`res/req`** → Acceptable in Express handlers, but ambiguous elsewhere (result? resource? response?)
  - **`err`** → Use `error` - it's only 2 more characters
  - **`data`** → Too vague - use specific terms like `payload`, `result`, `records`, `responseBody`, `input`, `output`

### Philosophy

This rule embodies the principle: **"Write code for humans first, computers second."**

Clear names:

- Reduce onboarding time for new team members
- Make code self-documenting
- Prevent bugs from misunderstanding
- Eliminate the need for guessing in code reviews

## How It Works

The rule uses two lists:

### DENY_LIST

Contains ~140+ common abbreviations and their recommended replacements:

```typescript
{
  str: ['string', 'text'],
  num: ['number', 'amount', 'count'],
  arr: ['array', 'list', 'items'],
  obj: ['object', 'entity', 'payload'],
  data: ['payload', 'result', 'records', 'responseBody'],
  // ... and many more
}
```

### ALLOW_LIST

Contains widely-recognized technical terms that are acceptable:

```typescript
['id', 'url', 'api', 'ui', 'db', 'json', 'html', 'uuid', 'jwt', 'ip', 'http', ...]
```

## ✅ Good

<<< ../../tests/snippets/abbreviations/positive/abbreviations-positive.ts{ts}

## ❌ Bad

<<< ../../tests/snippets/abbreviations/negative/abbreviations-negative.ts{ts}

## Customization

You can customize the lists for your project:

```typescript
// eslint.config.js
import { ALLOW_LIST, DENY_LIST } from 'eslint-config-naming';

// Add your own allowed abbreviations
const myAllowList = [...ALLOW_LIST, 'req', 'res', 'ctx'];

// Or remove some from deny list for your use case
const myDenyList = { ...DENY_LIST };
delete myDenyList.req;
delete myDenyList.res;

// Then build your own custom regex using these lists
const bannedNames = Object.keys(myDenyList)
  .filter((name) => !myAllowList.includes(name))
  .map((s) => s.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  .join('|');

// Use in your custom naming-convention rule
export default [
  {
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        // ... your other rules
        {
          selector: 'variable',
          format: null,
          custom: { regex: `^(${bannedNames})$`, match: false },
        },
      ],
    },
  },
];
```

## Common Exceptions

### Framework Parameters

In Express.js, Koa, or similar frameworks, `req`, `res`, `ctx`, `next` are idiomatic:

```typescript
// Acceptable in framework context
app.get('/users', (req, res, next) => {
  // This is the established convention
});
```

By default, these are allowed when used as **parameters** due to rule precedence. If your project uses them heavily, consider adding them to your custom allow-list.

### Loop Indices

**Single-letter loop variables like `i`, `j`, `k` are banned.** Use descriptive names instead:

```typescript
// ❌ Bad - single-letter loop variables
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}

// ✅ Better - use array iteration methods
for (const item of items) {
  console.log(item);
}

// ✅ Good - descriptive name when index is needed
items.forEach((item, itemIndex) => {
  console.log(itemIndex, item);
});

// ✅ Good - descriptive names in traditional loops
for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
  for (let colIndex = 0; colIndex < cols.length; colIndex++) {
    // Clear which dimension each index represents
  }
}
```

### Technical Initialisms

Well-known technical terms are allowed:

```typescript
const userId = 123; // ✅ 'id' is in ALLOW_LIST
const apiUrl = 'https://api.example.com'; // ✅ 'api' and 'url' are allowed
const jsonData = JSON.parse(response); // ✅ 'json' is allowed
const jwtToken = auth.getToken(); // ✅ 'jwt' is allowed
```

## 🚫 Deny List

<<< ../../src/naming-abbreviations.ts#DENY_LIST{ts}

## ✅ Allow List

<<< ../../src/naming-abbreviations.ts#ALLOW_LIST{ts}

For the complete DENY_LIST and ALLOW_LIST, see:

- [src/naming-abbreviations.ts](https://github.com/DrSmile444/eslint-config-naming/blob/main/src/naming-abbreviations.ts) in the repository

## References

- [Unicorn Rule - Descriptive Naming](https://github.com/sindresorhus/eslint-plugin-unicorn/issues/169)
- [Naming Things in TypeScript](https://medium.com/devmap/naming-things-in-typescript-ad3942d81171)
