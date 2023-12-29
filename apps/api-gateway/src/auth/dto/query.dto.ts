import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  password: string;
}

export class RegisterDto extends LoginDto {
  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  age: number;
}

export class QueryUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  username: string;
}

export class UserDto extends RegisterDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id: string;
}
