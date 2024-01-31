import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/users/user.service";
import { Request } from 'express';
import { TokenPayload } from "../interface/token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')
    });
  }

  public async validate({ sub }: TokenPayload) {
    return await this.userService.getUserById(sub);
  }

  private static extractJWT(request: Request): string | null {
    if(request.cookies && 'Authentication' in request.cookies) {
      return  request.cookies.Authentication;
    }

    return null;
  }
}