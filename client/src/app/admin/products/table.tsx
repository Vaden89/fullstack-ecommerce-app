"use client";
import { useProductColumns } from "@/components/columns/product";
import CustomTable from "@/components/common/table";
import { testProducts } from "@/types/product";

export const ProductTable = () => {
  const columns = useProductColumns();

  return (
    <div className="w-full">
      <CustomTable columns={columns} data={testProducts} />
    </div>
  );
};
