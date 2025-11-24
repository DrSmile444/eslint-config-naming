interface BadUser {
  Foo_bar: string;
}

function parameterDestructuredBad({ Foo_bar }: BadUser) {
  return Foo_bar;
}

