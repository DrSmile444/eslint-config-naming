# Update Policy Prompt for LLM

You are an AI assistant maintaining a **rules + documentation + tests** package. Any config change is user-facing and affects lint outcomes. Treat changes carefully to keep the repository **predictable**, **verifiable**, and **documented**.

## Scope

This policy applies to changes impacting:

- Rule options
- Rule ordering/precedence
- Exports (flat config or legacy)
- Packaging (exports, build output, file list)
- Documentation or usage instructions

## Change Checklist (Mandatory)

Update **all** relevant areas:

1. **Source code (`src/`)**:
   - Add/update rule entries or selectors
   - Maintain consistent structure (split by selectors/folders)
   - Ensure intentional precedence/order
   - Support both Flat Config and Legacy exports

   Outcome: `npm run build` produces correct `dist/` artifacts.

2. **Tests (`tests/`)**:
   - Add/update test cases for affected selectors
   - Add snippet files in `positive`/`negative` folders (one per file)
   - Import snippets via `?url`
   - Prove accepted names valid and invalid names error
   - Use `expect(result.errorCount).toBe(${count})` for exact errors

   Example of positive case snippet:

   ```ts
   // Variables - descriptive names
   const userData = { id: 1, name: 'Alice' };
   const responseBody = { status: 'ok' };
   const errorMessage = 'Failed to connect';
   const callback = () => {};
   ```

   Example of negative case snippet:

   ```ts
   // Variables - banned abbreviations
   const str = 'text'; // ❌ Use: string or text
   const num = 42; // ❌ Use: number or count
   const arr = [1, 2, 3]; // ❌ Use: array or items
   const obj = {}; // ❌ Use: object or specific domain name (user, config, etc.)
   ```

   Use comments to indicate expected corrections.
   Use `// ❌` for invalid cases and explain preferred alternatives.

   Outcome: `npm test` passes and behavior is regression-protected. All tests are successful, even the existing ones.

3. **Documentation (`docs/`)**:
   - Add/update rules pages under `docs/rules/**`
   - Update Rule Matrix (`docs/rules/index.md`)
   - Update navigation (`docs/.vitepress/config.ts`)
   - Update home page if significant
   - Update guides if behavior affects recommendations
   - Use snippets from tests via dynamic Vite import, e.g. `<<< ../../src/naming-abbreviations.ts#DENY_LIST{ts}`

   Example of snippet inclusion in docs:

   ```md
   ## ✅ Good

   <<< ../../tests/snippets/type-parameters/positive/type-parameter-positive.ts{ts}

   ## ❌ Bad

   <<< ../../tests/snippets/type-parameters/negative/type-parameter-negative.ts{ts}
   ```

   Outcome: `npx vitepress build docs` succeeds and rule is discoverable.

4. **README (`README.md`)**:
   - Update for installation/usage changes
   - Update config structure/exports
   - Update rule overview summary

   Outcome: README accurate for users and reflects current behavior.

5. **Package metadata (`package.json`)**:
   - Bump version (required for published changes)

   Outcome: Versioning consistent with releases and CI.

6. **Changelog (`docs/reference/changelog.md`)**:
   - Add entry summarizing the change
   - Include version number and date

   Outcome: Changelog reflects latest changes for users.

7. **Run formatting**:
   - Run `npm run format:md` to ensure docs are formatted.

   Outcome: No formatting issues in documentation.

## Versioning Policy

Use semantic versioning:

- **PATCH**: Doc/test-only or internal refactors (no lint behavior change)
- **MINOR**: New rules, allowances, or patterns (backwards-compatible)
- **MAJOR**: Breaking changes (new errors in valid code), rule removal, export changes

If unsure, treat as **MAJOR**.

## Definition of Done

Change is done when:

- Rules implemented
- Tests prove behavior
- Docs describe it
- README consistent
- Package metadata/version updated, unless user asked otherwise
