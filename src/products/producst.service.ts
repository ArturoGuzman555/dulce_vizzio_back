import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './products.dto';

@Injectable()
export class ProductsService {
  categoriesRepository: any;
  constructor(private readonly productRepository: ProductsRepository) {}

  // Servicio: products.service.ts
  async createProduct(createProductDto: CreateProductDto) {
    try {
      return await this.productRepository.createProduct(createProductDto);
    } catch (error) {
      if (error.message.includes('ya existe')) {
        throw new Error('Ya existe un producto con este nombre.');
      }
      throw error;
    }
  }

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
