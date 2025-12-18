
# Destructuring strategy

Destructuring often reflects external naming:

* API responses
* third-party SDKs
* database row shapes

Strict naming there can be counterproductive, so destructured variables/params are more flexible.

## Example

```ts
const apiDto = { user_name: "A" };
const { user_name } = apiDto; // allowed (destructured)
```

Prefer mapping into internal models when possible:

```ts
const userName = apiDto.user_name; // then internal code stays consistent
```
