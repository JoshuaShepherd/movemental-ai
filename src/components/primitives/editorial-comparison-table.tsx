import * as React from "react";

import { cn } from "@/lib/utils";

export type EditorialComparisonColumn = {
  id: string;
  label: string;
};

export type EditorialComparisonRow = {
  id: string;
  label: string;
  /** Cell content keyed by column `id`. */
  cells: Record<string, React.ReactNode>;
};

/**
 * Tonal comparison matrix — no zebra “spreadsheet” borders between major sections.
 * Row rhythm uses surface alternation (`background` / `section`) per DESIGN.md §3.1.
 */
export function EditorialComparisonTable({
  className,
  caption,
  columns,
  rows,
  ...props
}: React.ComponentProps<"div"> & {
  caption?: string;
  columns: EditorialComparisonColumn[];
  rows: EditorialComparisonRow[];
}) {
  return (
    <div
      data-slot="editorial-comparison-table"
      className={cn(
        "overflow-hidden rounded-xl bg-card shadow-ambient",
        className
      )}
      {...props}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          {caption ? (
            <caption className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {caption}
            </caption>
          ) : null}
          <thead>
            <tr className="bg-elevated text-foreground">
              <th
                scope="col"
                className="w-[min(30%,220px)] px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase"
              >
                Topic
              </th>
              {columns.map((col) => (
                <th
                  key={col.id}
                  scope="col"
                  className="px-4 py-3 text-xs font-semibold tracking-wide text-foreground uppercase"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {rows.map((row, index) => (
              <tr
                key={row.id}
                className={cn(
                  index % 2 === 0 ? "bg-background" : "bg-section/80",
                  "[&_strong]:text-foreground"
                )}
              >
                <th
                  scope="row"
                  className="max-w-[220px] px-4 py-3 text-left text-sm font-medium text-foreground"
                >
                  {row.label}
                </th>
                {columns.map((col) => (
                  <td key={col.id} className="px-4 py-3 align-top leading-relaxed">
                    {row.cells[col.id] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
