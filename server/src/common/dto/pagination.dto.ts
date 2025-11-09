import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  limit: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  page: number = 1;
}
