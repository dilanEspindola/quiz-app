import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNotEmpty({ message: "username is required" })
  username: string;

  @IsNotEmpty({ message: "password is required" })
  password: string;
}
