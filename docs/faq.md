# FAQ

## Why doesn’t this package ship the parser?

Because `parserOptions` differ across repos (monorepos, TS references, paths). This package ships **rules only**.

See: [Bring Your Own Parser](/usage/parser-setup)

## Can I add `was*` or other boolean prefixes?

Yes, you can do it in your own config by overriding the `@typescript-eslint/naming-convention` boolean entry.

But we suggest you **avoid** it in general to keep naming consistent.
Included simple prefixes like `is` / `has` are widely recognized and understood, while adding more prefixes can lead to confusion.

## How do I allow snake_case in a specific folder?

Use a `files` override:

```js
export default [
  ...namingConfig,
  {
    files: ['**/external-dtos/**'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
];
```
