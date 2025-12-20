# Compatibility

## Flat Config vs legacy config

This package supports both:

- Flat Config: import default from `eslint-config-naming`
- Legacy eslintrc: extend `eslint-config-naming/legacy`

## With other configs

This config is focused: it only sets `@typescript-eslint/naming-convention`.

It works alongside:

- Airbnb / airbnb-base
- eslint:recommended
- @typescript-eslint recommended presets
- framework configs (React, Next.js, NestJS)

## Typical strategy

- Load your base config(s)
- Load this naming config
- Use file-based overrides for edge cases (generated code, legacy folders)
