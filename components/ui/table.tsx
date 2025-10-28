"use client";

import ArrowLeft from "@/assets/icons/ArrowLeft";
import { Button } from "@/components/ui/button";
import { PaginationDataType } from "@/hooks/usePagination";
import { cn, getPaginationNumber } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b bg-background", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("bg-white [&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-[12px] text-secondary-foreground py-4 px-6 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "py-4 px-6 text-[14px] align-middle break-words [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: PaginationDataType;
  handlePageChange?: (page: number) => void;
  onRowClick?: (row: TData) => void;
}

function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  handlePageChange,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const { currentPage, hasNext, hasPrevious, totalPages } = pagination ?? {
    currentPage: 1,
    totalPages: 1,
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(pagination
      ? {
          state: {
            pagination: {
              pageIndex: currentPage,
              pageSize: 10,
            },
          },
          onPaginationChange: () => {
            // onPageChange?.(newPagination)
          },
          manualPagination: true,
          pageCount: totalPages,
        }
      : {}),
  });

  return (
    <div className="overflow-hidden rounded-[12px] border">
      <Table className="table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => onRowClick?.(row.original)}
                style={{ cursor: onRowClick ? "pointer" : "default" }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pagination && Array.isArray(data) && totalPages > 1 && (
        <div className="assessmentPagination | border-t border-border bg-background py-3 px-6 flex justify-between items-center gap-4">
          <Button
            variant={"secondary"}
            className="font-semibold gap-1.5 px- 3 text-[12px]"
            onClick={() => handlePageChange?.(currentPage - 1)}
            disabled={!hasPrevious}
          >
            <ArrowLeft stroke="currentcolor" size={12} />
            Previous
          </Button>
          <div className="flex">
            {getPaginationNumber(currentPage, totalPages).map((page, index) => (
              <Button
                key={index}
                variant={
                  typeof page === "number" && page == currentPage
                    ? "secondary"
                    : "ghost"
                }
                className={`font-semibold text-[12px] ${
                  typeof page === "number" ? "w-8" : "w-12"
                }`}
                disabled={typeof page !== "number"}
                onClick={() => {
                  if (typeof page === "number") handlePageChange?.(page);
                }}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant={"secondary"}
            className="font-semibold gap-1.5 px-3 text-[12px]"
            disabled={!hasNext}
            onClick={() => handlePageChange?.(currentPage + 1)}
          >
            Next
            <ArrowLeft className="rotate-180" stroke="currentcolor" size={12} />
          </Button>
        </div>
      )}
    </div>
  );
}

export {
  DataTable,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
