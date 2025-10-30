import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { RoleGuard } from '~/guards/role.gaurd';
import { AvailableRoles } from '~/common/data/roles';
import { Roles } from '~/decorators/roles.decorator';

@Roles([AvailableRoles.ADMIN])
@UseGuards(RoleGuard)
@Controller('admin/products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() createProductDto: CreateProductDTO) {
    const data = await this.productService.createProduct(createProductDto);

    return {
      success: true,
      data,
      message: 'Product created successfully',
    };
  }

  @Patch(':productId')
  @HttpCode(HttpStatus.OK)
  async editProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() updateProductDto: UpdateProductDTO,
  ) {
    const data = await this.productService.editProduct(
      productId,
      updateProductDto,
    );

    return {
      success: true,
      data,
      message: 'Product details have been updated successfully',
    };
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('productId', ParseUUIDPipe) productId: string) {
    await this.productService.deleteProduct(productId);

    return {
      success: true,
      data: null,
      message: 'Product deleted successfully',
    };
  }

  @Put(':productId/out-of-stock')
  @HttpCode(HttpStatus.OK)
  async markProductAsOutOfStock(
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    await this.productService.markProductAsOutOfStock(productId);

    return {
      success: true,
      data: null,
      message: 'Product successfully set to out of stock',
    };
  }
}
