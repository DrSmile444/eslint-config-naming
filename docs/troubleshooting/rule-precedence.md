
# Rule precedence

`@typescript-eslint/naming-convention` evaluates entries top-to-bottom.

* Multiple entries may match a name
* The most specific matching entry later in the list can effectively “override” earlier ones

## Practical tip

If a function name is PascalCase but still errors, check the final function rule:

* [CamelCase enforcement](/rules/functions/camel-case-only)

## Debugging

* Temporarily isolate a snippet in a small file
* Run ESLint with a focused config
* Inspect which selector is being applied
