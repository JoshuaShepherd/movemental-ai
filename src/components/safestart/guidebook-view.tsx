"use client";

import { useCallback, useEffect, useState } from "react";
import { Edit3 } from "lucide-react";

import {
  GUIDEBOOK_SECTIONS,
  type GuidebookSectionSlug,
} from "@/lib/safestart/workspace-manifest";
import { cn } from "@/lib/utils";

export type GuidebookSectionStatus = "not_drafted" | "drafted" | "in_review" | "ratified";

export interface GuidebookViewSection {
  slug: GuidebookSectionSlug;
  status: GuidebookSectionStatus;
  currentVersionNumber: number | null;
  latestBodyMarkdown: string | null;
}

const STATUS_LABEL: Record<GuidebookSectionStatus, { label: string; tone: string }> = {
  not_drafted: { label: "Not drafted", tone: "text-muted-foreground" },
  drafted: { label: "Drafted", tone: "text-foreground" },
  in_review: { label: "In review", tone: "text-pathway-accent" },
  ratified: { label: "Ratified", tone: "text-[color:var(--color-status-go)]" },
};

export function GuidebookView({
  sections,
  canEdit,
}: {
  sections: GuidebookViewSection[];
  /** Reserved for the leader-role gate — Phase 03 ships the button as a stub regardless. */
  canEdit: boolean;
}) {
  const [activeSlug, setActiveSlug] = useState<GuidebookSectionSlug>(GUIDEBOOK_SECTIONS[0].slug);

  const scrollToSlug = useCallback((slug: GuidebookSectionSlug) => {
    const el = document.getElementById(`gb-${slug}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${slug}`);
    }
  }, []);

  useEffect(() => {
    const els = GUIDEBOOK_SECTIONS.map((s) => document.getElementById(`gb-${s.slug}`)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id.replace(/^gb-/, "") as GuidebookSectionSlug;
          setActiveSlug(id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sectionMap = new Map(sections.map((s) => [s.slug, s] as const));

  return (
    <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-8 px-2 sm:gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20">
      {/* TOC */}
      <aside className="border border-border-soft bg-section p-4 lg:sticky lg:top-8 lg:self-start lg:border-0 lg:bg-transparent lg:p-0">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
          Sections
        </p>
        <nav className="flex flex-col" aria-label="Guidebook sections">
          {GUIDEBOOK_SECTIONS.map((section) => {
            const active = activeSlug === section.slug;
            const state = sectionMap.get(section.slug);
            const status = state?.status ?? "not_drafted";
            return (
              <button
                key={section.slug}
                type="button"
                onClick={() => scrollToSlug(section.slug)}
                className={cn(
                  "flex items-baseline gap-3 border-l-2 py-2.5 pl-3 text-left text-[13px] transition-colors",
                  active
                    ? "border-pathway-accent font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="shrink-0 font-serif text-[13px] italic tabular-nums text-pathway-accent">
                  {section.number}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span>{section.name}</span>
                  <span className={cn("text-[10px] uppercase tracking-[0.08em]", STATUS_LABEL[status].tone)}>
                    {STATUS_LABEL[status].label}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Sections */}
      <main className="flex max-w-[760px] flex-col gap-16 [&_a]:text-pathway-accent [&_a]:underline [&_a]:decoration-pathway-accent/60 [&_a]:underline-offset-[3px]">
        {GUIDEBOOK_SECTIONS.map((section) => {
          const state = sectionMap.get(section.slug);
          const status = state?.status ?? "not_drafted";
          const statusCopy = STATUS_LABEL[status];
          return (
            <section key={section.slug} id={`gb-${section.slug}`} className="scroll-mt-12 flex flex-col gap-6">
              <header className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
                    Section {section.number} — {section.name}
                  </p>
                  <span className={cn("text-[10px] font-medium uppercase tracking-[0.1em]", statusCopy.tone)}>
                    {statusCopy.label}
                  </span>
                </div>
                <h2 className="font-serif text-[clamp(2rem,3.4vw,2.6rem)] italic leading-[1.1] tracking-tight text-foreground">
                  {section.name}
                </h2>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {section.description}
                </p>
              </header>

              {state?.latestBodyMarkdown ? (
                <div className="article-prose">
                  {state.latestBodyMarkdown
                    .split(/\n{2,}/)
                    .filter(Boolean)
                    .map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                </div>
              ) : (
                <p className="border border-dashed border-border-soft bg-section p-6 text-[14px] italic text-muted-foreground">
                  This section hasn&rsquo;t been drafted yet. The Drafting workspace
                  is where the first version of every Guidebook section gets written.
                </p>
              )}

              <div className="flex items-center gap-4 border-t border-border-soft pt-4">
                {state?.currentVersionNumber != null ? (
                  <span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    Version {state.currentVersionNumber}
                  </span>
                ) : (
                  <span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    No versions yet
                  </span>
                )}
                {canEdit ? (
                  <button
                    type="button"
                    className="ml-auto flex items-center gap-2 border border-border-soft bg-card px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:bg-section"
                    onClick={() => {
                      // Phase 03 stub: full inline editor lands in a follow-up.
                      // Today it links the leader back to the Drafting workspace.
                      window.location.assign(`/safestart/drafting`);
                    }}
                    aria-label={`Edit ${section.name}`}
                  >
                    <Edit3 className="size-3.5" aria-hidden />
                    Edit
                  </button>
                ) : null}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
