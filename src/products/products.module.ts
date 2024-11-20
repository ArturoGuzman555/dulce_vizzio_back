import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './producst.service';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/Entities/products.entity';
import { Categories } from 'src/Entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
