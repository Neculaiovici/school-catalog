import { Injectable } from '@nestjs/common';
import { ProfileEntity } from './entity/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProfileDto } from './input/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>
  ) {}

  public async getProfile(id: number): Promise<ProfileEntity> {
    return;
  }

  public async updateProfile(id: number, input: UpdateProfileDto): Promise<ProfileEntity> {
    return;
  }
}
