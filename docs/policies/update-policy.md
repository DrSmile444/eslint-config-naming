# Update policy

This project is a **rules + documentation + tests** package. Any change to the config must be treated as a user-facing change, because it affects lint outcomes in real repositories.

This policy defines what must be updated when adding or changing rules.

---

## Goal

When someone introduces a change, the repository must remain:

- **predictable** (users understand what changed and why)
- **verifiable** (tests cover the new behavior)
- **documented** (docs + README match the shipped rules)

---

## Scope

This policy applies to **any** change that impacts:

- rule options
- rule ordering / precedence
- exports (flat config or legacy config)
- packaging (exports, build output, file list)
- documentation or usage instructions

---

## Change checklist (mandatory)

When proposing a change, update **all** relevant areas:

### 1) Source code (`src/`)

You must update source files to reflect new behavior:

- add new rule entries or selectors (if needed)
- keep rule structure consistent (split by selectors/folders as designed)
- ensure precedence/order is intentional and documented
- ensure both exports remain supported:
  - Flat Config (`eslint.config.js`) usage
  - Legacy `.eslintrc.*` usage (shareable `/legacy` entry)

✅ Outcome: `npm run build` produces correct `dist/` artifacts.

---

### 2) Documentation (`docs/`)

If a rule changes, docs must change in the same PR.

Required updates may include:

- adding a new rules page under `docs/rules/**`
- updating the Rule Matrix (`docs/rules/index.md`)
- updating sidebar navigation (`docs/.vitepress/config.ts`)
- updating home page summary (`docs/index.md`) if the change is significant
- updating guides if behavior changes affect recommendations

✅ Outcome: `npx vitepress build docs` succeeds and the rule explanation is discoverable via navigation.

---

### 3) Tests (`tests/`)

Every rule change must be covered by tests.

You must:

- add or update test cases for the affected selector(s)
- add new snippet files under the snippets structure:
  - separate `positive` and `negative` folders
  - one snippet per file
  - import snippets into tests via `?url`
- ensure the tests prove both:
  - ✅ accepted names remain valid
  - ❌ invalid names produce errors
- we collect the exact errors to verify against regressions by using `expect(result.errorCount).toBe(${count})`

✅ Outcome: `npm test` passes and the new behavior is protected against regression.

---

### 4) README (`README.md`)

Update README when changes affect:

- installation or usage
- config structure/exports
- rule overview (the “what it enforces” summary)
- documentation links
- migration guidance

✅ Outcome: README remains accurate for first-time users and reflects current exported behavior.

---

### 5) Package metadata (`package.json`)

You must update `package.json` when relevant:

- bump version (required for any published change)
- update dependency ranges if needed (especially peers)
- ensure exports remain correct (e.g., `/legacy`)
- update scripts if new build/test behavior is introduced

✅ Outcome: versioning is consistent with releases and CI.

---

## Versioning policy

Use semantic versioning:

- **PATCH**: doc/test-only changes or internal refactors that do not change lint behavior
- **MINOR**: new rules, new allowances, or new supported patterns (backwards-compatible)
- **MAJOR**: any breaking change to lint results (new errors in previously valid code), rule removal, export changes

> If you are unsure whether a change is breaking, treat it as **MAJOR**.

---

## Pull request expectations

A rule-related PR must include:

- motivation (“why”)
- examples (“good/bad”)
- tests
- docs
- version bump

If any required area is missing, the PR should not be merged.

---

## CI expectations

Before merge:

- Code Quality pipeline must pass (lint + tests + build)
- Docs build must pass
- Release checks must remain compatible (tag/version matching)

---

## Definition of done

A change is done when:

- rules are implemented
- tests prove the new behavior
- docs fully describe it
- README is consistent
- package metadata/version is updated
- CI is green

---
