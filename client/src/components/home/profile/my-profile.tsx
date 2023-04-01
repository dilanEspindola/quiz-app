import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { AiOutlineUser, AiOutlineCamera } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/interfaces";
import { updatePhotoUseProfile } from "@/services";
import { ModalEditProfile } from "./modal-edit-profile";
import { MiniLoader } from "@/components/loaders";

import styles from "./profile.module.css";

interface Props {
  user: User;
}

export const Profile = ({ user }: Props) => {
  const [showFile, setShowFile] = useState<string>();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["updateUserProfilePhoto"],
    mutationFn: updatePhotoUseProfile,
    onSuccess: () => {
      // invalid queries allows to load new the data when something has changed... in this case the data of user
      queryClient.invalidateQueries(["user"]);
    },
  });

  const onFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files?.length !== 0) {
      setShowFile(URL.createObjectURL(evt.target.files![0]) as string);
      mutate(evt.target.files![0]);
    }
  };

  const handleShowImage = (): string => {
    return (user.photo as string) ?? showFile;
  };

  return (
    <div className="bg-componentPages 800 h-[450px] w-10/12 self-end rounded-tl-[30px] relative">
      {handleShowImage() ? (
        <div className={`${styles.imageContainer} cursor-pointer`}>
          <Image
            src={handleShowImage()}
            alt="image"
            width={100}
            height={500}
            className={`h-full ${styles.image}`}
          />
          {isLoading && <MiniLoader />}
          <label htmlFor="file" className={styles.cameraIconWithImage}>
            <AiOutlineCamera />
          </label>
        </div>
      ) : (
        <div className={`${styles.iconContainer} cursor-pointer`}>
          <AiOutlineUser
            className={`text-[80px] p-2 w-[90px] h-[90px] top-[-40px] left-[30px]
            bg-gray-400 rounded-full text-white ${styles.noPhoto}`}
          />
          {isLoading && <MiniLoader />}
          <label htmlFor="file" className={styles.cameraIcon}>
            <AiOutlineCamera />
          </label>
        </div>
      )}
      <div className="h-full flex flex-col pl-[30px] py-5">
        <label
          htmlFor="my-modal"
          className="btn self-end mr-16 border-2 border-green-300 px-5 py-2
          text-green-300 rounded-md hover:bg-green-500 hover:border-green-500
          hover:text-white transition-all ease-out duration-300"
        >
          Edit profile
        </label>
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={onFileChange}
        />
        <div className="w-4/12 flex flex-col gap-16">
          <h1 className="text-slate-100 text-lg ml-5">{user.username}</h1>
          <div className="">
            <h2 className="text-3xl text-slate-300 mb-5">Stats</h2>
            <span className="text-lg text-slate-500">Score: {user.score}</span>
          </div>
        </div>
      </div>
      <ModalEditProfile user={user} />
    </div>
  );
};
