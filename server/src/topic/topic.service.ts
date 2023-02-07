import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Topic } from "src/models";
import { ITopic } from "./topic";
import { CreateTopicDto } from "./dtos/create-topic.dto";

@Injectable()
export class TopicService implements ITopic {
  constructor(
    @InjectRepository(Topic) private topicRepostory: Repository<Topic>,
  ) {}

  async findAllTopics(): Promise<Topic[]> {
    const topics = await this.topicRepostory.find({
      relations: { questions: true },
    });

    return topics;
  }

  async findTopicsByNames(names: string[]): Promise<Topic[]> {
    const topics = await this.topicRepostory
      .createQueryBuilder("topic")
      .where("topic.name in (:...names)", { names })
      .getMany();

    if (topics.length === 0) throw new NotFoundException("Topics not found");

    return topics;
  }

  async createTopic(craeteTopicDto: CreateTopicDto): Promise<Topic> {
    const topic = await this.topicRepostory.create({
      name: craeteTopicDto.name,
    });

    return await this.topicRepostory.save(topic);
  }
}
