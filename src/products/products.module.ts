import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './producst.service';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/Entities/products.entity';
import { Categories } from 'src/Entities/categories.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { FileUploadRepository } from 'src/file-upload/file-upload.repository';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Categories]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    FileUploadService,
    FileUploadRepository,
  ],
})
export class ProductsModule {}
