import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entity/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { UserService } from "src/users/user.service";
import { UserModule } from "src/users/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ]),
    JwtModule.registerAsync({
      useFactory: ((configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`
        }
      })),
      inject: [ConfigService]
    }),
    UserModule
  ],
  controllers: [ AuthController ],
  providers: [ AuthService, LocalStrategy, JwtStrategy, UserService ],
  exports: [ AuthService ]
})
export class AuthModule {}