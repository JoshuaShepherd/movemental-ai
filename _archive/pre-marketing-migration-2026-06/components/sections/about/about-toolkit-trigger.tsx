import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Inverse-surface arrow link that points at the canonical Field Guide
 * landing page. Capture happens on `/field-guides/safety`, not inline.
 *
 * The legacy export name (and `source` prop) is preserved so existing call
 * sites continue to compile; the `source` value is no longer used.
 */
export function AboutToolkitTrigger({
  className,
}: {
  source?: string;
  className?: string;
}) {
  return (
    <Link
      href="/field-guides/safety"
      className={cn(
        "group/arrow inline-flex items-center gap-2 rounded-sm text-sm font-medium",
        "text-inverse-foreground/85 hover:text-inverse-foreground",
        "border-b border-inverse-foreground/25 pb-0.5 transition-colors hover:border-inverse-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverse-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-inverse-surface",
        className,
      )}
    >
      Read the Field Guide
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 transition-transform group-hover/arrow:translate-x-1"
        strokeWidth={1.5}
      />
    </Link>
  );
}
