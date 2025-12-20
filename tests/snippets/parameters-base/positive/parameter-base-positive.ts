function parameterExample(
  paramOne: number,
  paramTwo: string,
  _paramThree: boolean,
) {
  return paramOne + paramTwo.length + (_paramThree ? 1 : 0);
}

interface ApiUser {
  user_id: number;
  first_name: string;
  last_name: string;
}

function processUser({ user_id, first_name }: ApiUser) {
  return `${first_name} (${user_id})`;
}
