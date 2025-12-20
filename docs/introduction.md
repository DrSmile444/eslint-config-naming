# Introduction

**eslint-config-naming** is a focused ESLint configuration that enforces consistent, readable naming conventions for TypeScript projects. It's built on the principle that naming is one of the hardest—and most important—aspects of software development.

## Why naming matters

Poor naming is a silent tax on every code review, every onboarding, and every refactor. When teams lack a shared naming language, developers waste time:

- **Guessing conventions**: "Should this be `IUser` or `User`?"
- **Resolving inconsistencies**: One file uses `userData`, another uses `user_data`
- **Re-reading code**: Is `flag` a boolean? What does `temp` actually hold?

Good naming conventions eliminate these questions. They make code self-documenting and reduce the cognitive load for everyone who touches the codebase.

## What this config provides

This package is a **ready-to-use ESLint configuration** that:

- Enforces **PascalCase** for types, interfaces, and classes
- Requires **UPPER_CASE** for enum members
- Mandates **meaningful prefixes** for booleans (`is`, `has`, `should`, `can`, etc.)
- Distinguishes **public**, **private**, and **protected** members
- Handles **real-world constraints** like destructuring, quoted keys, and React components
- Provides **clear error messages** when violations occur

## What makes it different

### 1. **Rules only, no parser lock-in**

Unlike many ESLint configs, this package ships **only rules**. You bring your own parser, plugins, and `parserOptions`. This means:

- No version conflicts with your existing setup
- Full control over your TypeScript compiler settings
- Easy integration into monorepos or existing projects

### 2. **Practical, not dogmatic**

The rules respect real-world constraints:

- **Destructured variables** can use their original names (no fighting external APIs)
- **Quoted object keys** can use any format (necessary for JSON schemas, HTTP headers, etc.)
- **React components** are recognized and allowed in PascalCase
- **Enum members** read naturally in sentences (e.g., `Status.PENDING`)

### 3. **Battle-tested conventions**

The rules are based on years of community consensus and production experience:

- **No `I*` or `T*` prefixes** for types (TypeScript makes them redundant)
- **No leading underscores** for private members (use `private` keyword instead)
- **Leading underscore for `protected`** (signals inheritance surface area)
- **Meaningful boolean prefixes** (makes conditionals readable)

## Who is this for?

This config is ideal for:

- **Teams** that want to standardize naming across repos
- **Solo developers** tired of making the same naming decisions
- **Open-source maintainers** who want contributors to follow conventions
- **Anyone migrating** from other style guides (like Airbnb) and seeking modern TypeScript best practices

## What's next?

Ready to get started? Head to [Getting Started](/getting-started) to install and configure.

Want to understand the philosophy? Read [Philosophy](/philosophy) to learn the principles and key decisions.

Curious about the rules? Explore the [Rule Matrix](/rules/) to see every selector and format.
