import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/models";
import { UserService } from "src/user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
})
export class GuardModule {}
