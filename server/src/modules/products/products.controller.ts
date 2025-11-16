import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PaginationDTO } from '~/common/dto/pagination.dto';
import { SkipAuth } from '~/decorators/bypass-auth.decorator';

@SkipAuth()
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('')
  async getProducts(
    @Query() paginationDto: PaginationDTO,
    @Query('q') query: string,
  ) {
    const data = await this.productService.getProducts(paginationDto, query);

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
