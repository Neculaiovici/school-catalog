import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateProfileDto {
  // @IsString()
  // @IsNotEmpty({ message: "You must enter a value" })
  firstname: string;

  // @IsString()
  // @IsNotEmpty({message: "You must enter a value"})
  lastname: string;
  
  // @IsEmail({}, { message: "You must enter a valid email address" })
  // @IsNotEmpty({ message: "You must enter a value" })
  email: string;

  // @IsNumber({}, {message: "You must enter only numbers and not strings"})
  // @IsNotEmpty({ message: "You must enter a value" })
  age: number;

  @IsString()
  profileAvatar: string;
}