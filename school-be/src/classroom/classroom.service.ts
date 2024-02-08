import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassroomEntity } from './entity/classroom.entity';
import { Repository } from 'typeorm';
import { GradeEntity } from './entity/grade.entity';
import { CourseEntity } from './entity/course.entity';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(ClassroomEntity)
    private readonly classroomRepository: Repository<ClassroomEntity>,
    @InjectRepository(GradeEntity)
    private readonly gradeRepository: Repository<GradeEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>
  ) {}

  async createClassroom(userId: number): Promise<ClassroomEntity> {
    return;
  }
}
