import { IsNotEmpty } from "class-validator";

export class CreateAnswerDto {
  @IsNotEmpty({ message: "answerName is required" })
  answerName: string;

  @IsNotEmpty({ message: "questionId is required" })
  questionId: number;
}
