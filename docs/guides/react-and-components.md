
# React & components

React codebases often store components in variables:

```ts
const EditActionComponent = () => null;
```

This config supports that by allowing `PascalCase` for `*Component` variables.

## When to use it

* UI components stored as variables
* factories returning component functions

## When not to

Avoid PascalCase for normal variables that are not components.
