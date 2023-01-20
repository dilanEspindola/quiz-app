import { ReactNode, FC, useEffect } from "react";
import { useRouter } from "next/router";
import { isExpired, decodeToken } from "react-jwt";
import { getCheckValidationCookie } from "@/helpers";
import { PUBLIC_ROUTES } from "@/routes";

interface Props {
  children: ReactNode;
}

export const AuthGuard: FC<Props> = ({ children }) => {
  const router = useRouter();
  const token = getCheckValidationCookie();
  const isExpiredToken = isExpired(token);

  useEffect(() => {
    if (!token || isExpiredToken) {
      router.replace(PUBLIC_ROUTES.LOGIN);
      localStorage.removeItem("user");
    }
  }, [router]);

  return <div>{children}</div>;
};
