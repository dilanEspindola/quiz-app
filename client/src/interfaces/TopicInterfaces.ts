import { Question } from "./QuestionInterface";

export interface Topic {
  id: number;
  name: string;
  questions: Question[];
}
