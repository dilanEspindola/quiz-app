import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useScore } from "@/context/score";
import { Question as IQuestion } from "@/interfaces/QuestionInterface";
import { Question } from "./question";

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

  const nextQuestion = () => {
    const el = questionContentRef.current;
    if (!el?.children[numElement]) return setIsFinishGame(true);
    el?.children[numElement].scrollIntoView({
      behavior: "smooth",
      inline: "nearest",
    });
  };

  const onChangeElement = () => {
    setisNextElement(() => true);
  };

  useEffect(() => {
    if (isNextElement) {
      nextQuestion();
      setNumElement((prev) => prev + 1);
      setisNextElement(() => false);
    }

    if (isFinishGame) {
      console.log("game ended");
    }
  }, [isNextElement]);

  useEffect(() => {
    modalRef.current?.click();
  }, [isFinishGame]);

  return (
    <div className={`w-10/12 h-screen ${styles.questionScrollbar}`}>
      <h1 className="mb-20 text-4xl bg-black/20 z-10 w-10/12 fixed text-center p-4">
        Score: <span className="text-white">{score}</span>
      </h1>

      {/* modal */}
      {/* The button to open modal */}
      <label htmlFor="my-modal" className="btn hidden" ref={modalRef}>
        open modal
      </label>

      {/* Put this part before </body> tag */}
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
            onClick={() => router.replace("/home")}
          >
            Go back
          </button>
          {/* <div  className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Yay!
            </label>
          </div> */}
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
