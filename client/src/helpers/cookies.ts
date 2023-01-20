import Cookies from "universal-cookie";

export const getCheckValidationCookie = () => {
  const cookie = new Cookies();

  if (!cookie.get("token")) return null;

  return cookie.get("token");
};
