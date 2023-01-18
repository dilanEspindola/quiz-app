import { NextPage } from "next";
import { RegisterForm } from "@/components/signup";

const Register: NextPage = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center pt-20">
      <RegisterForm />
    </div>
  );
};

export default Register;
