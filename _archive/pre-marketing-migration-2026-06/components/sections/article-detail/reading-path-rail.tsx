import Link from "next/link";

import type { Article } from "@/lib/articles";
import { cn } from "@/lib/utils";

/**
 * Context-aware right rail for article detail pages. Server Component — the
 * path is known at build time; no scroll-spy needed here (the sibling
 * `ArticleTocRail` handles in-page anchors).
 *
 * Used for canon detail (`mode="canon"`) — renders the staircase grouped by
 * section with the current piece bolded — and for series detail (`mode="series"`)
 * — renders the ordered list with the current piece bolded.
 */
export function ReadingPathRail({
  mode,
  title,
  items,
  currentSlug,
  groups,
}: {
  mode: "canon" | "series";
  /** Rail-level title ("Canon", "Content strategy", etc.). */
  title: string;
  /** Flat ordered list (used for series mode). */
  items?: Article[];
  currentSlug: string;
  /** Grouped entries for canon mode, one group per canon section. */
  groups?: Array<{ title: string; items: Article[] }>;
}) {
  return (
    <aside
      aria-label={`${mode === "canon" ? "Canon reading path" : "Series reading path"}`}
      className="hidden lg:sticky lg:top-[calc(var(--site-chrome-total,4.125rem)+1.25rem)] lg:block lg:max-h-[calc(100vh-var(--site-chrome-total,4.125rem)-2rem)] lg:self-start lg:overflow-y-auto"
    >
      <p className="mb-3 text-[0.7rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        {title}
      </p>

      {mode === "canon" && groups ? (
        <div className="flex flex-col gap-5">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 text-[0.7rem] font-medium tracking-eyebrow text-ink-soft/80 uppercase">
                {group.title}
              </p>
              <ol className="flex flex-col gap-1">
                {group.items.map((a) => (
                  <RailItem
                    key={a.slug}
                    slug={a.slug}
                    title={a.title}
                    numeral={a.canonOrder}
                    active={a.slug === currentSlug}
                  />
                ))}
              </ol>
            </div>
          ))}
        </div>
      ) : null}

      {mode === "series" && items ? (
        <ol className="flex flex-col gap-1">
          {items.map((a) => (
            <RailItem
              key={a.slug}
              slug={a.slug}
              title={a.title}
              numeral={a.seriesOrder}
              active={a.slug === currentSlug}
            />
          ))}
        </ol>
      ) : null}
    </aside>
  );
}

function RailItem({
  slug,
  title,
  numeral,
  active,
}: {
  slug: string;
  title: string;
  numeral: number | null;
  active: boolean;
}) {
  return (
    <li>
      <Link
        href={`/articles/${slug}`}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group flex items-baseline gap-2 border-l-2 border-transparent py-1 pl-3 text-[0.82rem] leading-snug transition-colors",
          active ? "border-primary font-semibold text-foreground" : "text-muted-foreground hover:text-foreground",
        )}
      >
        <span className="shrink-0 tabular-nums text-ink-soft group-hover:text-foreground">
          {numeral != null ? String(numeral).padStart(2, "0") : "–"}
        </span>
        <span>{title}</span>
      </Link>
    </li>
  );
}
