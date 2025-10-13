import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFloatPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateProductCategoryDTO } from './dto/create-product-category.dto';
import { UpdateProductCategoryDTO } from './dto/update-product-category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getCategories() {
    const data = await this.categoriesService.getCategories();

    return {
      success: true,
      data,
      message: 'Categories returned successfully',
    };
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createCategory(
    @Body() createProductCategoryDto: CreateProductCategoryDTO,
  ) {
    const data = await this.categoriesService.createCategory(
      createProductCategoryDto,
    );

    return {
      success: true,
      data,
      message: 'Product category created successfully',
    };
  }

  @Patch(':categoryId')
  @HttpCode(HttpStatus.OK)
  async editCategory(
    @Param('categoryId', ParseFloatPipe) categoryId: number,
    @Body() updateProductCategoryDto: UpdateProductCategoryDTO,
  ) {
    const data = await this.categoriesService.editCategory(
      categoryId,
      updateProductCategoryDto,
    );

    return {
      success: true,
      data,
      message: 'Category edited successfully',
    };
  }

  @Delete(':categoryId')
  @HttpCode(HttpStatus.OK)
  async deleteCategory(
    @Param('categoryId', ParseFloatPipe) categoryId: number,
  ) {
    await this.categoriesService.deleteCategory(categoryId);

    return {
      success: true,
      data: null,
      message: 'Product category deleted successfully',
    };
  }
}
