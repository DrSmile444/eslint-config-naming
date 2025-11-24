interface ResponseData {
  userName: string;
  user_age: number;
  UserId: string;
}

const responseData: ResponseData = {
  userName: 'John',
  user_age: 30,
  UserId: '1',
};

const { userName, user_age, UserId } = responseData;

