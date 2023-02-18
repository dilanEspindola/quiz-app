import { HttpException, HttpStatus } from "@nestjs/common";

export class AnswerNotFound extends HttpException {
  constructor() {
    super("ANSWER_NOT_FOUND", HttpStatus.NOT_FOUND);
  }
}
