import { useState } from "react";
import { axiosConfig } from "@/interceptors";
import { Question as IQuestion } from "@/interfaces/QuestionInterface";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

const Question = ({
  question,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const checkAnswer = (name: string) => {
    if (question.correctAnswer.toLowerCase() === name.toLowerCase()) {
      setIsCorrectAnswer(() => true);
    } else {
      console.log("no");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-[85%] max-w-[85%] flex flex-col">
        <div className="bg-slate-900 w-full p-5 rounded-full">
          <h3 className="text-lg text-center">{question.questionName}</h3>
        </div>
        <div className="grid grid-cols-2 place-content-center gap-5 mt-10">
          {question.answer.map(({ id, answerName }) => (
            <li
              key={id}
              className={`list-none text-center bg-indigo-900 hover:bg-slate-900 cursor-pointer p-5 text-lg text-white
              rounded-full ${
                question.correctAnswer === answerName &&
                isCorrectAnswer &&
                "bg-green-500"
              } ${isCorrectAnswer && "pointer-events-none"}`}
              onClick={() => checkAnswer(answerName)}
            >
              {answerName}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axiosConfig.get<IQuestion[]>("/api/questions");
  const questions = res.data;

  const paths = questions.map((question) => ({
    params: { id: question.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ question: IQuestion }> = async (
  ctx
) => {
  const { params } = ctx;
  const res = await axiosConfig.get<IQuestion>(`/api/questions/${params?.id}`);
  const question = res.data;

  return {
    props: { question },
  };
};
