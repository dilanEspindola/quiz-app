import { Module } from "@nestjs/common";
import { LeadboardController } from "./leadboard.controller";
import { LeadboardService } from "./leadboard.service";

@Module({
  controllers: [LeadboardController],
  providers: [LeadboardService],
})
export class LeadboardModule {}
