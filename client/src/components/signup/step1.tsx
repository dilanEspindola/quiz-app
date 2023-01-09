import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { ButtonStep } from "../buttons";

interface RegisterFormData {
  username: string;
  email: string;
  photo: any;
}

interface Props {
  changeNextStep: () => void;
}

export const StepData = ({ changeNextStep }: Props) => {
  const [data, setData] = useState<RegisterFormData>({
    email: "",
    username: "",
    photo: null,
  });
  const [file, setFile] = useState<any>();

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handleFile = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files?.length !== 0) {
      setFile(URL.createObjectURL(evt.target.files![0]) as any);
    }
  };

  const handleData = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(data);
  };

  return (
    <form className="mt-10 flex flex-col" onChange={handleData}>
      <div className="flex justify-between mb-3">
        <div className="flex gap-3 items-center">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="bg-transparent border-2"
            id="username"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3 items-center">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            className="bg-transparent border-2"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="image" className="mr-5">
          Choose an image
        </label>
        <input type="file" id="image" name="photo" onChange={handleFile} />
        {file && (
          <div className="w-full flex justify-center mt-10">
            <Image src={file} width={300} height={350} alt="image" />
          </div>
        )}
      </div>
      <ButtonStep
        position="self-end"
        changeStateValue={changeNextStep}
        text={"next"}
      />
    </form>
  );
};
