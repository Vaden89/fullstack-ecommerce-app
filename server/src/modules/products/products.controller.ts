import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PaginationDTO } from '~/common/dto/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('')
  async getProducts(@Query() paginationDto: PaginationDTO) {
    const data = await this.productService.getProducts(paginationDto);

    return {
      success: true,
      data,
      message: 'Products returned successfully',
    };
  }

  @Get(':productId')
  async getProductById(@Param('productId', ParseUUIDPipe) productId: string) {
    const data = await this.productService.getProduct(productId);

    return {
      success: true,
      data,
      message: 'Product returned successfully',
    };
  }
}
