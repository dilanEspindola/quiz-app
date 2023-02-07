import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "src/models";
import { CreateQuestionDto } from "./dtos/create-question.dto";
import { IQuestion } from "./question";
import { TopicService } from "src/topic/topic.service";

@Injectable()
export class QuestionService implements IQuestion {
  constructor(
    @InjectRepository(Question)
    private questionRespository: Repository<Question>,
    private topicService: TopicService,
  ) {}

  async findAllQuestions(): Promise<Question[]> {
    const questions = await this.questionRespository.find({
      relations: { topics: true },
    });

    return questions;
  }

  async createQuestion(questionDto: CreateQuestionDto): Promise<Question> {
    const topics = await this.topicService.findTopicsByNames(
      questionDto.topics,
    );

    const question = this.questionRespository.create({
      questionName: questionDto.name,
      topics: topics,
    });
    return await this.questionRespository.save(question);
  }
}
