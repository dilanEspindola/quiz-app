import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { verifyToken, validationError } from "src/helpers";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const req = context.switchToHttp().getRequest<Request>();

      const token = req.headers.authorization?.split(" ").pop();
      // const token = req.cookies?.token;

      const tokenVerified = verifyToken(token);

      const user = await this.userService.findUserByUsername(
        tokenVerified.username,
      );

      if (!user) return false;

      return true;
    } catch (error) {
      const errorMessage = validationError(error.message);
      throw new UnauthorizedException(errorMessage);
    }
  }
}
