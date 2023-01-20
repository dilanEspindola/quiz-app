import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  HttpException,
  HttpStatus,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { CreateUserDto } from "./dto";
import { AuthService } from "./auth.service";
import { TypeORMError } from "typeorm";
import { validationError, createToken } from "src/helpers";
import { User } from "src/models";
import { LocalGuard } from "./helpers";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async registerUser(
    @Body(ValidationPipe) userData: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      await this.authService.registerUser(userData);

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
  @UseGuards(LocalGuard)
  async login(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    user.password = null;

    const payload = { id: user.id, username: user.username, email: user.email };
    const token = createToken(payload);

    res.cookie("token", token, {
      secure: true,
    });
    res.status(HttpStatus.OK).json({ user });
  }

  @Get("logout")
  logout(@Req() req: Request) {
    req.session.destroy((err) => console.log(err));

    return {
      message: "ok",
    };
  }
}
