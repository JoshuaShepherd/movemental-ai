import * as React from "react";

import { cn } from "@/lib/utils";

type PullQuoteVariant = "default" | "midnight";

const variantClassName: Record<PullQuoteVariant, string> = {
  default: "bg-section text-foreground",
  midnight:
    "bg-inverse-foreground/6 text-inverse-foreground [&_.pull-quote__body]:text-inverse-foreground/85 [&_.pull-quote__cite]:text-inverse-foreground/60 [&_cite]:text-inverse-foreground",
};

/**
 * L2b pull quote — short attributed quotation (DESIGN.md §14.2 `.pull-quote` parity).
 */
export function PullQuote({
  className,
  quote,
  attribution,
  source,
  variant = "default",
  ...props
}: React.ComponentProps<"blockquote"> & {
  quote: string;
  attribution: string;
  /** Optional subtitle (role, publication). */
  source?: string;
  variant?: PullQuoteVariant;
}) {
  return (
    <blockquote
      data-slot="pull-quote"
      data-variant={variant}
      className={cn(
        "pull-quote relative rounded-xl px-6 py-8 sm:px-8",
        "before:absolute before:top-8 before:left-4 before:h-[calc(100%-4rem)] before:w-1 before:rounded-full before:bg-primary sm:before:left-6",
        variantClassName[variant],
        className
      )}
      {...props}
    >
      <p className="pull-quote__body pl-4 text-lg leading-snug font-medium tracking-tight sm:text-xl">
        {quote}
      </p>
      <footer className="pull-quote__cite mt-4 border-0 pl-4 text-sm not-italic text-muted-foreground">
        <cite className="font-semibold not-italic text-foreground">
          {attribution}
        </cite>
        {source ? (
          <>
            <span className="text-muted-foreground"> — </span>
            <span>{source}</span>
          </>
        ) : null}
      </footer>
    </blockquote>
  );
}
