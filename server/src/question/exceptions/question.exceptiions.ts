import { HttpException, HttpStatus } from "@nestjs/common";

export class QuestionNotFoundException extends HttpException {
  constructor() {
    super("QUESTION_NOT_FOUND", HttpStatus.NOT_FOUND);
  }
}

export class InvalidInputException extends HttpException {
  constructor() {
    super("INVALID_INPUT", HttpStatus.BAD_REQUEST);
  }
}
