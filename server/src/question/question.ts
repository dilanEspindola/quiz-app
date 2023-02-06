import { Question } from "../models";
import { CreateQuestionDto } from "./dtos/create-question.dto";

export interface IQuestion {
  findAllQuestions: () => Promise<Question[]>;
  createQuestion: (questionDto: CreateQuestionDto) => Promise<Question>;
}
