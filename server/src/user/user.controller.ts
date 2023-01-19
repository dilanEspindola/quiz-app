import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Put,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "src/models";
import { UserService } from "./user.service";
import { AuthGuard } from "src/guard/auth.guard";
import { AuthenticateGuard } from "src/auth/helpers";

@Controller("api")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("users")
  @UseGuards(AuthenticateGuard)
  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userService.findUsers();
      return users;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "INTERNAL_SERVER_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("user/:id")
  async getUser(@Param("id", ParseIntPipe) id: number) {
    try {
      const user = await this.userService.findUserById(id);

      return user;
    } catch (error) {
      console.log(error.message);

      throw new HttpException("ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("user/:id")
  @UseInterceptors(FileInterceptor("photo"))
  async editUserImage(@UploadedFile() photo: Express.Multer.File) {}
}
