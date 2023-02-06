import { AuthGuard } from "@/guards";
import { Sidebar } from "@/components/sidebar";
import { HomeComponent } from "@/components/home";

const Home = () => {
  return (
    <AuthGuard>
      <div className="bg-background min-screen flex">
        <Sidebar />
        <HomeComponent />
      </div>
    </AuthGuard>
  );
};

export default Home;
