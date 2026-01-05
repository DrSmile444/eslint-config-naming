# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.7.0] - 2026-01-05

### Added

- **Type Parameter (Generics) Naming**: Added comprehensive naming conventions for generic type parameters:
  - Single uppercase letters: `T`, `U`, `V`, `K`, `R`, `E`, `P`, `S`, `N`, `A`, `B`, `C`, `D`, `M`, `W`, `X`, `Y`, `Z`
  - Prefixed descriptive names: `TData`, `TItem`, `TElement`, `TError` (T prefix), `KKey` (K prefix), `VValue` (V prefix)
  - Numeric subscripts: `T1`, `T2`, `T3`, `K1`, `K2`, `V1` for sequences of related types
  - Enforces industry-standard conventions from TypeScript, Java, and C# communities
  - Disallows lowercase (`t`, `tItem`), descriptive names without prefix (`Type`, `Data`), redundant suffixes (`TItemType`), and snake_case (`T_Item`)

### Changed

- **Type-like Selector**: Changed `typeLike` selector to `typeAlias` for more precise targeting and to avoid conflicts with the new `typeParameter` rule

### Documentation

- Added comprehensive [Type Parameters (Generics)](/rules/types/type-parameter) documentation with rationale, examples, and references
- Updated rule matrix and types overview to include type parameters
- Updated VitePress sidebar navigation with "Type Parameters (Generics)" entry
- Updated README rule overview section with type parameter conventions
- Clarified "Type-like" label to "Type Aliases" throughout documentation

---

## [1.6.0] - 2025-12-26

### Added

- **Abbreviation Restrictions**: Added comprehensive banning of common abbreviations and anti-patterns in variables, functions, and parameters:
  - Bans single-letter names (e.g., `i`, `j`, `k`, `e`) in favor of descriptive names like `index`, `itemIndex`, `error`
  - Bans vague abbreviations (e.g., `str`, `num`, `arr`, `obj`, `data`, `info`) in favor of full words
  - Bans ambiguous abbreviations (e.g., `res`, `req`, `dir`, `cfg`) that can have multiple meanings
  - Includes comprehensive DENY_LIST with ~140+ abbreviations and their recommended replacements
  - Includes ALLOW_LIST for well-known technical terms (`id`, `url`, `api`, `json`, `html`, `uuid`, etc.)
  - Exports `DENY_LIST` and `ALLOW_LIST` for user customization
  - Applied with lowest precedence to act as a safety net without interfering with specific rules

### Documentation

- Added comprehensive [Abbreviation Restrictions](/rules/abbreviations) documentation with examples and customization guide
- Updated rule matrix and sidebar navigation
- Added README section explaining the new feature

---

## [1.5.0] - 2025-12-25

### Added

- **Readonly Members**: Added support for `UPPER_CASE`, 'camelCase', and `snake_case` format in readonly members to accommodate environment variables and constants (e.g., `VITE_API_BASE_URL` in `ImportMetaEnv` interfaces).

### Fixed

- **Enum Names**: Fixed issue where enums with string values (e.g., `enum RoomFacilityAccess`) were incorrectly flagged as errors. Enums with names ending in `ss` or similar patterns (like `Access`) are now correctly recognized as singular, non-plural names.

---

## [1.4.2] - 2025-12-24

### Fixed

- **ESLint 8 Compatibility**: Fixed "Unexpected top-level property 'default'" error when using the legacy config (`naming/legacy`) with ESLint 8. The CommonJS export now properly unwraps the configuration object, making it compatible with `.eslintrc.*` files.

---

## [1.4.0] - 2025-12-22

### Added

- **Object Literal Properties**: Added support for `UPPER_CASE` format in object literal properties to accommodate common patterns like constant objects (e.g., `HTTP_STATUS.OK`, `ERROR_CODES.NOT_FOUND`).

### Changed

- Object literal properties now allow `camelCase`, `snake_case`, `PascalCase`, and `UPPER_CASE` formats (previously only the first three).

---

## [1.3.5] and earlier

See [GitHub Releases](https://github.com/DrSmile444/eslint-config-naming/releases) for earlier versions.
