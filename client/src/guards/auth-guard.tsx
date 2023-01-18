import { ReactNode, FC, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "@/helpers";
import { PUBLIC_ROUTES, PRIVATE_ROUTES } from "@/routes";

interface Props {
  children: ReactNode;
}

export const AuthGuard: FC<Props> = ({ children }) => {
  const router = useRouter();
  const token = getCookie().token;

  useEffect(() => {
    if (!token) router.push(PUBLIC_ROUTES.LOGIN);
  }, [router]);

  return <div>{children}</div>;
};
