import { useState, ChangeEvent } from "react";

type InputType = "text" | "password";

export const useChangeInputType = () => {
  const [changeInputType, setChangeInputType] = useState<InputType>("password");

  const onChangeInputType = ({ target }: ChangeEvent<HTMLInputElement>) => {
    target.checked
      ? setChangeInputType("text")
      : setChangeInputType("password");
  };

  return { changeInputType, onChangeInputType };
};
