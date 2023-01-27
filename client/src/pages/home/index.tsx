import { AuthGuard } from "@/guards";
import { Sidebar } from "@/components/sidebar";

const Home = () => {
  return (
    <AuthGuard>
      <div className="bg-background">
        <Sidebar />
      </div>
    </AuthGuard>
  );
};

export default Home;
