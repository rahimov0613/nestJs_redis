import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ParseArrayPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { LoggingInterceptor } from './interceptors/logging.interseptor';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  @UseInterceptors(LoggingInterceptor)
  findAll() {
    return this.courseService.findAll();
  }

  @Get('search')
  getSerachedCourses(
    @Query('status', new ParseArrayPipe({ items: Number, separator: ',' }))
    query: any,
  ) {
    console.log(query);

    return this.courseService.search(query);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.courseService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
