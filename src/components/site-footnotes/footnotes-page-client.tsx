"use client";

import { useMemo, useState } from "react";

import { Container, Section } from "@/components/primitives";
import type { EeatRegistryEntry } from "@/lib/citations/eeat-registry";

function formatCiteBlock(cite: EeatRegistryEntry["cite"]) {
  if (!cite || (!cite.author && !cite.title)) {
    return (
      <p className="text-sm italic text-muted-foreground">
        No single external publication stands alone as the source—see the note
        beside the claim on this row.
      </p>
    );
  }

  const meta = [cite.date, cite.detail].filter(Boolean).join(" · ");

  return (
    <div className="border-l-[3px] border-primary bg-section/80 py-3 pe-3 ps-4 rounded-r-lg">
      <p className="text-sm font-semibold text-foreground">{cite.author}</p>
      <p className="font-serif-display text-sm italic text-foreground">
        {cite.title}
      </p>
      {meta ? (
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          {meta}
        </p>
      ) : null}
      {cite.url?.startsWith("https://") ? (
        <a
          href={cite.url}
          className="mt-2 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          View original publication ↗
        </a>
      ) : null}
    </div>
  );
}

export function FootnotesPageClient({ entries }: { entries: EeatRegistryEntry[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(q),
    );
  }, [entries, query]);

  return (
    <Section variant="default" spacing="lg">
      <Container>
        <header className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Evidence & editorial notes
          </p>
          <h1 className="mt-2 font-serif-display text-3xl tracking-tight text-foreground md:text-4xl">
            Claims, sources, and notes
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            This table mirrors how we treat serious nonfiction: the{" "}
            <strong className="font-medium text-foreground">claim</strong> is
            what we assert on the site; the{" "}
            <strong className="font-medium text-foreground">source</strong>{" "}
            reads like a bibliography entry; the{" "}
            <strong className="font-medium text-foreground">note</strong>{" "}
            explains what the evidence shows and how it connects—written for
            readers, not staff jargon.
          </p>
        </header>

        <div className="mb-8 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground md:p-5">
          <p>
            <strong className="font-medium text-foreground">Source column.</strong>{" "}
            Author or organization first, then title in italics, then date and
            any reader-relevant detail. When a public link exists, use{" "}
            <span className="text-foreground">View publication</span>.
          </p>
          <p className="mt-3">
            <strong className="font-medium text-foreground">Note column.</strong>{" "}
            Public-facing context and interpretation—the same prose that appears
            in citation tooltips on the live site.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-end gap-4">
          <label className="flex w-full min-w-0 flex-1 flex-col gap-2 text-sm text-muted-foreground sm:min-w-[240px]">
            Search
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by page, claim, or source…"
              autoComplete="off"
              className="rounded-lg border border-border bg-background px-3 py-2.5 text-foreground outline-none ring-primary/30 placeholder:text-muted-foreground focus-visible:ring-2"
            />
          </label>
          <p className="text-sm text-muted-foreground pb-2">
            {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-section/90">
                <th className="w-14 px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                  Rank
                </th>
                <th className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                  Page
                </th>
                <th className="w-28 px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                  Type
                </th>
                <th className="min-w-[200px] px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                  Claim
                </th>
                <th className="min-w-[220px] px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                  Source
                </th>
                <th className="min-w-[260px] px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row.id}
                  id={`ref-${row.id}`}
                  className="border-b border-border align-top last:border-b-0 scroll-mt-[calc(var(--site-chrome-total,4.25rem)+1rem)]"
                >
                  <td className="px-4 py-4 font-semibold tabular-nums text-primary">
                    {row.rank}
                  </td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground whitespace-nowrap">
                    {row.page}
                  </td>
                  <td className="px-4 py-4 text-xs text-muted-foreground">
                    {row.claimType}
                  </td>
                  <td className="px-4 py-4 font-serif-display text-[0.95rem] leading-snug text-foreground">
                    {row.claim}
                  </td>
                  <td className="px-4 py-4">{formatCiteBlock(row.cite)}</td>
                  <td className="px-4 py-4 border-l-2 border-muted-foreground/25 font-serif-display text-[0.88rem] leading-relaxed text-foreground/90">
                    {row.footnote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="mt-10 max-w-2xl text-sm text-muted-foreground">
          Matches the claims Movemental publishes on the public site. Where no
          external URL exists, the source line still names what a reader would
          ask for in principle—signed agreements, primary bios, or internal
          memoranda—while the note explains what belongs in public copy.
        </footer>
      </Container>
    </Section>
  );
}
