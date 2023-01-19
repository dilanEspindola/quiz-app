import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/models";
import { UserService } from "src/user/user.service";

@Injectable()
export class SerializerSession extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err: any, user: User) => void) {
    console.log("serializer");

    user.password = null;

    return done(null, user);
  }

  async deserializeUser(payload: User, done: (err: any, user: User) => void) {
    const user = await this.userService.findUserById(payload.id);

    return user ? done(null, user) : done(null, null);
  }
}
