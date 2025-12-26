# Readonly members

- **Modifiers:** `readonly`
- Allowed: `UPPER_CASE`, `camelCase`, `snake_case`
- Leading underscore: allowed

## Why This Rule

Readonly members are immutable properties that cannot be reassigned after initialization. They can represent constants, configuration values, or environment variables:

- **UPPER_CASE**: For environment variables and true constants (`VITE_API_BASE_URL`, `MAX_RETRIES`)
- **camelCase**: For instance-specific readonly values (`apiKey`, `userId`)
- **snake_case**: For mapping to external data structures (`user_id`, `created_at`)

**When to use each:**

```ts
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string; // WHY: UPPER_CASE for environment variables
  readonly VITE_DEBUG_MODE: boolean; // WHY: UPPER_CASE for env vars
}

class ApiClient {
  public readonly apiKey: string; // WHY: camelCase for instance-specific readonly
  public readonly user_id: string; // WHY: snake_case to mirror external data
}
```

**Leading underscore:** Allowed for flexibility, though not commonly used for readonly members.

**Why allow multiple formats:**

Readonly members serve different purposes. Environment variables are conventionally UPPER_CASE, while other readonly properties may follow different conventions based on their source or usage.

**References:**

- [TypeScript Handbook - Readonly Properties](https://www.typescriptlang.org/docs/handbook/2/classes.html#readonly)

## ✅ Good

```ts
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string; // WHY: UPPER_CASE for env vars
  readonly VITE_DEBUG: boolean; // WHY: UPPER_CASE
}

class Example {
  public readonly apiKey = 'key'; // WHY: camelCase for instance value
  public readonly user_id = '123'; // WHY: snake_case for external mapping
}
```

## ❌ Bad

```ts
interface ImportMetaEnv {
  readonly ViteApiBaseUrl: string; // WHY: PascalCase not allowed
}

class Example {
  public readonly ApiKey = 'key'; // WHY: PascalCase not allowed
}
```
