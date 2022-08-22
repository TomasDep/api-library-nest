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
  @IsString()
  @MinLength(1)
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsString()
  @IsOptional()
  observations?: string;
  @IsInt()
  @IsOptional()
  @IsPositive()
  stock?: number;
  @IsBoolean()
  @IsOptional()
  status?: boolean;
  @IsNumber()
  @IsOptional()
  @IsPositive()
  price?: number;
  @IsString()
  @IsOptional()
  slug?: string;
  @IsString({ each: true })
  @IsArray()
  genres: string[];
}
