import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Categories } from 'src/Entities/categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async getCategories(): Promise<Categories[]> {
    return await this.categoriesRepository.getCategories();
  }

  async getCategory(id: string): Promise<Categories> {
    const category = await this.categoriesRepository.getCategoryById(id);
    if (!category) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    return category;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Categories> {
    return this.categoriesRepository.createCategory(createCategoryDto);
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Categories> {
    const category = await this.getCategory(id);
    if (!category) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    return this.categoriesRepository.updateCategory(id, updateCategoryDto);
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await this.getCategory(id);
    if (!category) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    return this.categoriesRepository.deleteCategory(id);
  }
}
