import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";

export const useProductColumns = ({
  setProduct,
  setModalAction,
}: {
  setProduct: (product: Product) => void;
  setModalAction: (action: string) => void;
}): ColumnDef<Product>[] => {
  return [
    {
      header: "Id",
      accessorKey: "id",
      cell: ({ row }) => {
        console.log(row.original);
        return `product-${row.original.id}`;
      },
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => row.original.name,
    },
    {
      header: "Category",
      accessorFn: (row) => row.category.name,
      cell: ({ row }) => {
        return `-`;
      },
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
            setModalAction("delete");
            setProduct(row.original);
          }}
        >
          Delete
        </button>
      ),
    },
  ];
};
