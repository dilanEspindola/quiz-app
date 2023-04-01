import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getQuestionByTopic, getTopics } from "@/services";
import { Sidebar } from "@/components/sidebar";
import { AuthGuard } from "@/guards";
import { Question } from "@/interfaces/QuestionInterface";
import { QuestionList } from "@/components/home/questions";

const Questions = ({
  questions,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <AuthGuard>
      <div className="bg-background min-h-screen flex">
        <Sidebar />
        <QuestionList questions={questions} />
      </div>
    </AuthGuard>
  );
};

export default Questions;

export const getStaticPaths: GetStaticPaths = async () => {
  const topics = await getTopics();

  const paths = topics.map((topic) => ({
    params: { id: topic.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  questions: Question[];
}> = async ({ params }) => {
  try {
    const questions = await getQuestionByTopic(Number(params?.id));

    return {
      props: { questions },
    };
  } catch (error) {
    return { notFound: true };
  }
};
