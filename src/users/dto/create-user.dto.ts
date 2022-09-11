import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
  })
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'User email',
  })
  @IsString()
  username: string;
  @ApiProperty({
    description: 'User password',
    maxLength: 12,
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
  @ApiProperty({
    description: 'User fullname',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  fullname: string;
}
