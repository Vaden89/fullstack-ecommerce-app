import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../admin/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomHttpException } from '~/helpers/custom.exception';
import { PaginationDTO } from '~/common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProduct(productId: string) {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new CustomHttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return { product };
  }

  async getProducts({ limit, page }: PaginationDTO) {
    const [products, total] = await this.productRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: products,
      meta: {
        total,
        current: page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
