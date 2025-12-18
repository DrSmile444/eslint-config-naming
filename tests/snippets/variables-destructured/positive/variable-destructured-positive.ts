interface ResponseData {
  userName: string;
  userAge: number;
  userId: string;
}

const responseData: ResponseData = {
  userName: 'John',
  userAge: 30,
  userId: '1',
};

const { userName, userAge, userId } = responseData;

