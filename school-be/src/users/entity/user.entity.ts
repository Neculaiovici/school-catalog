import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from 'class-transformer';
import { Profile } from "./profile.entity";
import { AbstractEntity } from "src/common/abstract.entity";
import { RoleTypeEnum } from "../enum/role.enum";

@Entity('user')
export class User extends AbstractEntity {

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

  @OneToOne(() => Profile, { nullable: true, cascade: true })
  @JoinColumn()
  @Expose()
  profile: Profile;

}