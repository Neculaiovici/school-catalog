import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { ProfileEntity } from './entity/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity, 
      ProfileEntity
    ]),
  ],
  controllers: [ UserController ],
  providers: [ UserService ]
})
export class UserModule {}
