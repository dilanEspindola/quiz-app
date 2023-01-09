interface Props {
  position: "self-start" | "self-end" | "self-center";
  changeStateValue: () => void;
  text: string;
}

export const ButtonStep = ({ position, changeStateValue, text }: Props) => {
  return (
    <button
      className={`${position} bg-teal-700 capitalize mt-10 px-5 py-2 rounded-md hover:bg-teal-600
      duration-200`}
      onClick={changeStateValue}
    >
      {text}
    </button>
  );
};
