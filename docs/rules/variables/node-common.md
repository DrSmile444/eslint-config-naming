# Node.js Common Variables

- Filter: `^__(filename|dirname)$`
- Allowed: Any format (format checking disabled)

## Why This Rule

Node.js provides special global variables `__filename` and `__dirname` that don't follow standard JavaScript naming conventions. These are built-in variables with double underscore prefixes that indicate the current file's absolute path and directory path respectively.

**Node.js conventions:**

```ts
// These are built-in Node.js variables
console.log(__filename); // WHY: Node.js runtime global — allowed despite underscores
console.log(__dirname);  // WHY: Node.js runtime global — allowed despite underscores
```

Without this exception, ESLint would flag these standard Node.js variables as violations since they use double leading underscores and don't match typical camelCase or UPPER_CASE patterns.

This rule specifically allows these two well-known Node.js variables while maintaining strict naming conventions for all other variables in your codebase.

**Common use cases:**

- Resolving relative file paths: `path.join(__dirname, '../config')`
- Loading local assets: `fs.readFileSync(path.join(__dirname, 'data.json'))`
- Module resolution: `require.resolve(__dirname + '/module')`
- Debugging and logging: `console.log('Error in', __filename)`

**References:**

- [Node.js Docs - __dirname](https://nodejs.org/api/modules.html#__dirname)
- [Node.js Docs - __filename](https://nodejs.org/api/modules.html#__filename)
- [Node.js Modules Documentation](https://nodejs.org/docs/latest/api/modules.html)

## ✅ Good

```ts
const configPath = path.join(__dirname, 'config.json'); // WHY: using __dirname to build paths is common in Node.js
const currentFile = __filename; // WHY: accessing the current filename is valid and allowed by this rule
```

## ✅ Not affected

These variables are specifically exempted, so there are no "bad" examples - they're always allowed:

```ts
// These are always valid
__dirname // WHY: exempted by rule
__filename // WHY: exempted by rule
```
