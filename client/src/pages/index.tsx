import { useEffect } from "react";
import { useRouter } from "next/router";
import { AuthGuard } from "@/guards";
import { PRIVATE_ROUTES } from "@/routes";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(PRIVATE_ROUTES.HOME);
  }, [router]);

  return;
};

export default Home;
