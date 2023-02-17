import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Answer } from "src/models";
import { Repository } from "typeorm";
import { IAnswer } from "./answer";
import { CreateAnswerDto } from "./dtos";
import { QuestionService } from "src/question/question.service";
import { QuestionNotFoundException } from "src/question/exceptions/question.exceptiions";

@Injectable()
export class AnswerService implements IAnswer {
  constructor(
    @InjectRepository(Answer) private answerRepository: Repository<Answer>,
    private questionService: QuestionService,
  ) {}

  async findAllAnswers(): Promise<Answer[]> {
    const answers = await this.answerRepository.find({
      relations: { question: true },
    });
    return answers;
  }

  findAnswerById(id: number): Promise<Answer> {
    throw new Error("");
  }

  async createAnswer(createAnswer: CreateAnswerDto): Promise<Answer> {
    const question = await this.questionService.findQuestionById(
      createAnswer.questionId,
    );

    if (!question) throw new QuestionNotFoundException();

    if (question.answer.length === 4)
      throw new ForbiddenException(
        "You cannot add more answer to this question",
      );

    const answer = this.answerRepository.create({
      answerName: createAnswer.answerName,
      question: question,
    });

    return await this.answerRepository.save(answer);
  }

  async deleteAnswerById(id: number): Promise<string> {
    const question = await this.answerRepository.delete(id);
    if (question.affected === 0) return null;

    return "QUESTION_DELETED";
  }
}
