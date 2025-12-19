---
layout: home
title: '@drsmile444/eslint-config-naming'
hero:
  name: 'Naming that scales'
  text: 'Opinionated naming conventions for TypeScript'
  tagline: 'A focused ESLint config that enforces readable, predictable naming across your codebase.'
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: Rule Matrix
      link: /rules/
features:
  - title: Consistent
    details: One shared naming language across teams and repos.
  - title: Practical
    details: Allows real-world constraints (destructuring, quoted keys, components).
  - title: BYO Parser
    details: You decide parserOptions; this package ships rules only.
---

## What this config enforces (at a glance)

- Types are **PascalCase** (no `I*`/`T*` prefixes)
- Enum members are **UPPER_CASE**
- Booleans use **meaningful prefixes** (`is/should/has/can/did/will`)
- Private members are **camelCase** (no leading underscore)
- Protected members require a **leading underscore** (signals inheritance surface)

Next: start with [Getting Started](/getting-started) or jump to the [Rule Matrix](/rules/).
