import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/user.entity';
import { ProfileEntity } from './entity/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity, 
      ProfileEntity
    ])
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
