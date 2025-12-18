
# Decisions

## No `I*` / `T*` prefixes for types

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

## Protected members require `_`

Protected is an inheritance surface. `_` is a visible “this is for subclasses” cue.

## Booleans must read like a question

`isActive`, `hasPermission`, `shouldRetry` read naturally in conditions.

## Enums are singular, members are constants

`enum OrderStatus { PENDING }` reads like a category of values.
