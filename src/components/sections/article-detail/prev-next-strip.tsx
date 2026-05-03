import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { Article } from "@/lib/articles";
import { cn } from "@/lib/utils";

/**
 * Tonal prev/next nav placed under the body on canon and series detail pages.
 * Hairline top divider, no boxes — matches Concept Modern editorial register.
 */
export function PrevNextStrip({
  label,
  prev,
  next,
  className,
}: {
  label: string;
  prev: Article | null;
  next: Article | null;
  className?: string;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label={label}
      className={cn(
        "mt-10 grid grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-2",
        className,
      )}
    >
      <div className={cn("min-w-0", !prev && "invisible")}>
        {prev ? (
          <Link
            href={`/articles/${prev.slug}`}
            className="group block text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-eyebrow text-ink-soft">
              <ArrowLeft className="size-3.5" aria-hidden />
              Previous
            </span>
            <span className="mt-2 block text-[1.02rem] font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
              {prev.title}
            </span>
          </Link>
        ) : null}
      </div>
      <div className={cn("min-w-0 sm:text-right", !next && "invisible")}>
        {next ? (
          <Link
            href={`/articles/${next.slug}`}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-eyebrow text-ink-soft">
              Next
              <ArrowRight className="size-3.5" aria-hidden />
            </span>
            <span className="mt-2 block text-[1.02rem] font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
              {next.title}
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
