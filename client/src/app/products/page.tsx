"use client";
import { getProductAction } from "@/action/product";
import { ProductCardSkeleton } from "@/components/common/product-card-skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useSWR from "swr";

export default function ProductsPage() {
  const { data, isLoading } = useSWR("/", () => getProductAction(1, 10, ""));

  console.log(data);

  return (
    <div className="w-full h-full mt-4">
      <h1 className="text-muted-foreground text-sm">Home &gt; Casual</h1>
      <div className="w-full grid grid-cols-5 gap-4 mt-4">
        <div className="w-full h-dvh border rounded-xl flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-xl">Filters</span>
            <Image
              src="/icons/filter-gray.svg"
              alt="Filter Icon"
              width={24}
              height={24}
            />
          </div>
          <hr />
          <div className="flex flex-col">
            <span className="font-semibold">Price</span>
            <span>Price Range toogle goes here</span>
          </div>
          <hr />
          <div className="flex flex-col">
            <span className="font-semibold">Category</span>
            <span>Category toogle goes here</span>
          </div>
        </div>
        <div className="w-full flex flex-col col-span-4 gap-4">
          <div className="w-full flex justify-between">
            <span>All Products</span>
            <span className="text-sm text-gray-400">
              Showing 1-10 of 100 products
            </span>
          </div>
          {isLoading ? <ProductListSkeleton /> : <ProductList />}
          <div className="w-full h-14 border-t mt-4 flex items-center justify-between">
            <Button variant="outline">Previous</Button>
            <div className="text-sm text-gray-500">
              display available pages here
            </div>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductList = () => {
  return <div className="w-full grid grid-cols-3 gap-6"></div>;
};

const ProductListSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
        return <ProductCardSkeleton key={item} />;
      })}
    </div>
  );
};
