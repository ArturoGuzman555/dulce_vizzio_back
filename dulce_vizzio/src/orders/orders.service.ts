import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Orders } from 'src/Entities/orders.entity';
import { OrderDetails } from 'src/Entities/orderDetail.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async createOrder(userId: string, products: { id: string }[]) {
    const user = await this.ordersRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no se encontró`);
    }
    const order = new Orders();
    order.user = user;
    const newOrder = await this.ordersRepository.createOrder(order);

    let total = 0;
    const productCountMap: Map<string, number> = new Map();

    for (const element of products) {
      const product = await this.ordersRepository.findProductById(element.id);

      if (!product) {
        throw new NotFoundException(
          `Producto con id ${element.id} no encontrado`,
        );
      }

      if (product.stock <= 0) {
        throw new BadRequestException(
          `Producto con id ${element.id} no está disponible en stock`,
        );
      }
      if (productCountMap.has(product.id)) {
        productCountMap.set(product.id, productCountMap.get(product.id)! + 1);
      } else {
        productCountMap.set(product.id, 1);
      }

      total += Number(product.price);
    }

    const productsArray = [];
    for (const [productId, quantity] of productCountMap) {
      const product = await this.ordersRepository.findProductById(productId);

      if (!product) {
        throw new NotFoundException(
          `Producto con id ${productId} no encontrado`,
        );
      }

      productsArray.push(product);

      await this.ordersRepository.updateProductStock(
        productId,
        product.stock - quantity,
      );
    }

    const orderDetail = new OrderDetails();
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.order = newOrder;
    orderDetail.products = productsArray;
    orderDetail.quantity = products.length;

    await this.ordersRepository.createOrderDetail(orderDetail);

    return this.ordersRepository.findOrderById(newOrder.id);
  }

  async getOrderById(id: string) {
    const order = await this.ordersRepository.findOrderById(id);

    if (!order) {
      throw new NotFoundException(`Orden con id ${id} no encontrada`);
    }

    return order;
  }

  async loadInitialData() {
    const orders = await this.ordersRepository.findOrdersWithProducts();
    const productIdsInOrders = new Set(
      orders.flatMap((orderDetail) => orderDetail.products.map((p) => p.id)),
    );

    const products = await this.ordersRepository.findAllProducts();
    const productsToReset = products.filter((product) =>
      productIdsInOrders.has(product.id),
    );

    if (productsToReset.length > 0) {
      throw new Error(
        'Algunos productos están asociados a órdenes y no se pueden reiniciar.',
      );
    }

    return productsToReset;
  }
}
