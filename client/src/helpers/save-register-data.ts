import { IUserRegister } from "@/interfaces";

export const saveUserInfo = (data?: IUserRegister, image?: string) => {
  if (image?.length! > 0) {
    data!.photo = image;
  }
  console.log(data);
};
