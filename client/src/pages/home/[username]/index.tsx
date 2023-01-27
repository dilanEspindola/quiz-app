import { useEffect } from "react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Sidebar } from "@/components/sidebar";
import { Profile } from "@/components/home";
import { AuthGuard } from "@/guards";
import { User } from "@/interfaces";
import { getUserByUsername } from "@/services";
import { useFetchUsername } from "@/hooks";
import { LoaderPage } from "@/components/loaders";

const HomeUser = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data, isLoading } = useFetchUsername(user.username);

  useEffect(() => {
    document.title = `App | ${user.username}`;

    console.log(router.query.username);
  }, [router]);

  if (isLoading) return <LoaderPage />;

  return (
    <AuthGuard>
      <div className="bg-background min-h-screen flex">
        <Sidebar />
        <Profile user={data} />
      </div>
    </AuthGuard>
  );
};

export default HomeUser;

export const getServerSideProps: GetServerSideProps<{ user: User }> = async (
  ctx
) => {
  try {
    const user = await getUserByUsername(ctx.query.username as string);

    return {
      props: { user },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
