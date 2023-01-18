import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  HttpException,
  BadRequestException,
  NotFoundException,
  HttpStatus,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { CreateUserDto, LoginDto } from "./dto";
import { AuthService } from "./auth.service";
import { TypeORMError } from "typeorm";
import { validationError, comparePassword, createToken } from "src/helpers";
import { AuthGuard } from "src/guard/auth.guard";

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
  async login(
    @Body(ValidationPipe) loginData: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
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

    user.password = null;

    const token = createToken(payload);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax", //permite conectar entre dominios distintos
      secure: true, //https
      maxAge: 86400000, // 1 day
    });
    res.status(HttpStatus.OK).json({ user, token });
  }

  @Get("logout")
  @UseGuards(AuthGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    if (req.cookies.token) {
      res.clearCookie("token");
      res.json({ messeage: "logout" });
    }
  }
}
