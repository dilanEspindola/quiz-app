import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { CreateQuestionDto } from "./dtos/create-question.dto";
import {
  QuestionNotFoundException,
  InvalidInputException,
} from "./exceptions/question.exceptiions";
import { QuestionService } from "./question.service";

@Controller("questions")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getQuestions() {
    const questions = await this.questionService.findAllQuestions();

    return questions;
  }

  @Post()
  async createQuestion(
    @Body(ValidationPipe) createQuestion: CreateQuestionDto,
  ) {
    const question = await this.questionService.createQuestion(createQuestion);

    return question;
  }

  @Delete(":id")
  async deleteQuestion(@Param("id", ParseIntPipe) id: number) {
    if (typeof id === "string") throw new InvalidInputException();

    const isQuestionDeleted = await this.questionService.deleteQuestionById(id);

    if (!isQuestionDeleted) throw new QuestionNotFoundException();

    return "QUESTION_DELETED";
  }

  @Delete()
  async deleteAllQuestions() {
    try {
      const questionsDeleted = await this.questionService.deleteAllQuestions();
      return questionsDeleted;
    } catch (error) {
      throw new HttpException(
        "Oops something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
