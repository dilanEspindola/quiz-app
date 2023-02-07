import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./Question";

@Entity({ name: "topics" })
export class Topic {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(() => Question)
  @JoinTable({
    name: "topics_questions",
  })
  questions: Question[];
}
