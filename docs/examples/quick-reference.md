
# Quick Reference

## Types

✅

```ts
interface User {}
type UserId = string;
class UserService {}
```

❌

```ts
interface IUser {}
type TUserId = string;
class userService {}
```

## Booleans

✅

```ts
const isReady: boolean = true;
```

❌

```ts
const ready: boolean = true;
```

## Enums

✅

```ts
enum OrderStatus {
  PENDING,
}
```

❌

```ts
enum OrderStatuses {
  Pending,
}
```
