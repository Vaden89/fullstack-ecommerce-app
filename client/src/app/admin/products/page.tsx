"use client";
import { useEffect } from "react";
import { ProductTable } from "./table";
import { usePage } from "@/contexts/admin-page-provider";
import { AddProductBtn } from "@/components/admin/product/add-product";

export default function AdminProductsPage() {
  const { setPageTitle } = usePage();

  useEffect(() => {
    setPageTitle("Products");
  }, [setPageTitle]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <span className="text-2xl font-semibold">Products List</span>
        <AddProductBtn />
      </div>
      <ProductTable />
    </div>
  );
}
