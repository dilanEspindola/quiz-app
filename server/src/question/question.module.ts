import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnswerService } from "src/answer/answer.service";
import { Answer, Question, Topic } from "src/models";
import { TopicService } from "src/topic/topic.service";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";

@Module({
  imports: [TypeOrmModule.forFeature([Question, Topic, Answer])],
  controllers: [QuestionController],
  providers: [QuestionService, TopicService, AnswerService],
})
export class QuestionModule {}
