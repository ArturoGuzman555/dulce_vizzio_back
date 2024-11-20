import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Orders } from './orders.entity';
import { Products } from './products.entity';

@Entity({ name: 'orderdetails' })
export class OrderDetails {
  @ApiProperty({
    description: 'ID único del detalle del pedido',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Precio total de los productos en este detalle de pedido',
    example: 99.99,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({
    description: 'Pedido asociado a este detalle de pedido',
    type: () => Orders,
  })
  @OneToOne(() => Orders, (orders) => orders.orderDetail)
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @ApiProperty({
    description: 'Lista de productos asociados a este detalle de pedido',
    type: () => [Products],
  })
  @ManyToMany(() => Products)
  @JoinTable({
    name: 'orderdetails_products',
    joinColumn: {
      name: 'orderdetail_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: Products[];

  @Column({ type: 'int', nullable: false, default: 1 })
  quantity: number;
}
