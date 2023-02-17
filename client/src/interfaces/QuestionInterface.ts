import { Topic } from "./TopicInterfaces";

export interface Question {
  id: number;
  questionName: string;
  topics?: Topic[];
}
