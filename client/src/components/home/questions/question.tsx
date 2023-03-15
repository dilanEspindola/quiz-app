import { useState, useEffect } from "react";
import { Question as IQuestion } from "@/interfaces/QuestionInterface";
import { useScore } from "@/context/score";
import { Answer } from "@/interfaces/AnswerInterface";
import { genRandomAnswers } from "@/helpers";

interface Props {
  question: IQuestion;
  nextQuestion: () => void;
}
type AnswerCorrectOrNot = "YES" | "NO" | null;

export const Question = ({ question, nextQuestion }: Props) => {
  const [isCorrectAnswer, setIsCorrectAnswer] =
    useState<AnswerCorrectOrNot>(null);
  const [answers, setAnswers] = useState<Answer[]>();
  const { addPoint, restPoint } = useScore();

  /**
   * setTimeout => after 1 second, it'll run the next question(div)
   * @param name it gets the answerName
   * @return YES OR NO... it'll validate if the answer is correct or not and if it's correct will be return YES else NO
   */
  const checkAnswer = (name: string) => {
    setTimeout(() => {
      nextQuestion();
    }, 1000);
    if (question.correctAnswer.toLowerCase() !== name.toLowerCase()) {
      restPoint();
      return setIsCorrectAnswer("NO");
    }
    addPoint();
    setIsCorrectAnswer("YES");
  };

  useEffect(() => {
    if (question) {
      const result = genRandomAnswers(question.answer);
      setAnswers(result);
    }
  }, []);

  return (
    <div
      className="single-question w-full flex flex-col"
      id={`item${question.id}`}
    >
      <div className="bg-slate-900 w-full p-5 rounded-full">
        <h3 className="text-lg text-center">{question.questionName}</h3>
      </div>
      <ul className="grid grid-cols-2 place-content-center gap-5 mt-10">
        {answers?.map(({ id, answerName }) => (
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
      </ul>
    </div>
  );
};
