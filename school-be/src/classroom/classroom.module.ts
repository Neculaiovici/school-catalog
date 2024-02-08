import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import ClassroomController from './classroom.controller';
import { ClassroomEntity } from './entity/classroom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from './entity/grade.entity';
import { CourseEntity } from './entity/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassroomEntity, GradeEntity, CourseEntity])
  ],
  providers: [ClassroomService],
  controllers: [ClassroomController]
})
export class ClassroomModule {}
