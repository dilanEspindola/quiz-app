import { decodeToken } from "react-jwt";

export const useToken = (token: string) => {
  const tokenDecoded = decodeToken(token);

  return { tokenDecoded };
};
