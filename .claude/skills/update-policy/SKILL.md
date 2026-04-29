# Skill: Update Policy

You are an AI assistant maintaining a **rules + documentation + tests** package. Any config change is user-facing and affects lint outcomes. Treat changes carefully to keep the repository **predictable**, **verifiable**, and **documented**.

## Scope

This skill applies to changes impacting:

- Rule options
- Rule ordering/precedence
- Exports (flat config or legacy)
- Packaging (exports, build output, file list)
- Documentation or usage instructions

## Change Checklist (Mandatory)

Update **all** relevant areas:

### 1. Source code (`src/`)

- Add/update rule entries or selectors
- Maintain consistent structure (split by selectors/folders)
- Ensure intentional precedence/order
- Support both Flat Config and Legacy exports

Outcome: `npm run build` produces correct `dist/` artifacts.

### 2. Tests (`tests/`)

- Add/update test cases for affected selectors
- Add snippet files in `positive`/`negative` folders (one per file)
- Import snippets via `?url`
- Prove accepted names valid and invalid names error
- Use `expect(result.errorCount).toBe(${count})` for exact errors

Example of a **positive** snippet (`tests/snippets/<category>/positive/<name>.ts`):

```ts
// Variables - descriptive names
const userData = { id: 1, name: 'Alice' };
const responseBody = { status: 'ok' };
const errorMessage = 'Failed to connect';
const callback = () => {};
```

Example of a **negative** snippet (`tests/snippets/<category>/negative/<name>.ts`):

```ts
// Variables - banned abbreviations
const str = 'text'; // ❌ Use: string or text
const num = 42; // ❌ Use: number or count
const arr = [1, 2, 3]; // ❌ Use: array or items
const obj = {}; // ❌ Use: object or specific domain name (user, config, etc.)
```

- Use `// ❌` comments on invalid lines to explain preferred alternatives.

Outcome: `npm test` passes and behavior is regression-protected. All tests succeed, including existing ones.

### 3. Documentation (`docs/`)

- Add/update rule pages under `docs/rules/**`
- Update Rule Matrix (`docs/rules/index.md`)
- Update navigation (`docs/.vitepress/config.ts`)
- Update home page if the change is significant
- Update guides if behavior affects recommendations
- Reference snippets from tests via dynamic Vite import:

```md
## ✅ Good

<<< ../../tests/snippets/type-parameters/positive/type-parameter-positive.ts{ts}

## ❌ Bad

<<< ../../tests/snippets/type-parameters/negative/type-parameter-negative.ts{ts}
```

Outcome: `npx vitepress build docs` succeeds and the rule is discoverable.

### 4. README (`README.md`)

- Update installation/usage instructions if changed
- Update config structure/exports if changed
- Update rule overview summary

Outcome: README is accurate for users and reflects current behavior.

### 5. Package metadata (`package.json`)

- Bump version (required for any published change)

Outcome: Versioning is consistent with releases and CI.

### 6. Changelog (`docs/reference/changelog.md`)

- Add an entry summarizing the change
- Include version number and date (format: `YYYY-MM-DD`)

Outcome: Changelog reflects the latest changes for users.

### 7. Format docs

- Run `npm run format:md` to ensure docs are formatted.

Outcome: No formatting issues in documentation.

## Versioning Policy

Use semantic versioning:

| Bump      | When                                                                      |
| --------- | ------------------------------------------------------------------------- |
| **PATCH** | Doc/test-only or internal refactors (no lint behavior change)             |
| **MINOR** | New rules, allowances, or patterns (backwards-compatible)                 |
| **MAJOR** | Breaking changes (new errors in valid code), rule removal, export changes |

> If unsure, treat as **MAJOR**.

## Definition of Done

A change is complete when **all** of the following are true:

- [ ] Rules implemented in `src/`
- [ ] Tests prove the behavior in `tests/`
- [ ] Docs describe it in `docs/`
- [ ] README is consistent
- [ ] `package.json` version bumped
- [ ] `docs/reference/changelog.md` updated
- [ ] `npm run format:md` run
- [ ] `npm run typecheck && npm run lint && npm test` all pass
- [ ] `npm run build` succeeds
