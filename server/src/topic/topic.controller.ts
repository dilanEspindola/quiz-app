import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
  UsePipes,
} from "@nestjs/common";
import { CreateTopicDto, UpdateTopicDto } from "./dtos";
import { TopicNotFoundException } from "./exceptions/topic.eceptions";
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
  @UsePipes(new ValidationPipe())
  async createTopic(@Body(ValidationPipe) createTopic: CreateTopicDto) {
    const topic = await this.topicService.createTopic(createTopic);

    return {
      message: "TOPIC_CREATED",
      topic,
    };
  }

  @Put(":id")
  @UsePipes(new ValidationPipe())
  async updateTopic(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdateTopicDto,
  ) {
    const topic = await this.topicService.updateTopicById(id, data);
    return topic;
  }

  @Delete(":id")
  async deleteTopic(@Param("id", ParseIntPipe) id: number) {
    const isTopicDeleted = await this.topicService.deleteTopicById(id);

    if (!isTopicDeleted) throw new TopicNotFoundException();

    return "TOPIC_DELETED";
  }

  @Delete("")
  async deleteAll() {
    const topicsDeletd = await this.topicService.deleteAllTopics();

    return topicsDeletd;
  }
}
