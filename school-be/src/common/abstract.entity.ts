import { Expose } from "class-transformer";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class AbstractEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Expose()
  createdAt: Date;
}