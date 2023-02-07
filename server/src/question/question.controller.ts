import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { CreateQuestionDto } from "./dtos/create-question.dto";
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
}
