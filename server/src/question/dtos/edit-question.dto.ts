import { IsOptional, IsString } from "class-validator";

export class EditQuestionDto {
  @IsOptional()
  @IsString()
  questionName?: string;

  @IsOptional()
  @IsString()
  correctAnswer?: string;
}
