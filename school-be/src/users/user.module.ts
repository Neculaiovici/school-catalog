import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Profile } from './entity/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, 
      Profile
    ]),
  ],
  controllers: [ UserController ],
  providers: [ UserService ]
})
export class UserModule {}
