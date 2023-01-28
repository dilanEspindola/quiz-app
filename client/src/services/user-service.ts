import { QueryFunctionContext } from "@tanstack/react-query";
import { axiosConfig } from "@/interceptors";
import { IUserRegister, Login, ResponseUserCreated, User } from "@/interfaces";
import { getUser } from "@/helpers";

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

export const getUserByUsername = async (username: string): Promise<User> => {
  const response = await axiosConfig.get(`api/users/user?username=${username}`);
  const data = response.data;

  return data;
};

export const updatePhotoUseProfile = async (image: any) => {
  const userId = getUser()?.id;

  const formData = new FormData();
  formData.append("photo", image);

  const res = await axiosConfig.put(`api/users/user/${userId}`, formData);
  const data = res.data;
  return data;
};
