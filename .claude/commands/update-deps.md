---
name: 'Update Dependencies'
description: 'Check for outdated npm dependencies, update them, then verify nothing breaks (lint, typecheck, tests)'
category: Maintenance
tags: [dependencies, npm, updates, maintenance]
---

Update all npm dependencies to their latest versions and verify the project remains healthy.

## Steps

### 1. Check current status

Run a dry-run to see what would be updated:

```bash
npx npm-check-updates
```

If nothing is outdated, report that and stop.

### 2. Update package.json

Apply all updates to `package.json`:

```bash
npx npm-check-updates -u
```

### 3. Install updated packages

```bash
npm install
```

### 4. Verify nothing breaks

Run all checks in sequence. Stop and report if any step fails.

**Type check:**

```bash
npm run typecheck
```

**Lint:**

```bash
npm run lint
```

**Tests:**

```bash
npm run test:run
```

### 5. Report results

Summarize:

- Which packages were updated (name, old version → new version)
- Which checks passed
- If any check failed: which one, the error output, and what to do next (e.g. revert a specific package with `npm install <pkg>@<old-version>`)

## Notes

- If `npm run lint` is slow, it will still complete — do not interrupt it
- Do not skip any verification step
- If a check fails after update, do NOT auto-revert. Show the failure clearly and let the user decide whether to revert or fix forward
- Prefer fixing forward (fixing the code to work with the new version) over reverting, but only suggest that if the fix looks straightforward
