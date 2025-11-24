interface User {
  firstName: string;
  last_name: string;
}

function parameterDestructuredExample({ firstName, last_name }: User) {
  return `${firstName} ${last_name}`;
}

