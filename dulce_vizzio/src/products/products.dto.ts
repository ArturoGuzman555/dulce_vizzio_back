import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Producto de Ejemplo' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Esta es una descripción detallada del producto.',
  })
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 99.99 })
  price?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 100 })
  stock?: number;
}
