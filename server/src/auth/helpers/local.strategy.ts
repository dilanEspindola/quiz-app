import { Injectable } from "@nestjs/common";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { comparePassword } from "src/helpers";
import {
  UserNotFoundValidateException,
  InvalidPasswordException,
} from "../exceptions";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UserNotFoundValidateException();
    }
    const getPassw = await comparePassword(password, user.password);
    if (!getPassw) {
      throw new InvalidPasswordException();
    }
    return user;
  }
}
