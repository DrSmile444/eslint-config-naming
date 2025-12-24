# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

