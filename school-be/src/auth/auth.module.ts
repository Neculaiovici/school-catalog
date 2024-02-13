import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entity/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { UserService } from "src/users/user.service";
import { UserModule } from "src/users/user.module";
import { PassportModule } from "@nestjs/passport";
import { ProfileEntity } from "src/profile/entity/profile.entity";
import { MailModule } from "src/mail/mail.module";

@Module({
  imports: [
    PassportModule,
    UserModule,
    MailModule,
    TypeOrmModule.forFeature([ UserEntity, ProfileEntity ]),
    JwtModule.registerAsync({
      useFactory: ((configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`
        }
      })),
      inject: [ConfigService]
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
  exports: [AuthService]
})
export class AuthModule {}