import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;
}
