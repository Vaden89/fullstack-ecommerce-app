import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface CustomTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
}

export default function CustomTable<TData>({
  data,
  columns,
}: CustomTableProps<TData>) {
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-xl shadow">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
        </tbody>
      </table>
    </div>
  );
}
