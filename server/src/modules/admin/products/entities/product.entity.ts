import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategory } from '../categories/entities/category.entity';

export enum ProductStatus {
  IN_STOCK = 'in_stock',
  OUT_OF_STOCK = 'out_of_stock',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ fulltext: true })
  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column('varchar', { array: true })
  imageUrls: string[];

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.IN_STOCK,
  })
  status: ProductStatus;

  //RELATIONS

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.products,
  )
  category: ProductCategory;

  //META

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
