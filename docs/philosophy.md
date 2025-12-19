# Philosophy

This page outlines the core principles and key decisions behind the naming conventions enforced by this config.

## Principles

### 1) Readability over cleverness

Names should communicate intent without requiring context.

### 2) Consistency beats personal preference

A stable convention reduces cognitive load and review time.

### 3) Respect real-world interoperability

Destructuring and quoted keys exist; the rules should not fight your APIs.

### 4) BYO parser/options

Different repos require different parser settings; rules should not assume a single setup.

## Key Decisions

### No `I*` / `T*` prefixes for types

Modern TypeScript already encodes type-ness. Names should reflect domain meaning.

**Bad**

```ts
interface IUser {}
type TUserId = string;
```

**Good**

```ts
interface User {}
type UserId = string;
```

### Protected members require `_`

Protected is an inheritance surface. `_` is a visible "this is for subclasses" cue.

### Booleans must read like a question

`isActive`, `hasPermission`, `shouldRetry` read naturally in conditions.

### Enums are singular, members are constants

`enum OrderStatus { PENDING }` reads like a category of values.

