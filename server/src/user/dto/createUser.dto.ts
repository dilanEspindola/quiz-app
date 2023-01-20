import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "username is required" })
  username: string;

  @IsNotEmpty({ message: "email is required" })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: "password is required" })
  @MinLength(6, { message: "PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS" })
  password: string;

  photo: string;
}
