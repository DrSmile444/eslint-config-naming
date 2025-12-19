
# Quoted members are ignored

**Modifier:** `requiresQuotes`
Format: `null`

## Why This Rule

Quoted members serve a critical purpose: they allow TypeScript to interface with external systems that don't follow JavaScript identifier rules. Without this exception, you'd be forced to:

- Rename HTTP headers (`"Content-Type"` → impossible to write as unquoted)
- Avoid special characters in property names from external APIs
- Create verbose mapping layers between external contracts and internal code

**Real-world scenarios:**
- **HTTP headers**: `"Content-Type"`, `"X-Custom-Header"`, `"Authorization"`
- **API contracts**: External systems may use kebab-case or include special characters
- **JSON schemas**: Sometimes you receive data with keys that aren't valid JavaScript identifiers

The rule is simple: if it **must** be quoted to be valid JavaScript, we don't enforce any naming convention. This respects the boundary between code you control and external contracts you must honor.

**References:**
- [MDN - Property Accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors)
- [TypeScript Handbook - Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)

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
