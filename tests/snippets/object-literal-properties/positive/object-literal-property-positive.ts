const obj = {
  fooBar: 1,
  foo_bar: 2,
  FooBar: 3,
};

// Support for global constant objects
export const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

