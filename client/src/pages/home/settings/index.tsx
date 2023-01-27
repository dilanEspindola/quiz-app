import { Sidebar } from "@/components/sidebar";
import { AuthGuard } from "@/guards";

const Settings = () => {
  return (
    <AuthGuard>
      <div className="bg-background">
        <Sidebar />
        <h1>settings</h1>
      </div>
    </AuthGuard>
  );
};

export default Settings;
