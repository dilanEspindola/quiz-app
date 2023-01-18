import { ResponseLogin } from "@/interfaces";

export const setUserLocalStorage = (data: ResponseLogin) => {
  if (localStorage.getItem("user")) return null;

  localStorage.setItem("user", JSON.stringify(data.user));
};
