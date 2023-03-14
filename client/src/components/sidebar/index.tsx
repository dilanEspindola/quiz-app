import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getUser } from "@/helpers";
import { PRIVATE_ROUTES } from "@/routes";

export const Sidebar = () => {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (getUser()?.username || window.localStorage !== undefined) {
      setUsername(getUser()?.username as string);
    }
  }, []);

  return (
    <div className="h-screen flex items-center w-2/12 bg-[#0E0D14] shadow-sidebar z-10">
      <ul className="text-white flex flex-col justify-center items-center w-full gap-20">
        <Link
          href={PRIVATE_ROUTES.HOME}
          className={
            router.asPath === PRIVATE_ROUTES.HOME ||
            router.asPath.includes(`${PRIVATE_ROUTES.CATEGORY}`) ||
            router.asPath.includes(`${PRIVATE_ROUTES.QUESTIONS}`)
              ? "bg-gradient-to-r from-[#A40C55] to-[#D73AFE] px-10 py-3 rounded-full shadow-link"
              : ""
          }
        >
          Home
        </Link>
        <Link
          href={PRIVATE_ROUTES.LEADBOARD}
          className={
            router.asPath === PRIVATE_ROUTES.LEADBOARD
              ? "bg-gradient-to-r from-[#A40C55] to-[#D73AFE] px-10 py-3 rounded-full shadow-link"
              : ""
          }
        >
          Leadboard
        </Link>
        <Link
          href={`${PRIVATE_ROUTES.HOME}/${username}`}
          className={
            router.asPath === `${PRIVATE_ROUTES.HOME}/${username}`
              ? "bg-gradient-to-r from-[#A40C55] to-[#D73AFE] px-10 py-3 rounded-full shadow-link"
              : ""
          }
        >
          Profile
        </Link>
        <Link
          href={PRIVATE_ROUTES.SETTINGS}
          className={
            router.asPath === PRIVATE_ROUTES.SETTINGS
              ? "bg-gradient-to-r from-[#A40C55] to-[#D73AFE] px-10 py-3 rounded-full shadow-link"
              : ""
          }
        >
          Settings
        </Link>
      </ul>
    </div>
  );
};
