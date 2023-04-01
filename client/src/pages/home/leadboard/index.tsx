import { Sidebar } from "@/components/sidebar";
import { AuthGuard } from "@/guards";
import { getUsers } from "@/services";
import { GetServerSideProps } from "next";

const Leadboard = () => {
  return (
    <AuthGuard>
      <div className="bg-background flex">
        <Sidebar />
        <h1>leadboard</h1>
      </div>
    </AuthGuard>
  );
};

export default Leadboard;

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await getUsers();

  const scores: number[] = [];

  users.filter((user) => scores.push(user.score));

  const sorted = scores.sort((a, b) => b - a);
  console.log(sorted);

  return { props: {} };
};
