import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Delete,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
  NotFoundException,
} from "@nestjs/common";
import { AnswerPipe } from "./answer.pipe";
import { AnswerService } from "./answer.service";
import { CreateAnswerDto } from "./dtos";

@Controller("answers")
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Get()
  async getAnswers() {
    try {
      const answers = await this.answerService.findAllAnswers();

      return answers;
    } catch (error) {
      throw new HttpException(
        "Oops something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createAnswer(@Body(AnswerPipe) createAnswer: CreateAnswerDto) {
    const answer = await this.answerService.createAnswer(createAnswer);

    return answer;
  }

  @Delete(":id")
  async deleteAnswer(@Param("id", ParseIntPipe) id: number) {
    const answer = await this.answerService.deleteAnswerById(id);

    if (!answer) throw new NotFoundException("ANSWER_NOT_FOUND");

    return answer;
  }
}
