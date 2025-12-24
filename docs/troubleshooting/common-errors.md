# Common errors

## "Unexpected top-level property 'default'"

**Error message:**
```
ESLint configuration in .eslintrc » eslint-config-naming/legacy is invalid:
- Unexpected top-level property "default".
```

**Cause:** You're using an older version of `eslint-config-naming` (< 1.4.2) with ESLint 8.

**Solution:** Upgrade to version 1.4.2 or later:
```bash
npm install eslint-config-naming@latest
```

This issue was fixed in version 1.4.2 where the legacy CommonJS export was updated to properly unwrap the configuration object for ESLint 8 compatibility.

---

## "Name must match one of the following formats…"

This means the selector matched and the name is in the wrong format.

Fix strategy:

1. Identify what you’re naming (type? variable? member?)
2. Check the relevant rule page
3. Rename or add a scoped override

## “Boolean variable must have one of these prefixes…”

Rename:

- `enabled` → `isEnabled`
- `active` → `isActive`
