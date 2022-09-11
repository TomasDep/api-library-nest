import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'email',
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'username',
    required: true,
  })
  @IsString()
  username: string;
  @ApiProperty({
    description: 'password',
    required: true,
    minLength: 6,
    maxLength: 12,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
