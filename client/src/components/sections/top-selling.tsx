import Link from "next/link";
import { ProductCardSkeleton } from "../common/product-card-skeleton";
import { Button } from "../ui/button";

export const TopSellingSection = () => {
  return (
    <div className="w-full flex flex-col text-center p-5 gap-4">
      <span className="text-4xl font-bold leading-[100%]">TOP SELLING</span>
      <div className="w-full flex overflow-x-auto gap-4 hide-scroll">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
      <Link href="#">
        <Button
          variant="outline"
          className="w-full mt-4 h-12 rounded-xl font-semibold"
        >
          View All
        </Button>
      </Link>
    </div>
  );
};
