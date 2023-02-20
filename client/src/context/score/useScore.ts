import { useContext } from "react";
import { ScoreContext } from "./ScoreContext";

export const useScore = () => {
  const { score, addPoint, restPoint } = useContext(ScoreContext);

  return { score, addPoint, restPoint };
};
