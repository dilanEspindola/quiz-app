import { FormEvent } from "react";
import { User } from "@/interfaces";

interface Props {
  user: User;
}

export const ModalEditProfile = ({ user }: Props) => {
  const editProfileData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-xl bg-background px-10 p-20">
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form
            action=""
            className="flex flex-col gap-6"
            onSubmit={editProfileData}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-white">
                Username
              </label>
              <input
                placeholder="username"
                type="text"
                defaultValue={user?.username}
                className="bg-transparent border-2 border-black p-2 rounded-md focus:border-slate-600
                outline-none duration-200"
              />
            </div>
            <div className="input-edit-profile">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="email"
                defaultValue={user?.email}
                className="bg-transparent border-2 border-black p-2 rounded-md focus:border-slate-600
                outline-none duration-200"
              />
            </div>
            <button
              className="btn border-2 border-green-300 px-5 py-2
          text-green-300 rounded-md hover:bg-green-500 hover:border-green-500
          hover:text-white transition-all ease-out duration-300 w-3/12 self-end"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
