import { FC } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./AuthContext";
import { IUserRegister } from "@/interfaces";
import { createUser } from "@/services";

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

  return (
    <AuthContext.Provider
      value={{
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
