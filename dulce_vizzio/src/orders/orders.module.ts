import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/Entities/orders.entity';
import { OrderDetails } from 'src/Entities/orderDetail.entity';
import { Users } from 'src/Entities/user.entity';
import { Products } from 'src/Entities/products.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Users, Products])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService, TypeOrmModule],
})
export class OrdersModule {}
