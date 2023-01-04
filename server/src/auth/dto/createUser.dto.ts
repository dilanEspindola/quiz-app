import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "username is required" })
  username: string;

  @IsNotEmpty({ message: "email is required" })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: "password is required" })
  @MinLength(6)
  password: string;

  photo: string;
}
