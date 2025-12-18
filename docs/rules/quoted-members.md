
# Quoted members are ignored

**Modifier:** `requiresQuotes`
Format: `null`

This allows external contracts where names cannot be valid identifiers.

## ✅ Good

```ts
const headers = {
  "Content-Type": "application/json",
  "X-Custom-Header": "x",
};

class X {
  "custom-method"() {}
}

enum HttpHeaders {
  "content-type" = "content-type",
}
```

## Notes

Only the quoted members are ignored; normal identifiers still follow rules.
