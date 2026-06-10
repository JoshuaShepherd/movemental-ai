"use client";

import { useState } from "react";
import { History } from "lucide-react";

import { cn } from "@/lib/utils";

type RevisionMarkProps = {
  contributorName: string;
  date: string;
  summary: string;
  className?: string;
};

export function RevisionMark({
  contributorName,
  date,
  summary,
  className,
}: RevisionMarkProps) {
  const [open, setOpen] = useState(false);

  return (
    <span data-slot="revision-mark" className={cn("relative inline", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center align-super text-[0.6rem] text-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
        aria-label={`Revision credit: ${summary}`}
      >
        <History className="h-3 w-3" aria-hidden />
      </button>
      {open && (
        <span className="absolute left-0 top-full z-20 mt-1 w-64 rounded-lg bg-elevated p-3 text-xs shadow-ambient">
          <span className="mb-1 block font-semibold text-foreground">
            Revised {date}
          </span>
          <span className="block text-muted-foreground">{summary}</span>
          <span className="mt-2 block text-muted-foreground/70">
            Credit: <span className="font-medium text-foreground">{contributorName}</span>
          </span>
        </span>
      )}
    </span>
  );
}
