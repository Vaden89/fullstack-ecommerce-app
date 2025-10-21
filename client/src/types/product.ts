import { AbstractBaseInterface } from "./base";

export interface Product extends AbstractBaseInterface {
  name: string;

  description: string;

  price: number;

  imageUrls: string[];

  quantity: number;

  status: ProductStatus;
}

export enum ProductStatus {
  IN_STOCK = "in_stock",
  OUT_OF_STOCK = "out_of_stock",
}
