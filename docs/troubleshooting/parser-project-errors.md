# Parser / project errors

If you use `parserOptions.project`, ESLint needs the correct TS config location.

Common fixes:

- Ensure `tsconfig.json` exists
- Set `tsconfigRootDir`
- For monorepos: point `project` to each package tsconfig

Example:

```js
parserOptions: {
  project: ["./packages/*/tsconfig.json"],
  tsconfigRootDir: import.meta.dirname,
}
```
