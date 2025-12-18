
# API & services (sample)

## Public surface

Use consistent names for exported services and DTO types.

```ts
export class UserService {
  public getUserById(userId: string) {
    return { userId };
  }
}

export type UserId = string;
```

## Interop with external shapes

```ts
const apiDto = { user_name: "Alice" };
const { user_name } = apiDto; // allowed (destructuring)
const userName = user_name; // map to internal naming
```
