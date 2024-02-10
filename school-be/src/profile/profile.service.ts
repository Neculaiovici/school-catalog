import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfileEntity } from './entity/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProfileDto } from './input/update-profile.dto';
import { UserService } from 'src/users/user.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly userService: UserService
  ) {}

  // TO DO create profile if not exist for the user
  public async createProfile(id: number, input: ProfileEntity): Promise<ProfileEntity> {
    //const user 
    return;
  }

  public async updateProfile(id: number, input: UpdateProfileDto): Promise<ProfileEntity> {
    const user = await this.userService.getUserWithProfile(id);
    if(!user) throw new BadRequestException('User not found in profile service!');

    const profile = user.profile
    Object.assign(profile, input);

    return await this.profileRepository.save(profile);
  }
}
