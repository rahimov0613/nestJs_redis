import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEmail,
  IsOptional,
  Max,
  Min,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  // @MaxLength(5)
  @MinLength(1)
  title: string;
  description: string;
  @IsNumber()
  @IsNotEmpty()
  @Max(300)
  @Min(1)
  price: number;
  @IsOptional()
  teacherName: string;
  // @IsNotEmpty()
  // @IsBoolean()
  // isActive: boolean;
  // @IsEmail()
  // email: string;
  // @IsString()
  // @Matches(/^9989[012345789][0-9]{7}$/)
  // phone: string;
}
