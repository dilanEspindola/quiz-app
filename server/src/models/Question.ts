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

  @OneToMany(() => Answer, (answer) => answer.question, {
    onDelete: "CASCADE",
    cascade: ["insert", "remove", "update"],
  })
  answer: Answer[];

  @ManyToMany(() => Topic, {
    onDelete: "CASCADE",
    cascade: ["insert", "remove", "update"],
  })
  @JoinTable({
    name: "topics_questions",
  })
  topics: Topic[];
}
