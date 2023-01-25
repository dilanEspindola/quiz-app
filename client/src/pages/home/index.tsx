import { AuthGuard } from "@/guards";
import { Sidebar } from "@/components/sidebar";

const Home = () => {
  return (
    <AuthGuard>
      <div>
        <Sidebar />
      </div>
    </AuthGuard>
  );
};

export default Home;
