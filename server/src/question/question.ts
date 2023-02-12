import { Question } from "../models";
import { CreateQuestionDto } from "./dtos/create-question.dto";
import { EditQuestionDto } from "./dtos/edit-question.dto";

export interface IQuestion {
  findAllQuestions: () => Promise<Question[]>;
  findQuestionById: (id: number) => Promise<Question>;
  createQuestion: (questionDto: CreateQuestionDto) => Promise<Question>;
  editQuestion: (id: number, questionDto: EditQuestionDto) => Promise<Question>;
  deleteQuestionById: (id: number) => Promise<string>;
  deleteAllQuestions: () => Promise<string>;
}
