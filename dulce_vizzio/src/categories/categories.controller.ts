import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorators';
import { AuthGuard } from 'src/auth/guards/auth-guard.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/users/roles.enum';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías obtenidas exitosamente.',
  })
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiResponse({
    status: 200,
    description: 'Categoría obtenida exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  async getCategory(@Param('id') id: string) {
    return await this.categoriesService.getCategory(id);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin)
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada exitosamente.',
  })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin)
  @ApiOperation({ summary: 'Actualizar una categoría existente' })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles(Role.SuperAdmin) // Solo para SuperAdmin
  @ApiOperation({ summary: 'Eliminar una categoría' })
  @ApiResponse({
    status: 200,
    description: 'Categoría eliminada exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  async deleteCategory(@Param('id') id: string) {
    return await this.categoriesService.deleteCategory(id);
  }
}
