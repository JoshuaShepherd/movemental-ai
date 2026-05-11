"use client";

import { Printer } from "lucide-react";

/**
 * Tiny client component used by server-rendered export pages — kicks off the
 * browser's print dialog. Hidden from print output via `print:hidden`.
 */
export function PrintButton({ label = "Download PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 bg-[color:var(--destructive)] px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.08em] text-[color:var(--destructive-foreground)] transition-opacity hover:opacity-90 print:hidden"
    >
      <Printer className="size-3.5" aria-hidden />
      {label}
    </button>
  );
}
