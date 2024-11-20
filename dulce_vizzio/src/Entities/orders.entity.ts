import { Users } from './user.entity';
import { OrderDetails } from './orderDetail.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'orders' })
export class Orders {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ser una fecha de tipo dd/mm/yy',
    example: '01/01/2024',
  })
  @CreateDateColumn({
    type: 'timestamp',
    name: 'date',
  })
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetail: OrderDetails;
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
