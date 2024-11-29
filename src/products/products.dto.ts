import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @IsOptional() // Permitir que sea opcional
  @IsString()
  @ApiProperty({
    example: 'Electrónica',
    description: 'Nombre de la categoría a la que pertenece el producto',
    required: false,
  })
  categoryName?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Producto de Ejemplo',
    description: 'Nombre del producto',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Esta es una descripción breve del producto.',
    description: 'Descripción del producto',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL de la imagen del producto',
  })
  imgUrl: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 99.99, description: 'Precio del producto' })
  price: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 2,
    description: 'Número de stock',
  })
  stock: number;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Producto de Ejemplo',
    description: 'Nombre del producto',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Esta es una descripción detallada del producto.',
    description: 'Descripción del producto',
  })
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 99.99, description: 'Precio del producto' })
  price?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    example: 100,
    description: 'Cantidad disponible en el stock',
  })
  stock?: number;
}
