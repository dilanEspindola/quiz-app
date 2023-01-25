import { useState, ChangeEvent, useEffect } from "react";
import { AiOutlineUser, AiOutlineCamera } from "react-icons/ai";
import { User } from "@/interfaces";
import Image from "next/image";

import styles from "./profile.module.css";

interface Props {
  user: User;
}

export const Profile = ({ user }: Props) => {
  const [showFile, setShowFile] = useState<string>();

  const onFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files?.length !== 0) {
      setShowFile(URL.createObjectURL(evt.target.files![0]) as string);
    }
  };

  const handleShowImage = (): string => {
    return (user.photo as string) ?? showFile;
  };

  return (
    <div className="bg-white h-[450px] w-10/12 self-end p-5 rounded-tl-[30px] relative">
      {handleShowImage() ? (
        <div className={styles.imageContainer}>
          <Image
            src={handleShowImage()}
            alt="image"
            width={100}
            height={500}
            className={`h-full ${styles.image}`}
          />
          <label htmlFor="file" className={styles.cameraIconWithImage}>
            <AiOutlineCamera />
          </label>
        </div>
      ) : (
        <div className={styles.iconContainer}>
          <AiOutlineUser
            className={`text-[80px] p-2 w-[90px] h-[90px] top-[-40px] left-[30px]
            bg-gray-400 rounded-full text-white ${styles.noPhoto}`}
          />
          <label htmlFor="file" className={styles.cameraIcon}>
            <AiOutlineCamera />
          </label>
        </div>
      )}
      <div className="h-full flex flex-col pt-7">
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={onFileChange}
        />
        <h1 className="text-slate-900 text-lg">{user.username}</h1>
        <div className="mt-20">
          <h2 className="text-3xl text-black mb-5">Stats</h2>
          <span className="text-lg text-slate-500">Score: 154564</span>
        </div>
      </div>
    </div>
  );
};
