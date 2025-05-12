import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({ minNumbers: 2, minUppercase: 3 })
  password: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
