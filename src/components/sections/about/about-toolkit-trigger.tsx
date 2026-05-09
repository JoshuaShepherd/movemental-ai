"use client";

import { ArrowRight } from "lucide-react";

import { useToolkitModal } from "@/components/toolkit/toolkit-modal-context";
import { cn } from "@/lib/utils";

/**
 * AboutToolkitTrigger — small client island that opens the shared
 * `<ToolkitDownloadModal />` from inside the otherwise-static `/about` page.
 * Rendered as the closing arrow link in the closing CTA section.
 *
 * The `source` prop is recorded on the lead so day-0 / day-3 / day-7
 * sequences can segment by surface (matches the convention used by
 * `ToolkitOpenButton`).
 */
export function AboutToolkitTrigger({
  source = "about-closing",
  className,
}: {
  source?: string;
  className?: string;
}) {
  const { open } = useToolkitModal();
  return (
    <button
      type="button"
      onClick={() => open({ source })}
      className={cn(
        "group/arrow inline-flex items-center gap-2 rounded-sm text-sm font-medium",
        "text-inverse-foreground/85 hover:text-inverse-foreground",
        "border-b border-inverse-foreground/25 pb-0.5 transition-colors hover:border-inverse-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverse-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-inverse-surface",
        className,
      )}
    >
      Download the toolkit
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 transition-transform group-hover/arrow:translate-x-1"
        strokeWidth={1.5}
      />
    </button>
  );
}
