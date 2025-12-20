---
layout: home
hero:
  image:
    src: /logo.svg
    alt: 'eslint-config-naming logo'
  name: 'Naming that scales'
  text: 'Opinionated naming conventions for TypeScript'
  tagline: 'A focused ESLint config that enforces readable, predictable naming across your codebase.'
  actions:
    - theme: brand
      text: Introduction
      link: /introduction/
    - theme: alt
      text: Rule Matrix
      link: /rules/
features:
  - title: Consistent
    details: One shared naming language across teams and repos.
    icon: 👥
  - title: Practical
    details: Allows real-world constraints (destructuring, quoted keys, components).
    icon: 🔧
  - title: BYO Parser
    details: You decide parserOptions; this package ships rules only.
    icon: 📦
---

## What this config enforces (at a glance)

- Types are **PascalCase** (no `I*`/`T*` prefixes)
- Enum members are **UPPER_CASE**
- Booleans use **meaningful prefixes** (`is/should/has/can/did/will`)
- Private members are **camelCase** (no leading underscore)
- Protected members require a **leading underscore** (signals inheritance surface)

Next: start with [Getting Started](/getting-started) or jump to the [Rule Matrix](/rules/).
