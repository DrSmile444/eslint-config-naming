# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.8.0] - 2026-01-17

### Added

- **Single-Letter Variable Restrictions**: Enhanced abbreviation restrictions to ban all single-letter variables except `x`, `y`, `z`:
  - Added all single-letter variables (a-w) to DENY_LIST with context-appropriate replacement suggestions
  - Only `x`, `y`, `z` are allowed for coordinate systems and geometry contexts
  - Variables like `i`, `j`, `k`, `e`, `s`, `t`, `n` now require descriptive names (`index`, `error`, `string`, `count`, etc.)
  - Applied to variables, function parameters, and function names

### Fixed

- **Global Const Abbreviation Restrictions**: Fixed abbreviation restrictions not being applied to global const variables:
  - Global const variables (module-level `const` declarations) now correctly validate against the abbreviation DENY_LIST
  - Variables like `msg`, `cfg` at module level are now properly flagged as violations
  - Created dedicated `variableConstGlobalAbbreviationRestriction` rule that extends `variableNamingConstGlobal` with abbreviation checks
  - Updated documentation to clarify that abbreviation restrictions apply to all variable types including global consts

### Changed

- **ALLOW_LIST**: Removed `data` from ALLOW_LIST to enforce more descriptive naming:
  - The identifier `data` is now banned and must be replaced with specific terms like `payload`, `result`, `records`, `responseBody`, `input`, or `output`
  - This change encourages developers to use domain-specific names that convey actual meaning
  - Updated to include only `x`, `y`, `z` as allowed single-letter variables (removed `x`, `y` from coordinate-only context)
- **DENY_LIST**: Expanded with comprehensive single-letter entries including:
  - `a` → array, attribute, value, accumulator
  - `b` → boolean, buffer, byte, value
  - `c` → character, count, class, component
  - `d` → data, day, distance, delta
  - `e` → event, error, exception, element
  - `i`, `j`, `k` → index, itemIndex, rowIndex, columnIndex
  - And more for all letters a-w

### Documentation

- Updated [Abbreviation Restrictions](/rules/abbreviations) documentation:
  - Emphasized single-letter variable policy at the top of "Why This Rule" section
  - Added examples showing `x`, `y`, `z` as allowed coordinate variables
  - Enhanced "Loop Indices" section to emphasize that `i`, `j`, `k` are banned
  - Updated code examples to use VitePress snippet imports from test files
- Updated `README.md` to mention single-letter variable restrictions
- Updated `docs/policies/update-policy.md` to require using code snippets from tests instead of duplicating in docs

### Tests

- Added 13 single-letter variable test cases to negative examples
- Added `x`, `y`, `z` coordinate variable examples to positive tests
- Updated test expectations to validate 35 total errors (32 variables + 3 parameters)
- Enhanced test snippets with ✅ and ❌ markers for clarity

---

## [1.7.0] - 2026-01-05

### Added

- **Type Parameter (Generics) Naming**: Added comprehensive naming conventions for generic type parameters:
  - Single uppercase letters: `T`, `U`, `V`, `K` (the four standard generic type parameters)
  - Prefixed descriptive names: `TData`, `TItem`, `TElement`, `TError` (T prefix), `KKey` (K prefix), `VValue` (V prefix)
  - Numeric subscripts: `T0`, `T1`, `K1`, `K2`, `V1` for sequences of related types
  - Disallows lowercase (`t`, `tItem`), descriptive names without prefix (`Type`, `Data`), redundant suffixes (`TItemType`), and snake_case (`T_Item`)

### Changed

- **Type-like Selector**: Changed `typeLike` selector to `typeAlias` for more precise targeting and to avoid conflicts with the new `typeParameter` rule

### Documentation

- Added comprehensive [Type Parameters (Generics)](/rules/types/type-parameter) documentation with rationale, examples, and references
- Updated rule matrix and types overview to include type parameters
- Updated `README` rule overview section with type parameter conventions
- Clarified "Type-like" label to "Type Aliases" throughout documentation
- Updated `README` "At a Glance" section with professional table format and side-by-side code examples
- Restructured `README` documentation section for better organization and clarity

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
- Added `README` section explaining the new feature

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
