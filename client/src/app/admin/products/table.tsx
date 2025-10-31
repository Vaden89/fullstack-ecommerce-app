"use client";
import { getProductAction } from "@/action/product";
import { useProductColumns } from "@/components/columns/product";
import CustomTable from "@/components/common/table";
import { usePagination } from "@/hooks/use-pagination";
import { Product, testProducts } from "@/types/product";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

export const ProductTable = () => {
  const columns = useProductColumns();
  const [searchField, setSearchField] = useState("");
  const { pagination, setPagination, limit, page } = usePagination();

  const { data, error, isLoading } = useSWR("/products", () =>
    getProductAction(page, limit, searchField),
  );

  const products: Product[] = data?.data ?? [];
  const total = data?.meta?.total ?? 0;

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className="w-full">
      <CustomTable
        total={total}
        data={products}
        columns={columns}
        loading={isLoading}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
    </div>
  );
};
