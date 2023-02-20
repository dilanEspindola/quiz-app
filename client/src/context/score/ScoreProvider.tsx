import { useContext, useState } from "react";
import { ScoreContext, IScoreContext } from "./ScoreContext";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ScoreProvider = ({ children }: Props) => {
  const [score, setScore] = useState(0);

  const addPoint = (): void => {
    setScore((prev) => prev + 10);
  };

  const restPoint = (): void => {
    if (score === 0) return;
    setScore((prev) => prev - 10);
  };

  return (
    <ScoreContext.Provider value={{ score: score, addPoint, restPoint }}>
      {children}
    </ScoreContext.Provider>
  );
};
