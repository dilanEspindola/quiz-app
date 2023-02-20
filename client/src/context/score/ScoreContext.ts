import { createContext } from "react";

export interface IScoreContext {
  score: number;
  addPoint: () => void;
  restPoint: () => void;
}

export const ScoreContext = createContext<IScoreContext>({} as IScoreContext);
