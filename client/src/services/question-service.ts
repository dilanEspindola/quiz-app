import { axiosConfig } from "@/interceptors";
import { Topic } from "@/interfaces/TopicInterfaces";

export const getQuestionByTopic = async (id: number) => {
  const res = await axiosConfig.get<Topic>("api/topics/" + id);
  const questions = res.data.questions;

  const totalElements = questions.length;

  const getRandomQustions = questions.sort(() => 0.5 - Math.random());

  const result = getRandomQustions.slice(0, totalElements);

  return result;
};
