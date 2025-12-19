# FAQ

## Why doesn’t this package ship the parser?

Because `parserOptions` differ across repos (monorepos, TS references, paths). This package ships **rules only**.

See: [Bring Your Own Parser](/usage/parser-setup)

## Can I add `was*` or `are*` boolean prefixes?

Yes—do it in your own config by overriding the `@typescript-eslint/naming-convention` boolean entry.

## How do I allow snake_case in a specific folder?

Use a `files` override:

```js
export default [
  ...naming,
  {
    files: ['**/external-dtos/**'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
];
```
