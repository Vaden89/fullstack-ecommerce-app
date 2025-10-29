import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";

export const useProductColumns = (): ColumnDef<Product>[] => {
  return [
    {
      header: "Id",
      accessorKey: "id",
      cell: ({ row }) => `product-${row.original.id}`,
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => row.original.name,
    },
    {
      header: "Category",
      accessorFn: (row) => row.category.name,
      cell: ({ row }) => row.original.category.name,
    },
    {
      header: "Stock",
      accessorKey: "quantity",
      cell: ({ row }) => row.original.quantity,
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ row }) => Number(row.original.price).toLocaleString(),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => row.original.status,
    },
    {
      header: "Action",
      accessorKey: "actions",
      cell: ({ row }) => (
        <button
          className="w-full text-center"
          onClick={() => {
            /* TODO: Implement edit action */
          }}
        >
          Edit
        </button>
      ),
    },
  ];
};
