# Public instance members

- **Modifiers:** `public`
- Allowed: `camelCase`, `snake_case`
- Leading underscore: allowed

## Why This Rule

Public instance members are part of your class's external API. The flexibility here handles several scenarios:

- **camelCase**: Standard JavaScript/TypeScript convention (`userName`, `orderTotal`)
- **snake_case**: Matching external data structures or database column names (`user_id`, `created_at`)
- **Leading underscore**: Rare, but allowed for "semi-private" public members (discouraged from external use but not forbidden)

**Why allow snake_case:**

Classes often represent data models mapped from databases or external APIs:

```ts
class User {
  public user_id: string; // WHY: snake_case to mirror database/API column naming
  public created_at: Date; // WHY: preserved to avoid mapping layers when receiving external data
  public first_name: string; // WHY: matches external schema
}
```

Forcing camelCase would require mapping layers everywhere. By allowing both, we let the class naturally mirror its data source while still supporting standard JavaScript conventions.

**References:**

- [TypeScript Handbook - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#public)

## ✅ Good

```ts
class Example {
  public userName = 'Alice'; // WHY: camelCase — common and idiomatic
  public user_name = 'Alice'; // WHY: snake_case — acceptable for mapping to external sources or databases
}

// Using a consistent convention per model keeps code readable
```

## ❌ Bad

```ts
class Example {
  public UserName = 'Alice'; // WHY: PascalCase for instance member is inconsistent with conventions
  public userNameAnd_id = 'x'; // WHY: Mixed naming in a single property is confusing
}
```
