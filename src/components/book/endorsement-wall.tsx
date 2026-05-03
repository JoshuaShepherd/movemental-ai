"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { Container, Display, Eyebrow, Section } from "@/components/primitives";
import type { AudienceLens } from "@/lib/book-types";

import { EndorsementCard, type Endorsement } from "./endorsement-card";

type EndorsementWallProps = {
  endorsements: Endorsement[];
  className?: string;
};

/**
 * Placeholder endorsements when the database has no approved rows yet.
 */
export const placeholderEndorsements: Endorsement[] = [
  {
    id: "1",
    quote:
      "This book names what I've been feeling but couldn't articulate — the gap between what AI makes easy and what formation actually requires.",
    endorserName: "Early Reader",
    endorserTitle: "Church Planter",
    endorserOrg: "Midwest network",
    featured: true,
    audienceLens: "churches",
  },
  {
    id: "2",
    quote:
      "Finally, a framework that doesn't ask me to choose between using AI and keeping my integrity. The amplification/replacement distinction changed how our team talks about content.",
    endorserName: "Early Reader",
    endorserTitle: "Nonprofit Executive Director",
    featured: true,
    audienceLens: "nonprofits",
  },
  {
    id: "3",
    quote:
      "I expected a tech manual. Instead I got a pastoral guide that takes both the crisis and the opportunity seriously. The scenius chapter alone is worth the read.",
    endorserName: "Early Reader",
    endorserTitle: "Seminary Faculty",
    featured: true,
    audienceLens: "movement-leaders",
  },
];

const tabs: { id: "all" | AudienceLens; label: string }[] = [
  { id: "all", label: "All" },
  { id: "movement-leaders", label: "Movement" },
  { id: "churches", label: "Church" },
  { id: "nonprofits", label: "Nonprofit" },
  { id: "institutions", label: "Institution" },
];

export function EndorsementWall({ endorsements, className }: EndorsementWallProps) {
  const [tab, setTab] = useState<"all" | AudienceLens>("all");

  const filtered = useMemo(() => {
    if (tab === "all") return endorsements;
    return endorsements.filter(
      (e) => e.audienceLens === tab || (!e.audienceLens && tab === "movement-leaders")
    );
  }, [endorsements, tab]);

  if (endorsements.length === 0) return null;

  return (
    <Section variant="elevated" className={className}>
      <Container>
        <Eyebrow className="mb-4">What readers are saying</Eyebrow>
        <Display size="sm" as="h2">
          Early responses
        </Display>

        <div
          role="tablist"
          aria-label="Filter by audience"
          className="mt-6 flex flex-wrap gap-2"
        >
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-section hover:text-foreground"
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <EndorsementCard key={e.id} endorsement={e} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">
            No endorsements for this lens yet.
          </p>
        )}
        <div className="mt-8">
          <Link
            href="/book/endorse"
            className={cn(
              "inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground",
              "hover:bg-section focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            )}
          >
            Add your voice
          </Link>
        </div>
      </Container>
    </Section>
  );
}
