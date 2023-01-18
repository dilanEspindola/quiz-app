import { NextPage } from "next";
import { AuthGuard } from "@/guards";

const Home: NextPage = () => {
  return (
    <AuthGuard>
      <div>
        <h1>home page</h1>
      </div>
    </AuthGuard>
  );
};

export default Home;
