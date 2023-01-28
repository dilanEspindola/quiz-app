import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { axiosConfig } from "@/interceptors";
import { User } from "@/interfaces";

export const getUsername = async (ctx: QueryFunctionContext): Promise<User> => {
  const [key, username] = ctx.queryKey;
  const res = await axiosConfig.get(`api/users/user?username=${username}`);
  return res.data;
};

export const useFetchUsername = (username: string) => {
  return useQuery(["user", username], getUsername);
};
