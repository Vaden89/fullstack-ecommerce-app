import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCategoryDTO } from './create-product-category.dto';

export class UpdateProductCategoryDTO extends PartialType(
  CreateProductCategoryDTO,
) {}
