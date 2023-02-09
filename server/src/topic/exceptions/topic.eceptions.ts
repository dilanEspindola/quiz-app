import { HttpException, HttpStatus } from "@nestjs/common";

export class TopicNotFoundException extends HttpException {
  constructor() {
    super("TOPIC_NOT_FOUND", HttpStatus.NOT_FOUND);
  }
}
