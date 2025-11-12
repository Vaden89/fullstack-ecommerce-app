import Link from "next/link";
import { Suspense } from "react";
import { Button } from "../ui/button";
import { Product } from "@/types/product";
import { ProductCard } from "../common/product-card";
import { getTopSellingProducts } from "@/action/product";
import { ProductCardSkeleton } from "../common/product-card-skeleton";
import { ProductListFallBack } from "../common/product-list-fallback";

export const TopSellingSection = () => {
  return (
    <div className="w-full flex flex-col text-center p-5 gap-4">
      <span className="text-4xl font-bold leading-[100%]">TOP SELLING</span>
      <Suspense fallback={<ProductListFallBack />}>
        <ProductList />
      </Suspense>
      <Link href="#">
        <Button
          variant="outline"
          className="w-full sm:w-[218px] mt-4 h-12 rounded-xl sm:rounded-full font-semibold"
        >
          View All
        </Button>
      </Link>
    </div>
  );
};

const ProductList = async () => {
  let products: Product[] = [];
  const data = await getTopSellingProducts();

  if ("data" in data) {
    products = data.data;
  }

  return (
    <div className="w-full sm:grid grid-cols-4 flex overflow-x-auto gap-4 hide-scroll">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
