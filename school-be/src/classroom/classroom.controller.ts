import { Controller, Delete, Get, Patch, Post, SerializeOptions, UseGuards } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';

@Controller('classroom')
@UseGuards(JwtAuthGuard)
@SerializeOptions({strategy: 'excludeAll'})
export default class ClassroomController {

  @Get()
  async getClassroom() {
    
  }

  @Post()
  async createClassroom() {

  }

  @Patch()
  async updateClassroom() {

  }

  @Delete()
  async deleteClassroom() {

  }
}
