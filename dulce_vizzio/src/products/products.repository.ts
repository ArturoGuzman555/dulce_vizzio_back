import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/Entities/categories.entity';
import { Products } from 'src/Entities/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './products.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Products> {
    const category = await this.categoriesRepository.findOneBy({
      id: createProductDto.categoryId,
    });

    if (!category) {
      throw new NotFoundException(
        `Categoría con id ${createProductDto.categoryId} no encontrada`,
      );
    }

    const product = this.productsRepository.create({
      ...createProductDto,
      category,
    });

    return this.productsRepository.save(product);
  }

  async getProducts(page: number, limit: number): Promise<Products[]> {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);

    return products;
  }

  async getProduct(id: string): Promise<Products> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    return product;
  }

  async updateProduct(id: string, product: Products) {
    await this.productsRepository.update(id, product);
    const updatedProduct = await this.productsRepository.findOneBy({ id });
    return updatedProduct;
  }
}
