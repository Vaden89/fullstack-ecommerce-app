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

  async getProducts({ limit, page }: PaginationDTO, query: string) {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (query && query.trim()) {
      queryBuilder.where('product.name ILIKE :query', {
        query: `%${query}%`,
      });
    }

    const [products, total] = await queryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();

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
