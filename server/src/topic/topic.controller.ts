import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { CreateTopicDto } from "./dtos/create-topic.dto";
import { TopicService } from "./topic.service";

@Controller("topics")
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  async getTopics() {
    const topics = await this.topicService.findAllTopics();

    return topics;
  }

  @Post()
  async createTopic(@Body(ValidationPipe) createTopic: CreateTopicDto) {
    const topic = await this.topicService.createTopic(createTopic);

    return {
      message: "TOPIC_CREATED",
      topic,
    };
  }
}
