import { IsDate, IsEnum, IsNotEmpty, IsString, Length, ValidateNested } from "class-validator";
import { Profile } from "../profile.entity";
import { RoleTypeEnum } from "../role.enum";
import { Type } from "class-transformer";

export class CreateUserDto {

  @IsString()
  @IsNotEmpty({ message: "You must enter a value" })
  @Length(5, 255, { message: "You must enter a value with at least 5 character" })
  username: string;

  @IsString()
  @IsNotEmpty({ message: "You must enter a value" })
  @Length(5, 255, { message: "You must enter a value with at least 5 character" })
  password: string;

  @IsString()
  @IsNotEmpty({ message: "You must enter a value" })
  @Length(5, 255, { message: "You must enter a value with at least 5 character" })
  retypedPassword: string;

  @IsEnum(RoleTypeEnum)
  @IsNotEmpty({ message: "You must select a value" })
  role: RoleTypeEnum;

  @IsDate()
  createdAt: Date;

  @ValidateNested()
  @Type(() => Profile)
  profile: Profile;
}