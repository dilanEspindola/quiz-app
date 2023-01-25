import { Sidebar } from "@/components/sidebar";
import { AuthGuard } from "@/guards";

const Settings = () => {
  return (
    <AuthGuard>
      <Sidebar />
      <div>
        <h1>settings</h1>
      </div>
    </AuthGuard>
  );
};

export default Settings;
