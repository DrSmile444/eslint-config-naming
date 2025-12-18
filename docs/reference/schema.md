
# Schema (reference)

This config is built around `@typescript-eslint/naming-convention` entries.

A typical entry shape:

```ts
type NamingEntry = {
  selector: string | string[];
  format: string[] | null;
  modifiers?: string[];
  types?: string[];
  leadingUnderscore?: "allow" | "forbid" | "require";
  prefix?: string[];
  filter?: { match: boolean; regex: string };
  custom?: { match: boolean; regex: string };
};
```

See [Rule Matrix](/rules/) for the concrete mapping.
