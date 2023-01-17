import { NextPage } from "next";
import { ToastContainer } from "react-toastify";
import { RegisterForm } from "@/components/signup";

const Register: NextPage = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center pt-20">
      <RegisterForm />
      <ToastContainer />
    </div>
  );
};

export default Register;
