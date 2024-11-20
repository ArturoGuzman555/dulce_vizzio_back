import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/Entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(productId: string, file: Express.Multer.File) {
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product) throw new NotFoundException('Producto no encontrado');
    const uploadedImage = await this.fileUploadRepository.uploadImage(file);
    await this.productsRepository.update(productId, {
      imgUrl: uploadedImage.secure_url,
    });

    return await this.productsRepository.findOneBy({ id: productId });
  }
}
