import { useQuery } from "@tanstack/react-query";
import { getTopics } from "@/services";
import { LoaderPage } from "../loaders";
import { TopicList } from "./topics";

export const HomeComponent = () => {
  const {
    isLoading,
    data: topics,
    error,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: getTopics,
  });

  if (isLoading) return <LoaderPage />;

  return (
    <div className="bg-componentPages h-[70vh] self-end w-full flex flex-col items-center gap-10 pt-20">
      <h1 className="mb-5 text-2xl uppercase font-bold">Categories</h1>
      <>
        <ul className="grid grid-cols-3 gap-10 text-center w-9/12">
          {topics?.map((topic) => (
            <TopicList topic={topic} key={topic.id} />
          ))}
        </ul>
        {error && <h2>se estalló esta mrd :V</h2>}
      </>
    </div>
  );
};
