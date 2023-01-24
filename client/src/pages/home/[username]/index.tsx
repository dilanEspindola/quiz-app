import { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { axiosConfig } from "@/interceptors";
import { User } from "@/interfaces";
import { AuthGuard } from "@/guards";

const HomeUser: NextPage<{ user: User }> = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    document.title = `App | ${user.username}`;
  }, [router]);

  if (!router.isReady) return <h1>loading...</h1>;

  return (
    <AuthGuard>
      <div>
        <h1>home user {user.username}</h1>
      </div>
    </AuthGuard>
  );
};

export default HomeUser;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const response = await axiosConfig.get(
      `api/users/user?username=${context.query.username}`
    );
    const user = response.data;

    return {
      props: { user },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
