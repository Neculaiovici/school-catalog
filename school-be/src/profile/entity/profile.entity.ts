import { Expose } from "class-transformer";
import { AbstractEntity } from "src/common/abstract.entity";
import { UserEntity } from "src/users/entity/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('profile')
export class ProfileEntity extends AbstractEntity {

  @Column()
  @Expose()
  firstname: string;

  @Column()
  @Expose()
  lastname: string;
  
  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  @Expose()
  age: number;

  @Column()
  @Expose()
  profileAvatar: string;
  
}