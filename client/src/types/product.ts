import { AbstractBaseInterface } from "./base";
import { Category, testCategories } from "./category";

export interface Product extends AbstractBaseInterface {
  name: string;

  description: string;

  price: number;

  imageUrls: string[];

  quantity: number;

  status: ProductStatus;

  category: Category;
}

export enum ProductStatus {
  IN_STOCK = "in_stock",
  OUT_OF_STOCK = "out_of_stock",
}

export const testProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Experience immersive sound and noise cancellation with up to 30 hours of battery life.",
    price: 299.99,
    imageUrls: [
      "https://example.com/images/headphones-1.jpg",
      "https://example.com/images/headphones-2.jpg",
    ],
    quantity: 25,
    status: ProductStatus.IN_STOCK,
    category: testCategories[0],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Mechanical Keyboard",
    description:
      "Tactile and responsive keys with customizable RGB lighting and hot-swappable switches.",
    price: 129.99,
    imageUrls: [
      "https://example.com/images/keyboard-1.jpg",
      "https://example.com/images/keyboard-2.jpg",
    ],
    quantity: 0,
    status: ProductStatus.OUT_OF_STOCK,
    category: testCategories[1],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "4K Ultra HD Monitor",
    description:
      "A stunning 27-inch 4K display with ultra-thin bezels, HDR support, and 144Hz refresh rate.",
    price: 499.99,
    imageUrls: [
      "https://example.com/images/monitor-1.jpg",
      "https://example.com/images/monitor-2.jpg",
    ],
    quantity: 10,
    status: ProductStatus.IN_STOCK,
    category: testCategories[2],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    description:
      "Adjustable lumbar support and breathable mesh fabric for long working hours.",
    price: 259.0,
    imageUrls: [
      "https://example.com/images/chair-1.jpg",
      "https://example.com/images/chair-2.jpg",
    ],
    quantity: 5,
    status: ProductStatus.IN_STOCK,
    category: testCategories[3],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
