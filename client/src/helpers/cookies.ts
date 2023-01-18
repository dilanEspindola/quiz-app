import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getCookie = () => {
  const cookie = new Cookies();
  console.log(cookie.getAll());

  return {
    token: cookies.get("token", { doNotParse: true }),
  };
};
