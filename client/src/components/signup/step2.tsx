import { ButtonStep } from "../buttons";

interface Props {
  changePrevStep: () => void;
}

export const StepPassword = ({ changePrevStep }: Props) => {
  return (
    <form action="" className="mt-10 flex flex-col gap-5">
      <div className="flex gap-3 items-center w-full">
        <label htmlFor="" className="w-3/12">
          Password:
        </label>
        <input type="password" className="bg-transparent border-2 w-full" />
      </div>
      <div className="flex gap-3 items-center">
        <label htmlFor="" className="w-3/12">
          Repeat Password:
        </label>
        <input type="password" className="bg-transparent border-2 w-full" />
      </div>
      <div className="relative">
        <ButtonStep
          position="self-start"
          changeStateValue={changePrevStep}
          text={"previous"}
        />
        <button
          className="absolute right-0 bg-sky-700 mt-10 px-5 py-2 rounded-md hover:bg-sky-600
        duration-200"
        >
          Finish
        </button>
      </div>
    </form>
  );
};
