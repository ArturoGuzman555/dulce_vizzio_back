import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Products } from 'src/Entities/products.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID del usuario que realiza la orden',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Lista de productos incluidos en la orden',
    type: [Products],
    example: [{ id: 'abc123' }, { id: 'def456' }],
  })
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Products[]>;
}
