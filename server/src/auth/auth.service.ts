import { Injectable } from "@nestjs/common";
import { User } from "src/models";
import { CreateUserDto } from "./dto";
import { UserService } from "src/user/user.service";
import { IAuth } from "./auth";

@Injectable()
export class AuthService implements IAuth {
  constructor(private userService: UserService) {}

  async registerUser(userDetails: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(userDetails);
    return user;
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findUserByUsername(username);

    return user;
  }
}
