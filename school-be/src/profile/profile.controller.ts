import { Controller, Get, Patch, SerializeOptions, UseGuards } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';

@Controller('profile')
@SerializeOptions({strategy: 'excludeAll'})
@UseGuards(JwtAuthGuard)
export class ProfileController {

  @Get()
  async getProfile() {

  }

  @Patch('/update')
  async updateProfile() {

  }

}
