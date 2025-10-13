import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductStatus } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { CustomHttpException } from '~/helpers/custom.exception';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(productDetails: CreateProductDTO) {
    const product = this.productRepository.create({
      name: productDetails.name,
      price: productDetails.price,
      imageUrls: productDetails.images,
      quantity: productDetails.quantity,
      description: productDetails.description,
    });

    await this.productRepository.save(product);
    return { product };
  }

  async editProduct(productId: string, productDetails: UpdateProductDTO) {
    const product = await this.productRepository.preload({
      id: productId,
      ...productDetails,
    });

    if (!product) {
      throw new CustomHttpException('Invalid Product Id', HttpStatus.NOT_FOUND);
    }

    return { product };
  }

  async deleteProduct(productId: string) {
    const result = await this.productRepository.softDelete(productId);

    if (result.affected === 0) {
      throw new CustomHttpException(
        'Invalid Product Id Passed',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async markProductAsOutOfStock(productId: string) {
    const product = await this.productRepository.preload({
      id: productId,
      status: ProductStatus.OUT_OF_STOCK,
    });

    if (!product) {
      throw new CustomHttpException('Product Not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }
}
