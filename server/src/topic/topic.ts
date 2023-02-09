import { Topic } from "src/models";
import { UpdateTopicDto, CreateTopicDto } from "./dtos";

export interface ITopic {
  findAllTopics: () => Promise<Topic[]>;
  findTopicsByNames: (names: string[]) => Promise<Topic[]>;
  createTopic: (craeteTopicDto: CreateTopicDto) => Promise<Topic>;
  updateTopicById: (
    id: number,
    updateTopicDto: UpdateTopicDto,
  ) => Promise<Topic>;
  deleteTopicById: (id: number) => Promise<string | null>;
  deleteAllTopics: () => Promise<string>;
}
