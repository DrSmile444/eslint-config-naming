class PrivateReadonlyBad {
  private readonly FooBar = 1; // PascalCase not allowed (should be UPPER_CASE or camelCase)
  private readonly _fooBar = 2; // Leading underscore forbidden
}

