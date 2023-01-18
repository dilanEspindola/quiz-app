export interface User {
  id: number;
  username: string;
  email: string;
  photo: string;
  password?: string;
}

export interface IUserRegister {
  username: string;
  email: string;
  password: string;
  photo?: any;
}

export interface ResponseUserCreated {
  message: string;
}

export interface ResponseLogin {
  user: User;
}

export type Login = Pick<User, "username" | "password">;
