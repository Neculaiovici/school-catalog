import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from './profile.entity';
import { AbstractEntity } from 'src/common/abstract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, 
      Profile
    ])
  ],
  controllers: [ UserController ],
  providers: [ UserService ]
})
export class UserModule {}
