import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Chapter, ChapterPublicationStatus } from "@/lib/book";
import { chapterLabel, bookParts } from "@/lib/book";

type ChapterNavItem = Pick<
  Chapter,
  "number" | "slug" | "title" | "partNumber" | "chapterKind" | "publicationStatus"
>;

type ChapterNavProps = {
  currentSlug: string;
  chapters: ChapterNavItem[];
  prev: Pick<Chapter, "slug" | "title" | "number" | "chapterKind"> | null;
  next: Pick<Chapter, "slug" | "title" | "number" | "chapterKind"> | null;
  className?: string;
};

function tocIndexLabel(c: ChapterNavItem): string {
  if (c.chapterKind === "preface") return "P";
  if (c.chapterKind === "coda") return "C";
  return String(c.number);
}

function soonBadge(status: ChapterPublicationStatus) {
  return status === "coming_soon" ? (
    <span className="ml-1.5 rounded-sm bg-muted px-1 py-0.5 text-[0.6rem] font-medium uppercase tracking-wide text-muted-foreground">
      Soon
    </span>
  ) : null;
}

export function ChapterNav({
  currentSlug,
  chapters,
  prev,
  next,
  className,
}: ChapterNavProps) {
  return (
    <nav
      data-slot="chapter-nav"
      aria-label="Chapter navigation"
      className={cn("space-y-6", className)}
    >
      <div className="flex gap-2">
        {prev ? (
          <Link
            href={`/book/read/${prev.slug}`}
            className="flex flex-1 items-center gap-1.5 rounded-lg bg-section px-3 py-2.5 text-sm font-medium text-foreground hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate">
              {chapterLabel({ number: prev.number, chapterKind: prev.chapterKind })}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/book/read/${next.slug}`}
            className="flex flex-1 items-center justify-end gap-1.5 rounded-lg bg-section px-3 py-2.5 text-sm font-medium text-foreground hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="truncate">
              {chapterLabel({ number: next.number, chapterKind: next.chapterKind })}
            </span>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      <div className="space-y-4">
        {bookParts.map((part) => (
          <div key={part.number}>
            <p className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Part {part.number}: {part.title}
            </p>
            <ul className="mt-1.5 space-y-0.5">
              {chapters
                .filter((c) => part.chapters.includes(c.number))
                .map((c) => {
                  const isCurrent = c.slug === currentSlug;
                  const isLive = c.publicationStatus === "live";
                  const rowClass = cn(
                    "flex flex-wrap items-baseline gap-x-1 rounded-md px-2 py-1.5 text-sm transition-colors",
                    isLive && "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isCurrent
                      ? "bg-primary/10 font-medium text-primary"
                      : isLive
                        ? "text-muted-foreground hover:bg-section hover:text-foreground"
                        : "cursor-default text-muted-foreground/80"
                  );
                  const inner = (
                    <>
                      <span className="shrink-0 text-xs text-muted-foreground/60">
                        {tocIndexLabel(c)}
                      </span>
                      <span className="min-w-0">{c.title}</span>
                      {soonBadge(c.publicationStatus)}
                    </>
                  );
                  return (
                    <li key={c.slug}>
                      {isLive ? (
                        <Link
                          href={`/book/read/${c.slug}`}
                          aria-current={isCurrent ? "page" : undefined}
                          className={rowClass}
                        >
                          {inner}
                        </Link>
                      ) : (
                        <span
                          className={rowClass}
                          aria-current={isCurrent ? "page" : undefined}
                          aria-label={isCurrent ? undefined : `${c.title} — coming soon`}
                        >
                          {inner}
                        </span>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
