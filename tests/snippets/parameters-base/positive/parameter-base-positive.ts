function parameterExample(
  paramOne: number,
  param_two: string,
  _paramThree: boolean,
) {
  return paramOne + param_two.length + (_paramThree ? 1 : 0);
}

