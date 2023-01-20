import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Put,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "src/models";
import { UserService } from "./user.service";
import { UserNotFoundException } from "./exceptions";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("")
  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userService.findUsers();
      return users;
    } catch (error) {
      throw new HttpException(
        "something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("user/:id")
  async getUser(@Param("id", ParseIntPipe) id: number) {
    const user = await this.userService.findUserById(id);

    if (!user) throw new UserNotFoundException();

    delete user.password;

    return user;
  }

  @Put("user/:id")
  @UseInterceptors(FileInterceptor("photo"))
  async editUserImage(@UploadedFile() photo: Express.Multer.File) {}
}
