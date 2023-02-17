import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Answer, Question, Topic } from "src/models";
import { QuestionService } from "src/question/question.service";
import { TopicService } from "src/topic/topic.service";
import { AnswerController } from "./answer.controller";
import { AnswerService } from "./answer.service";

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Question, Topic])],
  controllers: [AnswerController],
  providers: [AnswerService, QuestionService, TopicService],
})
export class AnswerModule {}
