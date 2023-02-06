import { IsNotEmpty } from "class-validator";

export class CreateTopicDto {
  @IsNotEmpty({ message: "name of topic is required" })
  name: string;
}
