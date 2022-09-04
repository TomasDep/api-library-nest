import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  MinLength,
  IsNumber,
  IsOptional,
  IsPositive,
  IsInt,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'Product title',
    uniqueItems: true,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  name: string;
  @ApiProperty({
    description: 'Product description',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty({
    description: 'Product observations',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  observations?: string;
  @ApiProperty({
    description: 'Product stock',
    nullable: true,
    default: 0,
  })
  @IsInt()
  @IsOptional()
  @IsPositive()
  stock?: number;
  @ApiProperty({
    description: 'Product status',
    nullable: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
  @ApiProperty({
    description: 'Product price',
    nullable: true,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  price?: number;
  @ApiProperty({
    description: 'Product slug',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  slug?: string;
  @ApiProperty({
    description: 'Product genres',
    isArray: true,
  })
  @IsString({ each: true })
  @IsArray()
  genres: string[];
}
