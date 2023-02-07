import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question, Topic } from "src/models";
import { TopicService } from "src/topic/topic.service";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";

@Module({
  imports: [TypeOrmModule.forFeature([Question, Topic])],
  controllers: [QuestionController],
  providers: [QuestionService, TopicService],
})
export class QuestionModule {}
