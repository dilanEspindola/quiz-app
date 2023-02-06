import { IsNotEmpty } from "class-validator";

export class CreateQuestionDto {
  @IsNotEmpty({ message: "question name is required" })
  name: string;

  @IsNotEmpty({ message: "name of category is required" })
  topic: string;
}
