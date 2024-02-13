import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserEntity } from "src/users/entity/user.entity";
import { Response } from 'express';
import * as bcrypt from "bcrypt";
import { TokenPayload } from "./interface/token-payload.interface";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/user.service";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  public async login(user: UserEntity, response: Response) {
    try {
      const userObject = await this.userService.getUserByUsername(user.username);

      await this.validateUser(userObject.username, user.password);

      const profile = await this.userService.getUserWithProfile(userObject.id)

      const email = profile.profile.email

      const tokenPayload: TokenPayload = {
        sub: userObject.id,
        name: userObject.username
      }

      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + this.configService.get('JWT_EXPIRATION'));

      const token = this.jwtService.sign(tokenPayload)

      response.cookie('Authentication', token, {
        httpOnly: true,
        secure: true,
        expires,
        sameSite: 'none'
      })

      //await this.mailService.sendUserConfirmation(email, "token");

    } catch(error) {
      throw new UnauthorizedException('Eroare la utentificare ', error.message)
    }
    
  }

  public async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);

    if(!user) throw new UnauthorizedException(`User ${username} not found!`);

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (isPasswordValid) {
      const { password, ...result } = user;
      return result;
    } 
    else {
      throw new UnauthorizedException(`Invalid credential for user ${username}`);
    }
  }

  public logout(response: Response) {
    response.clearCookie('Authentication')
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(0)
    });
  }

}