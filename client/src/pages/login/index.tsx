import { NextPage } from "next";
import { LoginForm } from "@/components/login";

const Login: NextPage = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center pt-20">
      <LoginForm />
    </div>
  );
};

export default Login;
