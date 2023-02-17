import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "src/models";
import { CreateQuestionDto } from "./dtos/create-question.dto";
import { IQuestion } from "./question";
import { TopicService } from "src/topic/topic.service";
import { QuestionNotFoundException } from "./exceptions/question.exceptiions";
import { EditQuestionDto } from "./dtos/edit-question.dto";

@Injectable()
export class QuestionService implements IQuestion {
  constructor(
    @InjectRepository(Question)
    private questionRespository: Repository<Question>,
    private topicService: TopicService,
  ) {}

  async findAllQuestions(): Promise<Question[]> {
    const questions = await this.questionRespository.find({
      relations: { topics: true, answer: true },
    });

    return questions;
  }

  async findQuestionById(id: number): Promise<Question> {
    const question = await this.questionRespository.findOne({
      where: { id },
      relations: { topics: true, answer: true },
    });

    if (!question) throw new QuestionNotFoundException();

    return question;
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

  async editQuestion(id: number, questionDto: EditQuestionDto) {
    const question = await this.questionRespository.findOneBy({ id });
    if (!question) throw new QuestionNotFoundException();

    return await this.questionRespository.save({
      ...question,
      questionName: questionDto.questionName ?? question.questionName,
      correctAnswer: questionDto.correctAnswer ?? question.correctAnswer,
    });
  }

  async deleteQuestionById(id: number): Promise<string | null> {
    const question = await this.questionRespository.delete(id);
    if (question.affected === 0) return null;
    return "question deleted";
  }

  async deleteAllQuestions() {
    const questions = await this.questionRespository.find();
    await this.questionRespository.remove(questions);
    return "QUESTIONS_DELETED";
  }
}
