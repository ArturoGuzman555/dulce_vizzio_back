import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { OrdersService } from 'src/orders/orders.service';
import { Products } from 'src/Entities/products.entity';

@Injectable()
export class ProductsService {
  categoriesRepository: any;
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly orderService: OrdersService,
  ) {}

  async getProducts(page: number, limit: number) {
    const products = await this.productRepository.getProducts(page, limit);
    if (!products.length) {
      throw new NotFoundException('No se encontraron productos');
    }
    const start = (page - 1) * limit;
    const end = start + limit;
    return products.slice(start, end);
  }

  async getProduct(id: string) {
    const product = await this.productRepository.getProduct(id);
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return product;
  }

  async addProduct() {
    try {
      await this.productRepository.addProduct();
      return 'Productos agregados exitosamente';
    } catch (error) {
      throw new BadRequestException('Error al agregar productos');
    }
  }

  async updateProduct(id: string, product) {
    const updatedProduct = await this.productRepository.updateProduct(
      id,
      product,
    );
    if (!updatedProduct) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return updatedProduct;
  }
}
