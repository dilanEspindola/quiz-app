import { axiosConfig } from "@/interceptors";
import { IUserRegister, Login, ResponseUserCreated } from "@/interfaces";

export const createUser = async (
  userDataRegister: IUserRegister
): Promise<ResponseUserCreated> => {
  const response = await axiosConfig.post(
    "api/auth/register",
    userDataRegister
  );

  const data: ResponseUserCreated = response.data;

  return data;
};

export const loginUser = async (userDataLogin: Login) => {
  const response = await axiosConfig.post("api/auth/login", userDataLogin);

  const data = response.data;

  return data;
};
