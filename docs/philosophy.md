# Philosophy

Naming is one of the hardest problems in software development. This page explains the core principles and specific decisions that shape this ESLint config's approach to naming conventions.

## Core Principles

These foundational principles guide every rule in this configuration.

### Readability over cleverness

**Names should communicate intent without requiring additional context.**

Code is read far more often than it's written. A variable named `userAuthenticationStatus` is immediately clear, while `uas` or `flag` forces readers to hunt for context. We optimize for the reader, not the writer.

When you encounter a name in a code review or debugging session, you should understand its purpose within seconds. Abbreviations, insider jargon, and overly terse names all work against this goal.

**Guideline**: If a new team member can't understand what a name represents without reading surrounding code, the name needs improvement.

### Consistency beats personal preference

**A stable convention reduces cognitive load and review time.**

Without shared conventions, every developer makes different choices: `userId` vs `user_id` vs `UserID`. Code reviews devolve into style debates. New contributors struggle to match the "feel" of the codebase.

Consistency creates a shared language. When everyone follows the same patterns, you can:

- **Scan code faster**: Your brain learns to recognize patterns
- **Write code faster**: Fewer decisions to make
- **Review code faster**: Focus on logic, not style
- **Onboard faster**: New team members learn one convention, not many

**Guideline**: Personal preference is valuable in your own projects, but team projects benefit more from predictability than individual expression.

### Respect real-world interoperability

**Rules should accommodate real-world constraints, not fight them.**

TypeScript doesn't exist in a vacuum. You'll work with:

- **External APIs** that use snake_case or kebab-case
- **JSON schemas** with quoted keys and special characters
- **HTTP headers** like `Content-Type`
- **Environment variables** like `NODE_ENV`

Forcing every variable into camelCase creates friction. Destructuring a response as `const { user_id } = apiResponse` is more honest than renaming it immediately. Quoted object keys need format flexibility.

This config provides escape hatches for these scenarios while maintaining consistency for the code you control.

**Guideline**: Good naming rules should make your work easier, not harder. If a rule consistently fights legitimate use cases, it's the wrong rule.

### Bring Your Own Parser

**Different repos require different parser settings; rules should not assume a single setup.**

ESLint configurations often bundle parser settings, plugins, and file globs. This creates problems:

- **Version conflicts**: Your project needs `@typescript-eslint/parser@6.x`, but the config locks you to `5.x`
- **Monorepo headaches**: Different packages need different `tsconfig.json` settings
- **Configuration inflexibility**: You can't override `parserOptions` without ejecting

This package ships **only rules**. You wire up your own parser, plugins, and project settings. This means:

- No dependency version conflicts
- Full control over TypeScript compiler options
- Easy integration into existing setups
- Works with any ESLint flat config structure

**Guideline**: Tools should be composable. Each package should do one thing well and integrate cleanly with others.

---

## Key Decisions

These specific conventions implement our principles. Each decision is backed by years of community consensus and practical experience.

### No `I*` or `T*` prefixes for types

**Modern TypeScript already encodes type-ness. Names should reflect domain meaning.**

In older languages like C++ and Java, prefixes helped distinguish types from values (`IUser` vs `User`). TypeScript's structural typing makes this redundant. Your editor shows you the type on hover. The compiler enforces correctness.

Prefixes add noise without adding information. They make refactoring harder (changing from interface to type requires renaming). They violate the "readability over cleverness" principle.

**Why this matters**: When reading `getUserById(): User`, the return type is immediately clear. `getUserById(): IUser` forces you to mentally strip the prefix every time.

**Bad**

```ts
interface IUser {
  name: string;
}

type TUserId = string;
type TCallback<T> = (value: T) => void;
```

**Good**

```ts
interface User {
  name: string;
}

type UserId = string;
type Callback<T> = (value: T) => void;
```

**Exception**: If you're working in a legacy codebase that already uses these prefixes, you can disable this rule for incremental migration.

### Protected members require leading underscore

**Protected methods and properties signal inheritance surface area. The underscore makes this visible.**

Unlike `private` (which is truly encapsulated), `protected` members are part of the class's contract with subclasses. They're semi-public API.

The leading underscore serves as a visual cue: "This is for inheritance. Think twice before using it elsewhere."

**Why this matters**: In a class hierarchy, it's helpful to quickly distinguish what's public API, what's internal (`private`), and what's for subclasses (`protected`).

**Example**

```ts
class BaseService {
  // Public API - anyone can call this
  public async fetchData() {
    const data = await this._loadFromCache();
    return this._transform(data);
  }

  // For subclasses to override - inheritance surface
  protected _loadFromCache() {
    return this.cache.get();
  }

  protected _transform(data: unknown) {
    return data;
  }

  // Private implementation - truly internal
  private cache = new Map();
}
```

### Private members use camelCase (no underscore)

**The `private` keyword is explicit enough. No prefix needed.**

TypeScript's `private` keyword makes the access level clear. Adding a leading underscore is redundant and creates noise:

```ts
// Redundant - the keyword says "private"
private _userName: string;

// Clear and concise
private userName: string;
```

The compiler enforces privacy. Your editor shows it. The underscore adds no value.

### Booleans must read like a question

**Boolean variables should use prefixes that make conditionals read naturally.**

Required prefixes: `is`, `has`, `should`, `can`, `did`, `will`

When you write `if (isActive)`, it reads like English. When you write `if (active)`, it's ambiguous—is this a boolean or a string status?

Good boolean names answer yes/no questions:
- `isLoading` → "Is it loading?" → Yes/No
- `hasPermission` → "Has permission?" → Yes/No
- `shouldRetry` → "Should retry?" → Yes/No
- `canEdit` → "Can edit?" → Yes/No

**Why this matters**: Code is more readable when conditionals read like natural language. You should never wonder if a variable is a boolean.

**Bad**

```ts
const loading = true;
const permission = false;
const retry = true;

if (loading && permission && retry) { ... }
```

**Good**

```ts
const isLoading = true;
const hasPermission = false;
const shouldRetry = true;

if (isLoading && hasPermission && shouldRetry) { ... }
```

### Enums are singular, members are UPPER_CASE

**Enums represent a category. Members are constant values.**

Enum names should be singular because they represent a type/category:

```ts
enum Status { ... }        // "Status" is a category
enum OrderType { ... }     // "OrderType" is a category
```

Members should be `UPPER_CASE` because they're compile-time constants:

```ts
enum Status {
  PENDING,
  APPROVED,
  REJECTED,
}
```

This convention makes enums read naturally in code:

```ts
if (order.status === Status.PENDING) {
  // Reads like: "if the order's status is PENDING"
}
```

**Why this matters**: The singular name + constant members create readable, self-documenting code. Compare:

```ts
// Unclear
if (order.status === Statuses.pending) { ... }

// Clear
if (order.status === Status.PENDING) { ... }
```

---

## Philosophy in Practice

These principles and decisions work together to create a coherent naming system:

1. **Types (PascalCase)** convey domain concepts clearly
2. **Booleans (prefixed camelCase)** read naturally in conditions  
3. **Enums (singular name, UPPER_CASE members)** organize related constants
4. **Access modifiers (underscore for protected only)** signal inheritance contracts
5. **Escape hatches (destructuring, quoted keys)** respect real-world constraints

The result is code that's easier to read, review, and maintain—whether you're working solo or on a team of 100.

For detailed rule specifications, see the [Rule Matrix](/rules/). To understand how to handle edge cases, check out the [Guides](/guides/) section.

