import { useContext } from "react";
import { AuthContext } from "@/auth";

export const useAuth = () => {
  const { registerUser, login } = useContext(AuthContext);

  return { registerUser, login };
};
