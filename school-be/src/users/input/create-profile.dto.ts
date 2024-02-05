import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateProfileDto {
  // @IsString()
  // @IsNotEmpty({ message: "You must enter a value" })
  // @Length(5, 255, { message: "You must enter a value with at least 5 character" })
  firstname: string;

  // @IsString()
  // @IsNotEmpty({message: "You must enter a value"})
  // @Length(5, 255, { message: "You must enter a value with at least 5 character" })
  lastname: string;
  
  // @IsEmail({}, { message: "You must enter a valid email address" })
  // @IsNotEmpty({ message: "You must enter a value" })
  // @Length(5, 255, { message: "You must enter a value with at least 5 character" })
  email: string;

  // @IsNumber({}, {message: "You must enter only numbers and not strings"})
  // @IsNotEmpty({ message: "You must enter a value" })
  // @Length(5, 255, { message: "You must enter a value with at least 5 character" })
  age: number;

  @IsString()
  profileAvatar: string;
}