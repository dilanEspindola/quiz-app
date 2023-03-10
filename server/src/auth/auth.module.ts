import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/models";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { SerializerSession, LocalStrategy } from "./helpers";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    CloudinaryService,
    LocalStrategy,
    SerializerSession,
  ],
})
export class AuthModule {}
