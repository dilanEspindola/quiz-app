import { NextPage } from "next";
import { RegisterForm } from "@/components/signup";

import styles from "@/styles/signup.module.css";

const Register: NextPage = () => {
  return (
    <div
      className={`min-h-screen flex items-center justify-between
       ${styles.loginRegisterPage}`}
    >
      <div className="z-10 w-6/12 p-10">
        <h1 className="text-white text-center text-2xl leading-[150%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
          pariatur, cum adipisci nihil, totam ipsum exercitationem iure itaque
          debitis voluptate velit quae.
        </h1>
      </div>
      <div className="w-6/12 flex justify-center items-center h-screen bg-slate-800 z-20">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
