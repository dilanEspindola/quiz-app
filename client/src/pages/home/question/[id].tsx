import { useState } from "react";
import { axiosConfig } from "@/interceptors";
import { Question as IQuestion } from "@/interfaces/QuestionInterface";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import { useScore } from "@/context/score";
import Link from "next/link";

type AnswerCorrectOrNot = "YES" | "NO";

const Question = ({
  question,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<AnswerCorrectOrNot>();
  const { addPoint, restPoint, score } = useScore();

  const checkAnswer = (name: string) => {
    if (question.correctAnswer.toLowerCase() !== name.toLowerCase()) {
      restPoint();
      return setIsCorrectAnswer("NO");
    }
    addPoint();
    setIsCorrectAnswer("YES");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-[85%] max-w-[85%] flex flex-col">
        <h1 className="self-start mb-20 text-lg">
          Score: <span className="text-white">{score}</span>
        </h1>
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
                isCorrectAnswer === "YES" &&
                "bg-green-500"
              } ${
                (isCorrectAnswer === "YES" && "pointer-events-none") ||
                (isCorrectAnswer === "NO" && "pointer-events-none")
              }
                ${
                  (question.correctAnswer !== answerName &&
                    isCorrectAnswer === "NO" &&
                    "bg-red-500") ||
                  (question.correctAnswer === answerName &&
                    isCorrectAnswer === "NO" &&
                    "bg-green-500")
                }
              `}
              onClick={() => checkAnswer(answerName)}
            >
              {answerName}
            </li>
          ))}
        </div>
        {isCorrectAnswer && (
          <Link
            className={`self-end mt-20 text-white py-2 px-5 rounded-lg bg-slate-900 hover:bg-slate-800`}
            href=""
          >
            Next question
          </Link>
        )}
      </div>
    </div>
  );
};

export default Question;

export const getServerSideProps: GetServerSideProps<{
  question: IQuestion;
}> = async ({ query }) => {
  const res = await axiosConfig.get<IQuestion>(`/api/questions/${query.id}`);
  const question = res.data;

  return {
    props: { question },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await axiosConfig.get<IQuestion[]>("/api/questions");
//   const questions = res.data;

//   const paths = questions.map((question) => ({
//     params: { id: question.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps<{ question: IQuestion }> = async (
//   ctx
// ) => {
//   try {
//     const { params } = ctx;
//     const res = await axiosConfig.get<IQuestion>(
//       `/api/questions/${params?.id}`
//     );
//     const question = res.data;

//     return {
//       props: { question },
//     };
//   } catch (error) {
//     return { notFound: true };
//   }
// };
