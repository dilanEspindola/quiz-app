import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { User } from "src/models";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, CloudinaryService],
})
export class UserModule {}
