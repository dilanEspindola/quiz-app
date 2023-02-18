import { IsNotEmpty } from "class-validator";

export class CreateQuestionDto {
  @IsNotEmpty({ message: "question name is required" })
  name: string;

  @IsNotEmpty({ message: "correctAnswer is required" })
  correctAnswer: string;

  @IsNotEmpty({ message: "topics are required" })
  topics: string[];
}
