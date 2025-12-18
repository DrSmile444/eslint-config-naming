
# Common errors

## “Name must match one of the following formats…”

This means the selector matched and the name is in the wrong format.

Fix strategy:

1. Identify what you’re naming (type? variable? member?)
2. Check the relevant rule page
3. Rename or add a scoped override

## “Boolean variable must have one of these prefixes…”

Rename:

* `enabled` → `isEnabled`
* `active` → `isActive`
