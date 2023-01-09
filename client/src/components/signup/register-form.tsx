import { useState } from "react";
import { StepData } from "./step1";
import { StepPassword } from "./step2";

export const RegisterForm = () => {
  const [nextStep, setNextStep] = useState(false);

  const changeNextStep = () => {
    setNextStep(true);
  };

  const changePrevStep = () => {
    setNextStep(false);
  };

  return (
    <div className="border-2 w-6/12 p-5 flex flex-col">
      <ul className="steps w-full">
        <li className="step step-primary">User Info</li>
        <li className={`step ${nextStep && "step-primary"}`}>Password</li>
      </ul>
      {!nextStep ? (
        <StepData changeNextStep={changeNextStep} />
      ) : (
        <StepPassword changePrevStep={changePrevStep} />
      )}
    </div>
  );
};
