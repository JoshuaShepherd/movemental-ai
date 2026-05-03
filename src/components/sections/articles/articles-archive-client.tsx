"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AudienceLabel,
  AudienceSerifEm,
} from "@/components/sections/audience-concept";
import type {
  ArticleArchiveCategory,
  ArticleArchiveEntry,
} from "@/lib/articles";
import { cn } from "@/lib/utils";

const CHIPS: { id: ArticleArchiveCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "canon", label: "Canon" },
  { id: "guides", label: "Guides" },
  { id: "playbooks", label: "Playbooks" },
  { id: "methodology", label: "Methodology" },
  { id: "sandbox", label: "Sandbox" },
];

type SortKey = "recent" | "oldest" | "read" | "title" | "canon";

function norm(s: string): string {
  return s.toLowerCase().trim();
}

function readMinutes(readTime: string): number {
  const m = readTime.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

export function ArticlesArchiveClient({ entries }: { entries: ArticleArchiveEntry[] }) {
  const [category, setCategory] = useState<ArticleArchiveCategory>("all");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("recent");

  const filteredSorted = useMemo(() => {
    const q = norm(query);
    let rows = entries.filter((a) => {
      if (category !== "all" && a.archiveCategory !== category) return false;
      if (!q) return true;
      const hay = norm(`${a.title} ${a.excerpt}`);
      return hay.includes(q);
    });

    rows = [...rows];
    if (sortKey === "recent") {
      rows.sort((a, b) => b.updatedAtMs - a.updatedAtMs);
    } else if (sortKey === "oldest") {
      rows.sort((a, b) => a.updatedAtMs - b.updatedAtMs);
    } else if (sortKey === "read") {
      rows.sort((a, b) => readMinutes(a.readTime) - readMinutes(b.readTime));
    } else if (sortKey === "canon") {
      rows.sort((a, b) => (a.canonOrder ?? 999) - (b.canonOrder ?? 999));
    } else {
      rows.sort((a, b) => norm(a.title).localeCompare(norm(b.title)));
    }
    return rows;
  }, [entries, category, query, sortKey]);

  const count = filteredSorted.length;

  return (
    <div data-articles="archive" className="text-pretty">
      <Section
        variant="default"
        spacing="lg"
        className="scroll-mt-(--site-chrome-total) pt-8 md:pt-12"
      >
        <Container>
          <RevealOnScroll>
            <AudienceLabel>Archive</AudienceLabel>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.08}>
            <h1 className="mt-2 max-w-[22ch] text-balance text-display text-foreground">
              Every piece, <AudienceSerifEm>searchable</AudienceSerifEm>.
            </h1>
          </RevealOnScroll>
          <RevealOnScroll
            delaySec={0.2}
            className="mt-6 max-w-[56ch] text-[clamp(1.1rem,1.7vw,1.25rem)] leading-relaxed text-muted-foreground"
          >
            <p>
              The full Movemental library in one surface — filter by the shape of the argument, search by phrase,
              and jump straight into a long read.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.3} className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/articles#featured">
                Editorial start
                <span className="ml-1" aria-hidden>
                  →
                </span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href="#archive-results">Browse below</a>
            </Button>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section variant="section" spacing="sm" className="border-t border-border">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 flex-1 space-y-2">
              <label htmlFor="archive-q" className="text-sm font-medium text-foreground">
                Search the library
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-[1.125rem] -translate-y-1/2 text-ink-soft"
                  aria-hidden
                />
                <Input
                  id="archive-q"
                  type="search"
                  name="q"
                  placeholder="Titles, topics, phrases…"
                  autoComplete="off"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-11 rounded-card border-border bg-card pl-10 pr-3 text-base"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 lg:min-w-[12rem]">
              <label htmlFor="archive-sort" className="text-sm font-medium text-foreground">
                Sort
              </label>
              <select
                id="archive-sort"
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="h-11 rounded-card border border-border bg-card px-3 text-sm text-foreground"
              >
                <option value="recent">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="read">Shortest read</option>
                <option value="title">Title A–Z</option>
                {category === "canon" ? <option value="canon">Canon order</option> : null}
              </select>
            </div>
          </div>

          <div className="mt-8" role="group" aria-label="Filter by type">
            <p className="mb-3 text-xs font-semibold uppercase tracking-eyebrow text-ink-soft">Shape</p>
            <div className="flex flex-wrap gap-2">
              {CHIPS.map((chip) => {
                const pressed = category === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => setCategory(chip.id)}
                    className={cn(
                      "rounded-pill border px-4 py-2 text-sm font-medium transition-colors",
                      pressed
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card text-muted-foreground hover:border-border hover:text-foreground"
                    )}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="archive-results"
        variant="default"
        spacing="lg"
        aria-labelledby="archive-results-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-4">
            <h2 id="archive-results-title" className="max-w-[28ch] text-balance text-h2 text-foreground">
              Library <AudienceSerifEm>index</AudienceSerifEm>
            </h2>
            <p className="text-sm text-muted-foreground">
              <strong className="font-medium text-foreground">{count}</strong>{" "}
              {count === 1 ? "piece" : "pieces"} match
            </p>
          </div>

          {count === 0 ? (
            <p className="mt-10 max-w-[48ch] text-base text-muted-foreground">
              No pieces match that combination. Try clearing a filter or a shorter search.
            </p>
          ) : (
            <ul className="mt-10 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {filteredSorted.map((article, i) => (
                <li key={article.slug}>
                  <RevealOnScroll delaySec={Math.min(0.28, 0.05 + i * 0.03)} className="h-full">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="group flex h-full min-h-[220px] flex-col gap-[0.75rem] rounded-card border border-border-soft bg-card p-6 transition-[border-color,transform] duration-normal ease-out hover:-translate-y-0.5 hover:border-border"
                    >
                      <span className="text-[0.78rem] font-medium uppercase tabular-nums tracking-eyebrow text-muted-foreground">
                        {article.eyebrow}
                      </span>
                      <span className="text-[1.05rem] font-medium leading-snug tracking-tight text-foreground">
                        {article.title}
                      </span>
                      <span className="line-clamp-3 text-[0.92rem] leading-relaxed text-muted-foreground">
                        {article.excerpt}
                      </span>
                      <span className="mt-auto flex items-center justify-between pt-2 text-[0.78rem] text-ink-soft">
                        <span>{article.readTime}</span>
                        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </Link>
                  </RevealOnScroll>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>
    </div>
  );
}
