class PrivateMemberBad {
  private _fooBar = 1; // Leading underscore forbidden
  private FooBar = 2; // PascalCase not allowed
  private MAX_RETRIES = 3; // UPPER_CASE not allowed for instance members
}

