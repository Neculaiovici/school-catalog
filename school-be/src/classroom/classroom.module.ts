import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { ClassroomEntity } from './entity/classroom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassroomEntity])
  ],
  providers: [ClassroomService],
  controllers: [ClassroomController]
})
export class ClassroomModule {}
