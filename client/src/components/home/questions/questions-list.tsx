import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useScore } from "@/context/score";
import { Question as IQuestion } from "@/interfaces/QuestionInterface";
import { Question } from "./question";
import { updateUserScore } from "@/services";

import styles from "./question.module.css";

interface Props {
  questions: IQuestion[];
}

export const QuestionList = ({ questions }: Props) => {
  const { score } = useScore();
  const [isNextElement, setisNextElement] = useState(false);
  const [isFinishGame, setIsFinishGame] = useState(false);
  const [numElement, setNumElement] = useState(1);
  const questionContentRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLLabelElement>(null);
  const router = useRouter();

  /**
   * makes scroll to the next element(question) and if there is not anymore question finish the game
   */
  const nextQuestion = () => {
    const el = questionContentRef.current;
    if (!el?.children[numElement]) return setIsFinishGame(true);

    el?.children[numElement].scrollIntoView({
      behavior: "smooth",
      inline: "nearest",
    });
  };

  /**
   * works when you've answered a question and then it runs this function
   */
  const onChangeElement = () => {
    setisNextElement(() => true);
  };

  const sendScoreAndGoHome = async (score: number) => {
    await updateUserScore(score);
    router.replace("/home");
  };

  useEffect(() => {
    if (isNextElement) {
      nextQuestion();

      // add one unit to access the next children in the element
      setNumElement((prev) => prev + 1);

      // restarts the state to be able to scroll to the next element
      setisNextElement(() => false);
    }

    if (isFinishGame) {
      // do something when you've answered all questions
    }
  }, [isNextElement]);

  /**
   * this useffect works for... when you've answered all questions, automaticallly open the modal
   * runs when the isfinishGame state is in true
   */
  useEffect(() => {
    modalRef.current?.click();
  }, [isFinishGame]);

  return (
    <div className={`w-10/12 h-screen ${styles.questionScrollbar}`}>
      <h1 className="mb-20 text-4xl bg-black/20 z-10 w-10/12 fixed text-center p-4">
        Score: <span className="text-white">{score}</span>
      </h1>

      {/* modal */}
      <label htmlFor="my-modal" className="btn hidden" ref={modalRef}>
        open modal
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-center">Quiz finished</h3>
          <p className="py-4">
            Your score: <span className="font-bold">{score}</span>
          </p>
          <button
            className="border-2 border-green-300 px-5 py-2
          text-green-300 rounded-md hover:bg-green-500 hover:border-green-500
          hover:text-white transition-all ease-out duration-300 w-3/12"
            onClick={() => sendScoreAndGoHome(score)}
          >
            Go back
          </button>
        </div>
      </div>
      {/* end modal */}

      <div
        className="last:mb-20 w-9/12 flex flex-col mx-auto mb-52 overflow-y-hidden mt-52 gap-32 max-h-[50dvh] h-[55dvh]"
        ref={questionContentRef}
      >
        {questions.map((question) => (
          <Question
            question={question}
            key={question.id}
            nextQuestion={onChangeElement}
          />
        ))}
      </div>
    </div>
  );
};
