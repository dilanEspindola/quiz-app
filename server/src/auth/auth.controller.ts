import {
  Body,
  Controller,
  Post,
  Res,
  HttpException,
  BadRequestException,
  NotFoundException,
  HttpStatus,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { CreateUserDto, LoginDto } from "./dto";
import { AuthService } from "./auth.service";
import { TypeORMError } from "typeorm";
import { validationError, comparePassword, createToken } from "src/helpers";

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

  @Post("login")
  async login(@Body(ValidationPipe) loginData: LoginDto, @Res() res: Response) {
    try {
      const user = await this.authService.findUser(loginData.username);

      if (!user) throw new NotFoundException("USER_NOT_FOUND");

      const isValidPassword = await comparePassword(
        loginData.password,
        user.password,
      );

      if (!isValidPassword) throw new BadRequestException("INVALID_PASSWORD");

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      const token = createToken(payload);

      return res.status(HttpStatus.OK).json({ user, token });
    } catch (error) {
      console.log(error);
    }
  }
}
