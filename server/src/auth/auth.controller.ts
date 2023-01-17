import {
  Body,
  Controller,
  Post,
  Res,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import { CreateUserDto } from "./dto";
import { AuthService } from "./auth.service";
import { TypeORMError } from "typeorm";
import { validationError } from "src/helpers";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async registerUser(
    @Body(ValidationPipe) userData: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      await this.authService.createUser(userData);

      return res.status(HttpStatus.OK).json({ message: "USER_CREATED" });
    } catch (error) {
      if (error instanceof TypeORMError) {
        const errorName = validationError(error.message);
        throw new HttpException(errorName, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      throw new HttpException(
        "INTERNAL_SERVER_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
