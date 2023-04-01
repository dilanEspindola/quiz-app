import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { axiosConfig } from "@/interceptors";
import { Topic } from "@/interfaces/TopicInterfaces";
import { AuthGuard } from "@/guards";
import { Sidebar } from "@/components/sidebar";
import { PRIVATE_ROUTES } from "@/routes";
import { getTopic, getTopics } from "@/services";

const Category = ({
  topic,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <AuthGuard>
      <div className="bg-background min-h-screen flex">
        <Sidebar />
        <div className="flex flex-col gap-5 items-center justify-center h-screen w-10/12">
          <h1 className="text-lg text-white">
            These questions will be about {topic.name}
          </h1>
          <Link
            href={`${PRIVATE_ROUTES.QUESTIONS}/${topic.id}`}
            className="uppercase bg-gradient-to-r from-[#790ca4] to-[#D73AFE] px-10 py-3 rounded-full
          text-white text-lg active:scale-[0.95] duration-200"
          >
            start
          </Link>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  const topics = await getTopics();

  const paths = topics.map((topic) => ({
    params: { id: topic.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ topic: Topic }> = async ({
  params,
}) => {
  try {
    const topic = await getTopic(Number(params?.id));

    return {
      props: { topic },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
