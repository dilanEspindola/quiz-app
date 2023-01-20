import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundValidateException extends HttpException {
  constructor() {
    super("USER_NOT_FOUND", HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidPasswordException extends HttpException {
  constructor() {
    super("INVALID_PASSWORD", HttpStatus.UNAUTHORIZED);
  }
}
