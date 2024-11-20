import {
  Controller,
  Get,
  Put,
  Param,
  Query,
  Body,
  UseGuards,
  Post,
} from '@nestjs/common';
import { ProductsService } from './producst.service';
import { AuthGuard } from 'src/auth/guards/auth-guard.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/users/roles.enum';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from './products.dto';

@ApiTags('products')
@Controller('products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 2,
  ) {
    if (page && limit) return this.productsService.getProducts(page, limit);
    return this.productsService.getProducts(page, limit);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.productsService.getProduct(id);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateProductDto })
  async updateProduct(@Param('id') id: string, @Body() product) {
    return await this.productsService.updateProduct(id, product);
  }
}
