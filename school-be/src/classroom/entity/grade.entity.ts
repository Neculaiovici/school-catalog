import { Expose } from "class-transformer";
import { AbstractEntity } from "src/common/abstract.entity";
import { UserEntity } from "src/users/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ClassroomEntity } from "./classroom.entity";
import { CourseEntity } from "./course.entity";

@Entity('grade')
export class GradeEntity extends AbstractEntity {
  @Column("varchar", { length : 10, unique: true})
  @Expose()
  name: string;

  @Column("varchar", { length : 50})
  @Expose()
  description: string;

  @OneToMany(() => UserEntity, (users) => users.grade)
  @Expose()
  user: UserEntity;

  @ManyToOne(() => ClassroomEntity, (classroom) => classroom.id)
  @JoinColumn({name: 'classroom_id'})
  @Expose()
  classroom: ClassroomEntity[];

  @OneToMany(() => CourseEntity, (course) => course.id)
  @Expose()
  courses: CourseEntity[];

}