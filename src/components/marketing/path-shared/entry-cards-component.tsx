import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Reusable three-card entry pattern for segment hero sections. Each card names
 * a recognized buyer situation, what to start with, and a CTA. The third card
 * always carries the Safety-first guarantee line, which the rendered output
 * appends automatically and cannot be removed by the consumer.
 */

export const ENTRY_CARDS_GUARANTEE =
  "We'll confirm Safety is in place — ours or yours — before we build.";

export interface EntryCard {
  heading: string;
  body: string;
  ctaLabel: string;
  href: string;
}

interface EntryCardsComponentProps {
  /** Exactly three cards. The third is rendered with the Safety guarantee. */
  cards: readonly [EntryCard, EntryCard, EntryCard];
  className?: string;
}

export function EntryCardsComponent({
  cards,
  className,
}: EntryCardsComponentProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-3", className)}>
      {cards.map((card, idx) => {
        const isThird = idx === 2;
        return (
          <Link
            key={card.heading}
            href={card.href}
            className={cn(
              "group flex flex-col gap-5 rounded-card border border-border bg-card p-7 transition-colors md:p-8",
              "hover:border-primary/40 focus-visible:border-primary/40",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
            )}
          >
            <h3 className="font-serif text-xl italic leading-snug tracking-tight text-foreground md:text-2xl">
              {card.heading}
            </h3>
            <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">
              {card.body}
            </p>
            {isThird ? (
              <p className="text-sm leading-relaxed text-muted-foreground/90 italic">
                {ENTRY_CARDS_GUARANTEE}
              </p>
            ) : null}
            <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity group-hover:opacity-80">
              {card.ctaLabel}
              <ArrowUpRight
                className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
