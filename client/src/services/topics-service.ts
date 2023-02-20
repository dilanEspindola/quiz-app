import { axiosConfig } from "@/interceptors";
import { Topic } from "@/interfaces/TopicInterfaces";

export const getTopics = async (): Promise<Topic[]> => {
  const response = await axiosConfig.get<Topic[]>("api/topics");
  const topics = response.data;
  return topics;
};

export const getTopic = async (id: number): Promise<Topic> => {
  const res = await axiosConfig.get<Topic>("api/topics/" + id);
  const topic = res.data;
  return topic;
};
