import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Put,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "src/models";
import { UserService } from "./user.service";

@Controller("api")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("users")
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

  @Put("user/:id")
  @UseInterceptors(FileInterceptor("photo"))
  async editUserImage(@UploadedFile() photo: Express.Multer.File) {}
}
