import { UserEntity } from "src/users/entity/user.entity";
import { GradeEntity } from "../entity/grade.entity";

export class CreateClassroomDto {
  name: string;
  description: string;
  year: Date;
  section: string;
  status: boolean;
  grade: GradeEntity;
  users: UserEntity[];
}