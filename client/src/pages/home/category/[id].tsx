import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { axiosConfig } from "@/interceptors";
import { Topic } from "@/interfaces/TopicInterfaces";
import { AuthGuard } from "@/guards";
import { Sidebar } from "@/components/sidebar";
import { getQuestionByTopic } from "@/services";

const Category = ({
  topic,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const runQuestion = async () => {
    const questions = await getQuestionByTopic(topic.id);
    router.push(`/home/question/${questions[0].id}`);
  };

  return (
    <AuthGuard>
      <div className="bg-background min-h-screen flex">
        <Sidebar />
        <div className="flex flex-col gap-5 items-center justify-center h-screen w-10/12">
          <h1 className="text-lg text-white">
            These questions will be about {topic.name}
          </h1>
          <button
            onClick={runQuestion}
            className="uppercase bg-gradient-to-r from-[#790ca4] to-[#D73AFE] px-10 py-3 rounded-full
          text-white text-lg active:scale-[0.95] duration-200"
          >
            start
          </button>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axiosConfig.get<Topic[]>("/api/topics");
  const topics = response.data;

  const paths = topics.map((topic) => ({
    params: { id: topic.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ topic: Topic }> = async (ctx) => {
  const { params } = ctx;
  const res = await axiosConfig.get<Topic>(`/api/topics/${params?.id}`);
  const topic = res.data;

  return {
    props: { topic },
  };
};
