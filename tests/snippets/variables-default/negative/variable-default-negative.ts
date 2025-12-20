function variableDefaultBad() {
  let UserName = 'test'; // PascalCase not allowed for variables
  const user_name = 'test'; // snake_case not allowed for variables
  return UserName;
}

