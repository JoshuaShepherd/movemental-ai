import { Quote } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export type MidnightStatementQuoteProps = React.ComponentProps<"figure"> & {
  quote: string;
  citation: string;
};

/**
 * Midnight band pull-quote with decorative watermark — distinct from `PullQuote` (L2b bar variant).
 * Translated from Stitch card gallery §4 (`bg-inverse-surface`).
 */
export function MidnightStatementQuote({
  quote,
  citation,
  className,
  ...props
}: MidnightStatementQuoteProps) {
  return (
    <figure
      data-slot="midnight-statement-quote"
      className={cn(
        "relative overflow-hidden rounded-xl bg-inverse-surface px-8 py-14 sm:px-12 sm:py-16 md:px-16 md:py-24",
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 p-8 text-primary/20 select-none"
      >
        <Quote className="size-[7rem] sm:size-[9rem]" strokeWidth={1} />
      </div>
      <div className="relative z-10">
        <Quote
          aria-hidden
          className="mb-8 size-12 text-primary sm:size-14"
          strokeWidth={2}
        />
        <blockquote className="mb-10 max-w-4xl text-3xl leading-tight font-medium tracking-tight text-inverse-foreground/90 md:text-5xl">
          {quote}
        </blockquote>
        <figcaption className="text-xs font-bold tracking-eyebrow text-inverse-foreground/60 uppercase not-italic">
          {citation}
        </figcaption>
      </div>
    </figure>
  );
}
