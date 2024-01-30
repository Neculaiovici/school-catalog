import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AbstractEntity } from "src/common/abstract.entity";
import { Profile } from "src/users/profile.entity";
import { User } from "src/users/user.entity";

export default registerAs('orm.config', (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [ User, Profile ],
  synchronize: true,
  autoLoadEntities: true,
}));