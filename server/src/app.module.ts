import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { UserModule } from "./user/user.module";
import {
  ConfigModule as ConfigModuleDb,
  TypeOrmConfigService,
  configEnv,
} from "./config/";
import { AuthModule } from "./auth/auth.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { GuardModule } from "./guard/guard.module";

@Module({
  imports: [
    ConfigModuleDb,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.prod", ".env.local", ".env"],
      load: [configEnv],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    CloudinaryModule,
    GuardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
