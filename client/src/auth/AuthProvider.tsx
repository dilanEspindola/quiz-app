import { FC } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./AuthContext";
import { IUserRegister, Login } from "@/interfaces";
import { createUser, loginUser } from "@/services";
import { setUserLocalStorage } from "@/helpers";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/routes";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter();

  const registerUser = async (userData: IUserRegister) => {
    try {
      await createUser(userData);
      router.push(PUBLIC_ROUTES.LOGIN);
    } catch (error: any) {
      console.log(error);
    }
  };

  const login = async (userData: Login) => {
    try {
      const data = await loginUser(userData);
      setUserLocalStorage(data);
      router.push(PRIVATE_ROUTES.HOME);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
