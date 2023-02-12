import { IsNotEmpty } from "class-validator";

export class EditQuestionDto {
  @IsNotEmpty({ message: "questionName is required" })
  questionName: string;
}
