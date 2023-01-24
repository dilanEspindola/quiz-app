import { ResponseLogin, User } from "@/interfaces";

export const setUserLocalStorage = (data: ResponseLogin) => {
  if (localStorage.getItem("user")) return null;

  localStorage.setItem("user", JSON.stringify(data.user));
};

export const getUsernameFromLocalStorage = (): User => {
  const user = JSON.parse(localStorage.getItem("user")!);
  return user;
};
