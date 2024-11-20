import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/Entities/categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Categories> {
    const category = this.categoriesRepository.create(createCategoryDto);
    return await this.categoriesRepository.save(category);
  }

  async getCategories(): Promise<Categories[]> {
    return await this.categoriesRepository.find();
  }

  async getCategoryById(id: string): Promise<Categories> {
    return await this.categoriesRepository.findOne({ where: { id } });
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Categories> {
    await this.categoriesRepository.update(id, updateCategoryDto);
    return this.getCategoryById(id); // Retorna la categoría actualizada
  }

  async deleteCategory(id: string): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
