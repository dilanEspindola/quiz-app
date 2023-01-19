import { Injectable } from "@nestjs/common";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { comparePassword } from "src/helpers";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException("USER_NOT_FOUND");
    }
    const getPassw = await comparePassword(password, user.password);
    if (!getPassw) {
      throw new UnauthorizedException("INVALID_PASSWORD");
    }
    return user;
  }
}
