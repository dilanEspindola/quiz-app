import { Sidebar } from "@/components/sidebar";
import { AuthGuard } from "@/guards";

const Leadboard = () => {
  return (
    <AuthGuard>
      <div className="bg-background">
        <Sidebar />
        <h1>leadboard</h1>
      </div>
    </AuthGuard>
  );
};

export default Leadboard;
