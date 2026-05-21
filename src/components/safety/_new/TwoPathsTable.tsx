import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * TwoPathsTable — side-by-side SafeGuide vs SafeStart comparison.
 *
 * Both paths produce the same five-layer AI Organizational Guidebook.
 * The difference is who guides you through the work.
 *
 * Visual register: hairline-ruled `bg-card` table, no shadows, radius
 * borrowed from the Concept Modern palette (none here — square corners).
 * Mobile: rows stack vertically with a sticky "Choose your path" kicker.
 */

interface Row {
  label: string;
  safeGuide: string;
  safeStart: string;
}

const ROWS: ReadonlyArray<Row> = [
  {
    label: "Cost",
    safeGuide: "Free",
    safeStart: "$1,000 fixed",
  },
  {
    label: "Timeline",
    safeGuide: "One to two months — your pace",
    safeStart: "Two weeks — fixed",
  },
  {
    label: "Difficulty",
    safeGuide: "Moderate — requires team coordination",
    safeStart: "Light — Movemental drafts; you review",
  },
  {
    label: "Who Drafts",
    safeGuide: "Your team",
    safeStart: "Movemental drafts; your team revises and ratifies",
  },
  {
    label: "Finished Artifact",
    safeGuide: "One AI Organizational Guidebook (5 layers, ratifiable)",
    safeStart:
      "Same Guidebook + print-quality PDF + private dashboard",
  },
  {
    label: "Likely Challenges",
    safeGuide:
      "Finding internal alignment; staying on schedule",
    safeStart:
      "Trusting external drafting; protecting board ratification authority",
  },
  {
    label: "Best Fit",
    safeGuide:
      "Teams with an internal lead and existing rhythm for cross-functional decisions",
    safeStart:
      "Teams without slack to draft from scratch, or who want a faster start",
  },
];

export function TwoPathsTable() {
  return (
    <div className="w-full">
      {/* Mobile sticky kicker */}
      <p className="sticky top-16 z-10 -mx-6 mb-6 bg-background/95 px-6 py-3 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground backdrop-blur md:hidden">
        Choose your path
      </p>

      {/* Desktop: 3-col grid table. Mobile: stacked rows per path. */}
      <div className="border-t border-border bg-card">
        {/* Column header row — desktop only */}
        <div className="hidden grid-cols-[1.1fr_1.4fr_1.4fr] items-end border-b border-border md:grid">
          <div className="px-6 py-6 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
            Comparison
          </div>
          <div className="border-l border-border px-6 py-6">
            <p className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Path 01
            </p>
            <h3 className="mt-2 font-serif-display text-2xl italic leading-tight text-foreground">
              SafeGuide
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Free · Self-directed · Field Guide PDF
            </p>
          </div>
          <div className="border-l border-border px-6 py-6">
            <p className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Path 02
            </p>
            <h3 className="mt-2 font-serif-display text-2xl italic leading-tight text-foreground">
              SafeStart
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              $1,000 · Facilitated · Two weeks
            </p>
          </div>
        </div>

        {/* Desktop rows */}
        <div className="hidden md:block">
          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className={cn(
                "grid grid-cols-[1.1fr_1.4fr_1.4fr] items-start",
                i < ROWS.length - 1 && "border-b border-border",
              )}
            >
              <div className="px-6 py-5">
                <p className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  {row.label}
                </p>
              </div>
              <div className="border-l border-border px-6 py-5">
                <p className="text-sm leading-relaxed text-foreground">
                  {row.safeGuide}
                </p>
              </div>
              <div className="border-l border-border px-6 py-5">
                <p className="text-sm leading-relaxed text-foreground">
                  {row.safeStart}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile stacked layout — two cards, each path top-to-bottom */}
        <div className="md:hidden">
          <MobilePathStack
            kicker="Path 01"
            title="SafeGuide"
            subtitle="Free · Self-directed · Field Guide PDF"
            getRow={(row) => row.safeGuide}
          />
          <div className="border-t border-border">
            <MobilePathStack
              kicker="Path 02"
              title="SafeStart"
              subtitle="$1,000 · Facilitated · Two weeks"
              getRow={(row) => row.safeStart}
            />
          </div>
        </div>
      </div>

      {/* CTAs below */}
      <div className="mt-10 flex flex-col flex-wrap items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Link href="/field-guides/safety-new" className="btn-pill btn-pill--primary">
          Get the Field Guide (SafeGuide)
        </Link>
        <Link
          href="/contact?interest=safestart"
          className="text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-pathway-accent"
        >
          Talk about SafeStart →
        </Link>
      </div>
    </div>
  );
}

interface MobilePathStackProps {
  kicker: string;
  title: string;
  subtitle: string;
  getRow: (row: Row) => string;
}

function MobilePathStack({
  kicker,
  title,
  subtitle,
  getRow,
}: MobilePathStackProps) {
  return (
    <div className="px-6 py-6">
      <p className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
        {kicker}
      </p>
      <h3 className="mt-2 font-serif-display text-2xl italic leading-tight text-foreground">
        {title}
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        {subtitle}
      </p>
      <dl className="mt-6 divide-y divide-border border-y border-border">
        {ROWS.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[7rem_1fr] items-baseline gap-4 py-3"
          >
            <dt className="text-[0.6rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
              {row.label}
            </dt>
            <dd className="text-sm leading-relaxed text-foreground">
              {getRow(row)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default TwoPathsTable;
