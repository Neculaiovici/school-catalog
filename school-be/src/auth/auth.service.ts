import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/entity/user.entity";
import { Response } from 'express';
import * as bcrypt from "bcrypt";
import { TokenPayload } from "./interface/token-payload.interface";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  public async login(user: User, response: Response) {
    const userObject = await this.userService.getUserByUsername(user.username);
    
    const tokenPayload: TokenPayload = {
      sub: userObject.id,
      name: userObject.username
    }

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + this.configService.get('JWT_EXPIRATION'));

    

    const token = this.jwtService.sign(tokenPayload)

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires
    })
  }

  public logout(response: Response) {
    response.clearCookie('Authentication')
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(0)
    });
  }

  public async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);//this.userRepository.findOne({where: { username}});

    if(!user) throw new UnauthorizedException(`User ${username} not found!`);

    if(!(await bcrypt.compare(pass, user.password))) throw new UnauthorizedException(`Invalid credential for user ${username}`);

    const {password, ...result } = user;

    return result;
  }

}