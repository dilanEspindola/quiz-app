import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "./Answer";
import { Topic } from "./Topic";

@Entity({ name: "questions" })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  questionName: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answer: Answer[];

  @ManyToMany(() => Topic)
  @JoinTable({
    name: "topics_questions",
  })
  topics: Topic[];
}
