import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from "passport-local";
import { UserService } from "src/users/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly userService: UserService
  ) {
    super( {username: 'username'} );
  }

  async validate(username: string, password: string) {
    return this.userService.validateUser(username, password);
  }

}