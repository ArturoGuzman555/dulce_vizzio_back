import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/Entities/orders.entity';
import { Repository } from 'typeorm';
import { OrderDetails } from 'src/Entities/orderDetail.entity';
import { Users } from 'src/Entities/user.entity';
import { Products } from 'src/Entities/products.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async findUserById(userId: string) {
    return this.userRepository.findOneBy({ id: userId });
  }

  async createOrder(order: Orders) {
    return this.ordersRepository.save(order);
  }

  async findProductById(productId: string) {
    return this.productsRepository.findOneBy({ id: productId });
  }

  async updateProductStock(productId: string, newStock: number) {
    return this.productsRepository.update(
      { id: productId },
      { stock: newStock },
    );
  }

  async createOrderDetail(orderDetail: OrderDetails) {
    return this.orderDetailsRepository.save(orderDetail);
  }

  async findOrderById(id: string) {
    return this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetail: {
          products: true,
        },
        user: true,
      },
    });
  }

  async findOrdersWithProducts() {
    return this.orderDetailsRepository.find({
      relations: ['products'],
    });
  }

  async findAllProducts() {
    return this.productsRepository.find();
  }
}
