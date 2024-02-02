import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from "passport-local";
import { UserEntity } from "src/users/entity/user.entity";
import { UserService } from "src/users/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly userService: UserService
  ) {
    super( {usernameField: 'username'} );
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    const user = await this.userService.validateUser(username, password);
    
    if(!user) throw new UnauthorizedException();

    return user;
  }

}