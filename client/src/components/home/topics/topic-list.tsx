import { Topic } from "@/interfaces/TopicInterfaces";
import { PRIVATE_ROUTES } from "@/routes";
import Link from "next/link";

interface Props {
  topic: Topic;
}

export const TopicList = ({ topic }: Props) => {
  return (
    <Link
      href={`${PRIVATE_ROUTES.CATEGORY}/${topic.id}`}
      className="capitalize border-2 border-violet-400 py-3 rounded-md text-violet-400
      hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all ease-in-out duration-300
      active:scale-[0.95]"
    >
      <span>{topic.name}</span>
    </Link>
  );
};
