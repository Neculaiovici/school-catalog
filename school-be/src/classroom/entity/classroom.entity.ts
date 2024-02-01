import { Expose } from "class-transformer";
import { AbstractEntity } from "src/common/abstract.entity";
import { UserEntity } from "src/users/entity/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { GradeEntity } from "./grade.entity";

@Entity('classroom')
export class ClassroomEntity extends AbstractEntity {
  @Column("varchar", { length : 50, unique: true })
  @Expose()
  name: string;

  @Column("varchar", { length : 150 })
  @Expose()
  description: string;

  @Column("year")
  @Expose()
  year: Date;

  @Column("varchar", { length : 100 })
  @Expose()
  section: string;

  @Column("boolean")
  @Expose()
  status: boolean;

  @OneToMany(() => GradeEntity, (grade) => grade.id)
  @Expose()
  grade: GradeEntity[];

  @ManyToMany(() => UserEntity, (user) => user.classrooms)
  @JoinTable({name: 'classrooms-users'})
  users: UserEntity[];
}