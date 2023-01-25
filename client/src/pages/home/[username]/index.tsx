import { useEffect } from "react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Sidebar } from "@/components/sidebar";
import { Profile } from "@/components/home";
import { AuthGuard } from "@/guards";
import { axiosConfig } from "@/interceptors";
import { User } from "@/interfaces";

const HomeUser = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  useEffect(() => {
    document.title = `App | ${user.username}`;
  }, [router]);

  if (!router.isReady) return <h1>loading...</h1>;

  return (
    <AuthGuard>
      <div className="bg-background min-h-screen flex">
        <Sidebar />
        <Profile user={user} />
      </div>
    </AuthGuard>
  );
};

export default HomeUser;

export const getServerSideProps: GetServerSideProps<{ user: User }> = async ({
  query,
}) => {
  try {
    const response = await axiosConfig.get(
      `api/users/user?username=${query.username}`
    );
    const user: User = response.data;

    return {
      props: { user },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
