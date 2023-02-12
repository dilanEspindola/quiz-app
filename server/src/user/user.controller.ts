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
  Query,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "src/models";
import { UserService } from "./user.service";
import { UserNotFoundException } from "./exceptions";
import { AuthenticateGuard } from "src/auth/helpers/authenticate.guard";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("")
  // @UseGuards(AuthenticateGuard)
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

  @Get("user")
  async getUserByUsername(@Query("username") username: string) {
    const user = await this.userService.findUserByUsername(username);

    if (!user) throw new UserNotFoundException();

    delete user.password;

    return user;
  }

  @Put("user/:id")
  @UseInterceptors(FileInterceptor("photo"))
  async editUserImage(
    @UploadedFile() photo: Express.Multer.File,
    @Param("id", ParseIntPipe) id: number,
  ) {
    await this.userService.updateUserProfilePhoto(id, photo);

    return {
      message: "PHOTO_UPDATED",
    };
  }
}
