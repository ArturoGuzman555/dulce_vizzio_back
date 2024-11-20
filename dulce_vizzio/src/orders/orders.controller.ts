import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { OwnershipGuard } from 'src/auth/guards/ownership.guard';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() order: CreateOrderDto) {
    const { products, userId } = order;
    return this.ordersService.createOrder(userId, products);
  }

  @Get(':id')
  @UseGuards(OwnershipGuard)
  async getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }
}
