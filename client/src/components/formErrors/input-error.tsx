interface Props {
  messageError: string;
}

export const InputError = ({ messageError }: Props) => {
  return <span className="text-white bg-red-500 px-2">{messageError}</span>;
};
