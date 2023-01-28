import { useEffect, useState } from "react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Sidebar } from "@/components/sidebar";
import { Profile, NotMyProfile } from "@/components/home/profile";
import { AuthGuard } from "@/guards";
import { User } from "@/interfaces";
import { getUserByUsername } from "@/services";
import { useFetchUsername, useToken } from "@/hooks";
import { LoaderPage } from "@/components/loaders";
import { getCheckValidationCookie } from "@/helpers";

const HomeUser = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data, isLoading } = useFetchUsername(user.username);
  const { tokenDecoded } = useToken(getCheckValidationCookie()) as any;
  const [isValidateUser, setIsValidateUser] = useState(false);

  useEffect(() => {
    document.title = `App | ${user.username}`;
    if (tokenDecoded && tokenDecoded.username === user.username) {
      setIsValidateUser(true);
    }
  }, [router]);

  if (isLoading) return <LoaderPage />;

  return (
    <AuthGuard>
      <div className="bg-background min-h-screen flex">
        <Sidebar />
        {isValidateUser ? (
          <Profile user={data!} />
        ) : (
          <NotMyProfile user={user} />
        )}
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
