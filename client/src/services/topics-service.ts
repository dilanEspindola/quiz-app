import { axiosConfig } from "@/interceptors";
import { Topic } from "@/interfaces/TopicInterfaces";

export const getTopics = async (): Promise<Topic[]> => {
  const response = await axiosConfig.get<Topic[]>("api/topics");
  const topics = response.data;
  return topics;
};
