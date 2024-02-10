import { Body, Controller, Get, Patch, SerializeOptions, UseGuards } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';
import { GetUser } from 'src/users/user.interceptor';
import { UpdateProfileDto } from './input/update-profile.dto';
import { ProfileEntity } from './entity/profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
@SerializeOptions({strategy: 'excludeAll'})
@UseGuards(JwtAuthGuard)
export class ProfileController {

  constructor(private readonly profileService: ProfileService) {}

  @Patch('/update')
  async updateProfile(@GetUser() user, @Body() input: UpdateProfileDto): Promise<ProfileEntity> {
    return await this.profileService.updateProfile(user.id, input);
  }

}
