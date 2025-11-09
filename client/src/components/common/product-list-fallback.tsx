import { ProductCardSkeleton } from "./product-card-skeleton";

export const ProductListFallBack = () => {
  return (
    <div className="w-full sm:grid grid-cols-4 flex overflow-x-auto gap-4 hide-scroll">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  );
};
