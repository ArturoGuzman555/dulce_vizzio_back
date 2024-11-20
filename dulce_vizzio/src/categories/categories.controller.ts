import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('seeder')
  addCategories() {
    return this.categoriesService.addCategories();
  }
  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'Categories retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
