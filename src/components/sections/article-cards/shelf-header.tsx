import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Section-scale heading used above each shelf on `/articles` and the collection
 * pages. Left-aligned title with an optional deck + right-aligned count pill
 * and optional "See all" arrow link.
 */
export function ShelfHeader({
  title,
  deck,
  count,
  seeAllHref,
  seeAllLabel = "See all",
  className,
}: {
  title: React.ReactNode;
  deck?: React.ReactNode;
  count?: number | null;
  seeAllHref?: string;
  seeAllLabel?: string;
  className?: string;
}) {
  const pieceLabel = count == null ? null : `${String(count).padStart(2, "0")} ${count === 1 ? "piece" : "pieces"}`;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6",
        className,
      )}
    >
      <div className="min-w-0 max-w-[60ch]">
        <h2 className="text-balance text-[clamp(1.4rem,2.4vw,1.75rem)] leading-snug font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {deck ? (
          <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{deck}</p>
        ) : null}
      </div>
      <div className="flex items-baseline gap-5 shrink-0 text-sm">
        {pieceLabel ? (
          <span className="font-medium uppercase tabular-nums tracking-eyebrow text-ink-soft">
            {pieceLabel}
          </span>
        ) : null}
        {seeAllHref ? (
          <Link
            href={seeAllHref}
            className="group inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline"
          >
            {seeAllLabel}
            <ArrowRight className="size-3.5 text-primary transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
