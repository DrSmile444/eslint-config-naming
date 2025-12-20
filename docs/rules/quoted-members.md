# Quoted members are ignored

- **Modifier:** `requiresQuotes`
- Format: `null`

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
  'Content-Type': 'application/json', // WHY: Must be quoted because of the hyphen; external HTTP header name
  'X-Custom-Header': 'x', // WHY: Exact external contract key preserved
};

class X {
  'custom-method'() {} // WHY: Method name contains a dash; quoting preserves the external API surface
}

enum HttpHeaders {
  'content-type' = 'content-type', // WHY: Enum member mirrors external key, quoting required
}
```

Each example above shows a case where quoting is required to represent an external contract or an identifier containing characters (like '-') that are not valid unquoted identifiers.

## ❌ Bad

```text
const headers = {
  Content-Type: 'application/json', // WHY: Syntax error — unquoted identifier with '-' is invalid in JS
};
```

```text
class X {
  custom-method() {} // WHY: Syntax error — '-' is not allowed in unquoted identifier names
}
```

These "Bad" examples are syntactically invalid and demonstrate why quoted members must be permitted and excluded from naming enforcement: they represent keys that cannot otherwise be expressed in JavaScript without quotes.

## Notes

Only the quoted members are ignored; normal identifiers still follow rules.
