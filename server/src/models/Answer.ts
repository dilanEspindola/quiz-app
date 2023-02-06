import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";

@Entity({ name: "answers" })
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  answerName: string;

  @ManyToOne(() => Question, (question) => question.answer)
  question: Question;
}
