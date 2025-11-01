import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomTableProps<TData> {
  data: TData[];
  loading?: boolean;
  total?: number;
  pagination?: {
    pageSize: number;
    pageIndex: number;
  };
  columns: ColumnDef<TData>[];
  onPaginationChange: OnChangeFn<PaginationState>;
}

export default function CustomTable<TData>({
  data,
  columns,
  loading = false,
  total,
  onPaginationChange,
  pagination,
}: CustomTableProps<TData>) {
  const table = useReactTable({
    data: data,
    columns: columns,
    manualPagination: true,
    rowCount: total,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: onPaginationChange,
    state: {
      pagination,
    },
  });

  return (
    <div className="rounded-xl shadow flex flex-col">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 border-b ">
          <tr>
            {table.getHeaderGroups().map((hg) =>
              hg.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-4 py-3 text-left font-medium  text-gray-700 ${header.column.id === "actions" && "w-20"}`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              )),
            )}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-20 text-gray-500"
              >
                <div className="three-body">
                  <div className="three-body__dot" />
                  <div className="three-body__dot" />
                  <div className="three-body__dot" />
                </div>
              </td>
            </tr>
          ) : (
            <>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`text-gray-600 px-4 py-3 ${cell.column.id === "actions" && "w-20"}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-20 text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
      <Pagination tableLib={table} />
    </div>
  );
}

const Pagination = ({ tableLib }: { tableLib: Table<any> }) => {
  const currentPage = tableLib.getState().pagination.pageIndex;
  const pageSize = tableLib.getState().pagination.pageSize;
  const totalRows = tableLib.getRowCount();

  const startRow = currentPage * pageSize + 1;
  const endRow = Math.min((currentPage + 1) * pageSize, totalRows);

  if (totalRows === 0) return null;

  return (
    <footer className="w-full h-12 flex items-center px-4 border-t justify-between text-sm">
      <div className="text-gray-500">
        {`Showing ${startRow}-${endRow} of ${totalRows} entries`}
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="flex items-center"
          disabled={!tableLib.getCanPreviousPage()}
          onClick={tableLib.previousPage}
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </Button>
        <div></div>
        <Button
          variant="outline"
          className="flex items-center"
          disabled={!tableLib.getCanNextPage()}
          onClick={tableLib.nextPage}
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </Button>
      </div>
    </footer>
  );
};
