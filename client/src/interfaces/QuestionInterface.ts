import { Answer } from "./AnswerInterface";
import { Topic } from "./TopicInterfaces";

export interface Question {
  id: number;
  questionName: string;
  correctAnswer: string;
  topics?: Topic[];
  answer: Answer[];
}
