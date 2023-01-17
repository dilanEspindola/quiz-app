import { createContext } from "react";
import { IUserRegister } from "@/interfaces";

interface ContextProps {
  registerUser: (data: IUserRegister) => Promise<void>;
}

export const AuthContext = createContext<ContextProps>({} as ContextProps);
