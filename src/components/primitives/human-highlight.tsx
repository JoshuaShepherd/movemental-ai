import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Irregular fluorescent marker (design reference: docs/html/highlighter-human-layer.html example 3).
 *
 * Reserve for one pivotal phrase per major fold — not lists, not legal boilerplate,
 * not citation-linked statistical claims (those use `<Cite />` / `.marker`).
 */
export function HumanHighlightEx3({
  children,
  className,
  inverse,
}: {
  children: ReactNode;
  className?: string;
  /** Midnight / inverse-ink surfaces where multiply blend would not read */
  inverse?: boolean;
}) {
  return (
    <span className={cn("human-highlight-ex3", inverse && "human-highlight-ex3--inverse", className)}>
      {children}
    </span>
  );
}
