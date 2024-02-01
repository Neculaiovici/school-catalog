import { Expose } from "class-transformer";
import { AbstractEntity } from "src/common/abstract.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { GradeEntity } from "./grade.entity";

@Entity('course')
export class CourseEntity extends AbstractEntity {
  @Column("varchar", { length: 80 })
  @Expose()
  name: string;

  @Column("varchar", {length: 80})
  @Expose()
  description: string;

  @ManyToOne(() => GradeEntity, (grades) => grades.id)
  @JoinColumn({name: 'grade_id'})
  @Expose()
  grades: GradeEntity;
  
}