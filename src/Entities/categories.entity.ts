import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Products } from './products.entity';

@Entity({ name: 'categories' })
export class Categories {
  @ApiProperty({
    description: 'ID único de la categoría',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Electrónica',
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Lista de productos que pertenecen a esta categoría',
    type: () => [Products],
  })
  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];
}
