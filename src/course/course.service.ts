import { Injectable } from '@nestjs/common';
import { courseInterFace } from './interfaces/course.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CourseService {
  private readonly courses: courseInterFace[] = [];

  constructor(
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>,
    private readonly redisServie: RedisService,
  ) {}
  create(createCourseDto: any) {
    createCourseDto.id = Math.floor(Math.random() * 1000);
    this.courses.push(createCourseDto);
    return createCourseDto;
  }

  search(query: any) {
    console.log(query);

    return this.courses.filter(
      (ele) =>
        ele.teacherName == query.name && ele.price == (query.price as number),
    );
  }

  async findAll() {
    // const data = await this.redisServie.get('courses');
    // if (data) return JSON.parse(data);
    const courses = await this.courseRepo.find();
    // this.redisServie.set('courses', courses);
    return courses;
  }

  findOne(id: number) {
    return this.courses.find((ele) => ele.id === id);
  }

  update(id: number) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
