import { Sidebar } from "@/components/sidebar";
import { AuthGuard } from "@/guards";

const Leadboard = () => {
  return (
    <AuthGuard>
      <Sidebar />
      <div>
        <h1>leadboard</h1>
      </div>
    </AuthGuard>
  );
};

export default Leadboard;
