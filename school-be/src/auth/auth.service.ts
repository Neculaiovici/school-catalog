import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entity/user.entity";
import { Repository } from "typeorm";
import { Response } from 'express';
import * as bcrypt from "bcrypt";
import { TokenPayload } from "./token-payload.interface";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  public async login(user: User, response: Response) {
    const tokenPayload: TokenPayload = { userId: user.id };
    
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + this.configService.get('JWT_EXPIRATION'));

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires
    });
  }

  public logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date()
    });
  }

  public async validateUser(username: string, password: string): Promise<User> {
    const user = await await this.userRepository.findOneBy({username: username});

    if(!user) throw new UnauthorizedException(`User ${username} not found!`);

    if(!(await bcrypt.compare(password, user.password))) throw new UnauthorizedException(`Invalid credential for user ${username}`);

    return user;
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}