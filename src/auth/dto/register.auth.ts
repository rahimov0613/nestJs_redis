import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'salom' })
  name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'nimajon' })
  username: string;
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({ minNumbers: 2, minUppercase: 3 })
  @ApiProperty({ default: 'Sal.12345' })
  password: string;
  @IsNotEmpty()
  @ApiProperty({ default: 'nima@mail.com' })
  @IsEmail()
  email: string;
}
