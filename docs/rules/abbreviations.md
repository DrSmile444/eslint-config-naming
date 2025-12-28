# Abbreviation Restrictions

Automatically enforces descriptive naming by banning common abbreviations and anti-patterns.

## Overview

This feature prevents usage of common abbreviations that reduce code readability. It's based on a comprehensive deny-list of anti-patterns, while allowing well-established technical terms and framework conventions through an allow-list.

**Selector:** `variable`, `function`, `parameter`  
**Applied:** Lowest precedence (catch-all safety net)

## Why This Rule

Single-letter names and ambiguous abbreviations are among the most common sources of confusion in codebases:

- **`i/j/k`** → What are you iterating over? Use `index`, `rowIndex`, `colIndex`
- **`data/info/obj`** → What kind of data? Use `responseBody`, `metadata`, `userPayload`
- **`res/req`** → Acceptable in Express handlers, but ambiguous elsewhere (result? resource? response?)
- **`err`** → Use `error` - it's only 2 more characters

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

```ts
// Variables - descriptive names
const userData = { id: 1, name: 'Alice' };
const responseBody = { status: 'ok' };
const errorMessage = 'Failed to connect';
const callback = () => {};
const element = document.querySelector('.button');
const directory = '/home/user';
const configuration = { debug: true };
const timestamp = Date.now();
const itemIndex = 0;

// Functions - clear intent
function processUserData() {}
function handleErrorMessage() {}
function formatTimestamp() {}
function validateDirectory() {}

// Parameters - no guessing needed
function handleRequest(requestData: Request, onComplete: () => void) {
  // ...
}

function processResponse(responseData: Response, metadata: Metadata) {
  // ...
}
```

## ❌ Bad

```ts
// Variables - banned abbreviations
const str = 'text'; // ❌ Use: string or text
const num = 42; // ❌ Use: number or count
const arr = [1, 2, 3]; // ❌ Use: array or items
const obj = {}; // ❌ Use: object or specific domain name (user, config, etc.)
const data = {}; // ❌ Use: payload, result, records, etc.
const info = {}; // ❌ Use: metadata, details, summary
const tmp = 'temp'; // ❌ Use: temporary or tempValue
const cfg = {}; // ❌ Use: config or configuration
const msg = 'Hello'; // ❌ Use: message
const err = new Error(); // ❌ Use: error
const idx = 0; // ❌ Use: index
const btn = null; // ❌ Use: button
const el = null; // ❌ Use: element

// Functions - unclear abbreviations
function processStr() {} // ❌ Use: processString
function handleErr() {} // ❌ Use: handleError
function formatMsg() {} // ❌ Use: formatMessage

// Parameters - ambiguous
function process(req: Request, res: Response) {
  // ❌ Outside Express/framework context, use: request, response
  // ❌ req/res are ambiguous: result? resource?
}
```

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

For simple array iteration, consider using:

```typescript
// Instead of: for (let i = 0; i < items.length; i++)
for (const item of items) {
  // Clearer intent
}

// Or with index when needed
items.forEach((item, itemIndex) => {
  console.log(itemIndex, item);
});

// Traditional loop with descriptive names
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
