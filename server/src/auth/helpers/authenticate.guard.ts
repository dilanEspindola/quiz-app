import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { verifyToken, validationError } from "src/helpers";

@Injectable()
export class AuthenticateGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const req = context.switchToHttp().getRequest<Request>();
      const token = req.cookies.token;

      verifyToken(token);

      return req.isAuthenticated();
    } catch (error) {
      const errorMesage = validationError(error.message);
      throw new UnauthorizedException(errorMesage);
    }
  }
}
