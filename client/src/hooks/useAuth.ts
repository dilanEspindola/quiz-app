import { useContext } from "react";
import { AuthContext } from "@/auth";

export const useAuth = () => {
  const { registerUser } = useContext(AuthContext);

  return { registerUser };
};
