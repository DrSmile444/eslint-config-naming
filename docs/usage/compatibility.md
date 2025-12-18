
# Compatibility

## With other configs

This config is focused: it only sets `@typescript-eslint/naming-convention`.

It works alongside:

* Airbnb / airbnb-base
* eslint:recommended
* @typescript-eslint recommended presets
* framework configs (React, Next.js, NestJS)

## Typical strategy

* Load your base config(s)
* Load this naming config
* Use file-based overrides for edge cases (generated code, legacy folders)

See: [Migrating from Airbnb](/guides/migrating-from-airbnb)
