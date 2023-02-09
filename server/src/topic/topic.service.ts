import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Topic } from "src/models";
import { ITopic } from "./topic";
import { CreateTopicDto, UpdateTopicDto } from "./dtos";
import { TopicNotFoundException } from "./exceptions/topic.eceptions";

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

  async updateTopicById(id: number, updateTopicDto: UpdateTopicDto) {
    const topic = await this.topicRepostory.findOneBy({ id });

    if (!topic) throw new TopicNotFoundException();

    return this.topicRepostory.save({ ...topic, name: updateTopicDto.name });
  }

  async deleteTopicById(id: number) {
    const topic = await this.topicRepostory.delete(id);

    if (topic.affected === 0) return null;

    return "topic not found";
  }

  async deleteAllTopics() {
    const topics = await this.topicRepostory.find();
    await this.topicRepostory.remove(topics);
    return "TOPICS_DELETED";
  }
}
