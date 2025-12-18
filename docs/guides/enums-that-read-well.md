
# Enums that read well

## Use singular enum names

Enum names represent “a category of values”, so singular reads best.

✅ `OrderStatus`
❌ `OrderStatuses`

## Use constant-style members

✅ `PENDING`
❌ `Pending`

```ts
enum OrderStatus {
  PENDING,
  SHIPPED,
}
```
