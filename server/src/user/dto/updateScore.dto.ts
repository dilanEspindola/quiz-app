import { IsNotEmpty } from "class-validator";

export class UpdateUserScoreDto {
  @IsNotEmpty({ message: "score is required" })
  score: number;
}
