import * as React from "react";

import { ArrowLink, Eyebrow, SurfaceCard } from "@/components/primitives";
import type { SurfaceCardTone } from "@/components/primitives/surface-card";
import { cn } from "@/lib/utils";

export type BookReferenceProps = {
  /** Optional overline above the title. */
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  /** SurfaceCard tonal placement — match the parent section background. */
  cardTone?: SurfaceCardTone;
  className?: string;
};

/**
 * Inline editorial bridge to the manuscript — not a promo tile.
 * Use on audience and system pages where depth should precede conversion.
 */
export function BookReference({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  cardTone = "on-background",
  className,
}: BookReferenceProps) {
  return (
    <SurfaceCard
      data-slot="book-reference"
      tone={cardTone}
      className={cn("gap-5 shadow-none", className)}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
          {title}
        </h3>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      </div>
      <ArrowLink href={href} tone="primary" size="md" className="mt-1 w-fit">
        {linkLabel}
      </ArrowLink>
    </SurfaceCard>
  );
}
