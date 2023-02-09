import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTopicDto {
  @IsNotEmpty({ message: "name of topic is required to update" })
  @IsString()
  name: string;
}
