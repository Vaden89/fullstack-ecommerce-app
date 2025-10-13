import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductCategoryDTO } from './dto/create-product-category.dto';
import { CustomHttpException } from '~/helpers/custom.exception';
import { UpdateProductCategoryDTO } from './dto/update-product-category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly categoryRepository: Repository<ProductCategory>,
  ) {}

  async createCategory(categoryDetails: CreateProductCategoryDTO) {
    let category = await this.categoryRepository.findOne({
      where: {
        name: categoryDetails.name,
      },
    });

    if (!category) {
      throw new CustomHttpException(
        'A category with that name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    category = this.categoryRepository.create({
      name: categoryDetails.name,
      description: categoryDetails.description,
    });

    category = await this.categoryRepository.save(category);

    return { category };
  }

  async getCategories() {
    const categories = await this.categoryRepository.find();

    return { categories };
  }

  async editCategory(
    categoryId: number,
    categoryDetails: UpdateProductCategoryDTO,
  ) {
    const category = await this.categoryRepository.preload({
      id: categoryId,
      ...categoryDetails,
    });

    if (!category) {
      throw new CustomHttpException('Category Not Found', HttpStatus.NOT_FOUND);
    }

    return { category };
  }

  async deleteCategory(categoryId: number) {
    const result = await this.categoryRepository.softDelete(categoryId);

    if (result.affected === 0) {
      throw new CustomHttpException('Category Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
