import {
  Controller,
  Get,
  Put,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './producst.service';
import { AuthGuard } from 'src/auth/guards/auth-guard.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/users/roles.enum';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './products.dto';

@ApiTags('products')
@Controller('products')
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
  @Get('seeder')
  addProducts() {
    return this.productsService.addProduct();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.productsService.getProduct(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateProductDto })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async updateProduct(@Param('id') id: string, @Body() product) {
    return await this.productsService.updateProduct(id, product);
  }
}
