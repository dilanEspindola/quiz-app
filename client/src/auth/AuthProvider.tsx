import { FC } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./AuthContext";
import { IUserRegister, Login } from "@/interfaces";
import { createUser, loginUser } from "@/services";
import { setUserLocalStorage } from "@/helpers";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter();

  const registerUser = async (userData: IUserRegister) => {
    try {
      await createUser(userData);
      router.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

  const login = async (userData: Login) => {
    try {
      const data = await loginUser(userData);
      setUserLocalStorage(data);
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
