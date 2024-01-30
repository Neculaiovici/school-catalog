import { Expose } from "class-transformer";
import { AbstractEntity } from "src/common/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity('profile')
export class Profile extends AbstractEntity {

  @Column()
  @Expose()
  firstName: string;

  @Column()
  @Expose()
  lastName: string;
  
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