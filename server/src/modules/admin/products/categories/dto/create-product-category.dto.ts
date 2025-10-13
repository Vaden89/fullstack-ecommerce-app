import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateProductCategoryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
