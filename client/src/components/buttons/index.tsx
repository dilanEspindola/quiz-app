interface Props {
  position: "self-start" | "self-end" | "self-center";
  changeStateValue: () => void;
  text: string;
  isdisabled?: boolean;
}

export const ButtonStep = ({
  position,
  changeStateValue,
  text,
  isdisabled,
}: Props) => {
  return (
    <button
      className={`${position} bg-teal-700 capitalize mt-10 px-5 py-2 rounded-md hover:bg-teal-600
      duration-200`}
      onClick={changeStateValue}
      disabled={isdisabled}
    >
      {text}
    </button>
  );
};
