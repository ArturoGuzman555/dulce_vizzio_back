import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/Entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/archivo.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async addCategories() {
    for (const element of data) {
      const categoryExists = await this.categoriesRepository.findOne({
        where: { name: element.category },
      });

      if (!categoryExists) {
        await this.categoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Categories)
          .values({ name: element.category })
          .execute();
      }
    }
    return 'Categorías agregadas';
  }
}
