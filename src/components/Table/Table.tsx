import * as React from "react";
import { cn } from "../../utils/cn";

export interface TableColumn<T> {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor?: (row: T, index: number) => string | number;
  emptyMessage?: string;
  loading?: boolean;
  striped?: boolean;
  className?: string;
  caption?: string;
}

function Table<T extends object>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "데이터가 없습니다.",
  loading,
  striped,
  className,
  caption,
}: TableProps<T>) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={cn("w-full overflow-x-auto rounded-xl border border-[var(--color-border)]", className)}>
      <table className="w-full border-collapse text-[14px]">
        {caption && (
          <caption className="mb-2 text-[13px] text-[var(--color-muted-foreground)] caption-bottom">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-muted)]">
            {columns.map((col, i) => (
              <th
                key={String(col.key) + i}
                style={col.width ? { width: col.width } : undefined}
                className={cn(
                  "px-4 py-3 font-semibold text-[var(--color-muted-foreground)] whitespace-nowrap",
                  alignClass[col.align ?? "left"]
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-[var(--color-muted-foreground)]">
                <LoadingSpinner />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-[var(--color-muted-foreground)]">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={keyExtractor ? keyExtractor(row, rowIndex) : rowIndex}
                className={cn(
                  "border-b border-[var(--color-border)] last:border-b-0",
                  "transition-colors duration-100 hover:bg-[var(--color-muted)]/50",
                  striped && rowIndex % 2 === 1 && "bg-[var(--color-muted)]/30"
                )}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={String(col.key) + colIndex}
                    className={cn(
                      "px-4 py-3 text-[var(--color-foreground)]",
                      alignClass[col.align ?? "left"]
                    )}
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : (row[col.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center">
      <svg
        className="h-6 w-6 animate-spin text-[var(--color-primary)]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </div>
  );
}

export { Table };
