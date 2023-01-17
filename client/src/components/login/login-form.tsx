import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { InputError } from "@/components/formErrors";
import { useAuth } from "@/hooks";
import { PUBLIC_ROUTES } from "@/routes";

interface ILoginFormData {
  username: string;
  password: string;
}

import styles from "@/styles/signup.module.css";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();
  const { registerUser } = useAuth();
  const router = useRouter();

  const handleData = (data: ILoginFormData) => {
    console.log(data);
  };

  return (
    <div
      className={`w-5/12 p-5 flex flex-col shadow-lg rounded-md bg-gradient-to-br from-[#32003B] to-[#430A95]
          ${styles.formContainer}`}
    >
      <form className="flex flex-col" onSubmit={handleSubmit(handleData)}>
        <h1 className="text-3xl text-white mb-10">Login</h1>
        <div className="flex flex-col justify-between mb-3 gap-5">
          <div className="flex flex-col gap-3">
            <label htmlFor="username" className="text-white">
              Username:
            </label>
            <input
              type="text"
              className="w-full bg-transparent outline-none outline-slate-400 border-none p-2 rounded-md
            focus:outline-violet-300 duration-200 text-white"
              id="username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <InputError messageError="Username is required" />
            )}
          </div>
          <div className="flex gap-3 flex-col">
            <label htmlFor="password" className="w-2/12 text-white">
              Password:
            </label>
            <input
              type="password"
              className="w-full bg-transparent outline-none outline-slate-400 border-none p-2 rounded-md
              focus:outline-violet-300 duration-200 text-white"
              id="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <InputError messageError="Password is required" />
            )}
          </div>
          <div
            className={`flex justify-between items-center mt-10 ${styles.noAccountBtnRegister}`}
          >
            <Link
              href={PUBLIC_ROUTES.SIGNUP}
              className={`text-white uppercase hover:text-slate-300 duration-300 ${styles.btnGoLogin}`}
            >
              Do you not have an account?
            </Link>
            <button
              className=" bg-gradient-to-br to-[#258aa3] from-[#6a38af] capitalize px-5 py-2 rounded-md
           text-white w-4/12 self-end hover:from-[#6a38af] hover:to-[#6a38af]"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
