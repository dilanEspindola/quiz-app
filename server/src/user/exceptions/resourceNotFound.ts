import { HttpException, HttpStatus } from "@nestjs/common";

export class ResourceNotFound extends HttpException {
  constructor() {
    super("RESOURCE_NOT_FOUND", HttpStatus.NOT_FOUND);
  }
}
