import { Expose } from "class-transformer";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class AbstractEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  createdAt: Date;
}