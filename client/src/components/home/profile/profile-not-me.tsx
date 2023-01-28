import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { AiOutlineUser, AiOutlineCamera } from "react-icons/ai";
import { User } from "@/interfaces";
import { ModalEditProfile } from "./modal-edit-profile";

import styles from "./profile.module.css";

interface Props {
  user: User;
}

export const NotMyProfile = ({ user }: Props) => {
  const [showFile, setShowFile] = useState<string>();

  const handleShowImage = (): string => {
    return (user.photo as string) ?? showFile;
  };

  return (
    <div className="bg-componentPages 800 h-[450px] w-10/12 self-end rounded-tl-[30px] relative">
      {handleShowImage() ? (
        <div className={styles.imageContainer}>
          <Image
            src={handleShowImage()}
            alt="image"
            width={100}
            height={500}
            className={`h-full ${styles.image}`}
          />
        </div>
      ) : (
        <div className={`${styles.iconContainer}`}>
          <AiOutlineUser
            className={`text-[80px] p-2 w-[90px] h-[90px] top-[-40px] left-[30px]
            bg-gray-400 rounded-full text-white ${styles.noPhoto}`}
          />
        </div>
      )}
      <div className="h-full flex flex-col pl-[30px] py-16">
        <div className="w-4/12 flex flex-col gap-16">
          <h1 className="text-slate-100 text-lg ml-5">{user.username}</h1>
          <div className="">
            <h2 className="text-3xl text-slate-300 mb-5">Stats</h2>
            <span className="text-lg text-slate-500">Score: 154564</span>
          </div>
        </div>
        <ModalEditProfile />
      </div>
    </div>
  );
};
