# Public instance members

**Modifiers:** `public`
Allowed: `camelCase`, `snake_case`
Leading underscore: allowed

## Why This Rule

Public instance members are part of your class's external API. The flexibility here handles several scenarios:

- **camelCase**: Standard JavaScript/TypeScript convention (`userName`, `orderTotal`)
- **snake_case**: Matching external data structures or database column names (`user_id`, `created_at`)
- **Leading underscore**: Rare, but allowed for "semi-private" public members (discouraged from external use but not forbidden)

**Why allow snake_case:**

Classes often represent data models mapped from databases or external APIs:

```ts
class User {
  public user_id: string; // Matches database column
  public created_at: Date; // Matches API response
  public first_name: string; // Matches external schema
}
```

Forcing camelCase would require mapping layers everywhere. By allowing both, we let the class naturally mirror its data source while still supporting standard JavaScript conventions.

**References:**

- [TypeScript Handbook - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [Clean Architecture - Entity Layer](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## ✅ Good

```ts
class Example {
  public userName = 'Alice';
  public user_name = 'Alice';
}
```

## ❌ Bad

```ts
class Example {
  public UserName = 'Alice';
}
```
