"use client";
import { getProductAction } from "@/action/product";
import { ProductCard } from "@/components/common/product-card";
import { ProductCardSkeleton } from "@/components/common/product-card-skeleton";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/use-pagination";
import { Product } from "@/types/product";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import useSWR from "swr";

export default function ProductsPage() {
  const [filters, setFilters] = useState();
  const { limit, page, setPagination } = usePagination();
  const { data, isLoading } = useSWR(["/products", page, limit], () =>
    getProductAction(1, 10, ""),
  );

  const productData = data?.data ?? [];
  const total = data?.meta.total ?? 0;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);
  return (
    <div className="w-full h-full mt-4">
      <h1 className="text-muted-foreground text-sm">Home &gt; Casual</h1>
      <div className="w-full grid grid-cols-5 gap-4 mt-4">
        <div className="hidden w-full h-dvh border rounded-xl sm:flex flex-col gap-3 p-4">
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
        <div className="w-full flex flex-col col-span-5 sm:col-span-4 gap-4">
          <div className="w-full flex justify-between">
            <span>All Products</span>
            <span className="text-sm text-gray-400">
              Showing {start}-{end} of {total} products
            </span>
          </div>
          {isLoading ? (
            <ProductListSkeleton />
          ) : (
            <ProductList products={productData} />
          )}
          <ProductPagination
            page={page}
            total={total}
            limit={limit}
            setPagination={setPagination}
          />
        </div>
      </div>
    </div>
  );
}

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-6">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

const ProductListSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
        return <ProductCardSkeleton key={item} />;
      })}
    </div>
  );
};

const ProductPagination = ({
  page,
  total,
  limit,
  setPagination,
}: {
  page: number;
  limit: number;
  total: number;
  setPagination: Dispatch<
    SetStateAction<{ pageSize: number; pageIndex: number }>
  >;
}) => {
  const totalPages = Math.ceil(total / limit);
  const disableNext = page >= totalPages;

  const toPrevious = () => {
    if (page != 1) {
      setPagination((p) => ({
        ...p,
        pageIndex: page - 1,
      }));
    }
  };

  const toNext = () => {
    if (!disableNext) {
      setPagination((p) => ({
        ...p,
        pageIndex: page + 1,
      }));
    }
  };

  return (
    <div className="w-full h-14 border-t mt-4 flex items-center justify-between">
      <Button disabled={page == 1} onClick={toPrevious} variant="outline">
        Previous
      </Button>
      <div className="text-sm text-gray-500">display available pages here</div>
      <Button disabled={disableNext} variant="outline">
        Next
      </Button>
    </div>
  );
};
