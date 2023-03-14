import { Answer } from "@/interfaces/AnswerInterface";

export const genRandomAnswers = (answer: Answer[]) => {
  const answers = answer.sort(() => 0.5 - Math.random());
  return answers;
};
