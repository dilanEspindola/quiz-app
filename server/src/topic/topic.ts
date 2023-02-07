import { Topic } from "src/models";
import { CreateTopicDto } from "./dtos/create-topic.dto";

export interface ITopic {
  findAllTopics: () => Promise<Topic[]>;
  findTopicsByNames: (names: string[]) => Promise<Topic[]>;
  createTopic: (craeteTopicDto: CreateTopicDto) => Promise<Topic>;
}
