import { createContext } from "react";
import { IUserRegister, Login } from "@/interfaces";

interface ContextProps {
  registerUser: (data: IUserRegister) => Promise<void>;
  login: (data: Login) => Promise<void>;
}

export const AuthContext = createContext<ContextProps>({} as ContextProps);
