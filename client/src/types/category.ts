import { AbstractBaseInterface } from "./base";

export interface Category extends AbstractBaseInterface {
  id: string;
  name: string;
  description: string;
}

export const testCategories: Category[] = [
  {
    id: "c1",
    name: "Audio",
    description: "Headphones, earphones, and speakers for quality sound.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "c2",
    name: "Accessories",
    description: "Computer peripherals and desk accessories.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "c3",
    name: "Displays",
    description: "Monitors, screens, and display-related devices.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "c4",
    name: "Furniture",
    description: "Ergonomic and office-friendly furniture.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
