import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Categories } from './categories.entity';

@Entity({ name: 'products' })
export class Products {
  static map(arg0: (element: any) => Promise<void>): any {
    throw new Error('Method not implemented.');
  }
  @ApiProperty({
    description: 'ID único del producto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Producto de Ejemplo',
  })
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Esta es una descripción detallada del producto.',
  })
  @Column({ type: 'text', nullable: false })
  description: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 99.99,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({
    description: 'Cantidad en stock del producto',
    example: 100,
  })
  @Column({ type: 'int', nullable: false })
  stock: number;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://www.example.com/image.png',
  })
  @Column({
    type: 'varchar',
    default:
      'https://res-console.cloudinary.com/dytdzrpgq/thumbnails/v1/image/upload/v1731438689/cmVhY3RfbGtmZzhu/drilldown',
  })
  imgUrl: string;

  @ApiProperty({
    description: 'Categoría del producto',
    type: () => Categories,
  })
  @ManyToOne(() => Categories, (category) => category.products, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Categories;
}
