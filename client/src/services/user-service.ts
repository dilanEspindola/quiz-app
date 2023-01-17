import { axiosConfig } from "@/interceptors";
import { IUserRegister, ResponseUserCreated } from "@/interfaces";

export const createUser = async (
  userDataRegister: IUserRegister
): Promise<ResponseUserCreated> => {
  const response = await axiosConfig.post("auth/register", userDataRegister);

  const data: ResponseUserCreated = response.data;

  return data;
};
