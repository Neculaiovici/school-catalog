import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from 'class-transformer';
import { ProfileEntity } from "./profile.entity";
import { AbstractEntity } from "src/common/abstract.entity";
import { RoleTypeEnum } from "../enum/role.enum";
import { ClassroomEntity } from "src/classroom/entity/classroom.entity";
import { GradeEntity } from "src/classroom/entity/grade.entity";

@Entity('user')
export class UserEntity extends AbstractEntity {

  @Column({ unique: true })
  @Expose()
  username: string;

  @Column({ unique: true })
  password:string;

  @Column('enum', {
    enum: RoleTypeEnum,
    default: RoleTypeEnum.Student
  })
  @Expose()
  role: RoleTypeEnum;

  @OneToOne(() => ProfileEntity, { nullable: true, cascade: true })
  @JoinColumn()
  @Expose()
  profile: ProfileEntity;

  @ManyToMany(() => GradeEntity, (grade) => grade.id)
  @Expose()
  grade: GradeEntity[];

  @ManyToMany(() => ClassroomEntity, (classroom) => classroom.users)
  classrooms: ClassroomEntity[];

}