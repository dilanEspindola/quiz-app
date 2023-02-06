import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question, Topic } from "src/models";
import { Repository } from "typeorm";
import { CreateQuestionDto } from "./dtos/create-question.dto";
import { IQuestion } from "./question";

@Injectable()
export class QuestionService implements IQuestion {
  constructor(
    @InjectRepository(Question)
    private questionRespository: Repository<Question>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
  ) {}

  async findAllQuestions(): Promise<Array<Question>> {
    const questions = await this.questionRespository.find({
      relations: { topics: true },
    });
    return questions;
  }

  async createQuestion(questionDto: CreateQuestionDto): Promise<Question> {
    const topic = await this.topicRepository.findOneBy({
      name: questionDto.topic,
    });

    if (!topic) throw new NotFoundException("Topic not found");

    const question = await this.questionRespository.create({
      questionName: questionDto.name,
      topics: [topic],
    });
    return await this.questionRespository.save(question);
  }
}
