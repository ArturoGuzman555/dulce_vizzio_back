import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: 'Electrónica',
    description: 'Nombre de la categoría',
    maxLength: 50,
  })
  name: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiPropertyOptional({
    example: 'Electrónica',
    description: 'Nombre de la categoría',
    maxLength: 50,
  })
  name?: string;
}
