import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ClassroomEntity } from "src/classroom/entity/classroom.entity";
import { ProfileEntity } from "src/users/entity/profile.entity";
import { UserEntity } from "src/users/entity/user.entity";

export default registerAs('orm.config', (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [ UserEntity, ProfileEntity, ClassroomEntity ],
  synchronize: true,
  autoLoadEntities: false,
  logging: false
}));