import { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { getUsernameFromLocalStorage } from "@/helpers";
import { AuthGuard } from "@/guards";
import { PUBLIC_ROUTES } from "@/routes";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const user = getUsernameFromLocalStorage();
    user
      ? router.push(`home/${user.username}`)
      : router.replace(PUBLIC_ROUTES.LOGIN);
  }, []);

  return;
};

export default Home;
