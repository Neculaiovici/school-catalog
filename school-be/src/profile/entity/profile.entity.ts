import { Expose } from "class-transformer";
import { AbstractEntity } from "src/common/abstract.entity";
import { Column, Entity } from "typeorm";

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