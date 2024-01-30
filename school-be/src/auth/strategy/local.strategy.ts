import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from "passport-local";
import { UserService } from "src/users/user.service";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly authService: AuthService
  ) {
    super( {username: 'username'} );
  }

  async validate(username: string, password: string) {
    return this.authService.validateUser(username, password);
  }

}