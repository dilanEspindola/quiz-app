import { Module } from "@nestjs/common";
import { TypeOrmConfigService } from "./config.service";

@Module({
  imports: [],
  providers: [TypeOrmConfigService],
})
export class ConfigModule {}
