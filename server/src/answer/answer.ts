import { Answer } from "src/models";
import { CreateAnswerDto } from "./dtos";

export interface IAnswer {
  findAllAnswers: () => Promise<Answer[]>;
  findAnswerById: (id: number) => Promise<Answer>;
  createAnswer: (createAnswer: CreateAnswerDto) => Promise<Answer>;
  deleteAnswerById: (id: number) => Promise<string>;
}
