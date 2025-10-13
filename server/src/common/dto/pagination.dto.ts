import { IsNumber, IsOptional, IsPositive } from '@nestjs/class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit: number = 10;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  page: number = 1;
}
