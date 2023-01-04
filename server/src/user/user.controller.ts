import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
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
}
