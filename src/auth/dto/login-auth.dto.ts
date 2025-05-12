import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ default: 'nima' })
  @IsOptional()
  @IsString()
  username: string;
  @ApiProperty({ default: 'NIaM.1234' })
  @IsString()
  password: string;
}
