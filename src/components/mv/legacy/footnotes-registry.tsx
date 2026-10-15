"use client";

import { useMemo, useState } from "react";

import type { EeatRegistryEntry } from "@/lib/citations/eeat-registry";

import { MvPageHeader } from "./page-header";

/** `/footnotes` on Paper (board: Kept pages · Footnotes). Copy and filter behaviour unchanged. */
function Cite({ cite }: { cite: EeatRegistryEntry["cite"] }) {
  if (!cite || (!cite.author && !cite.title)) {
    return (
      <div className="mv-fn-cite">
        <em>No single external publication stands alone as the source. See the note beside the claim on this row.</em>
      </div>
    );
  }
  const meta = [cite.date, cite.detail].filter(Boolean).join(" · ");
  return (
    <div className="mv-fn-cite">
      <strong>{cite.author}</strong>
      <em>{cite.title}</em>
      {meta ? <span>{meta}</span> : null}
      {cite.url?.startsWith("https://") ? (
        <a href={cite.url} rel="noopener noreferrer" target="_blank">
          View original publication ↗
        </a>
      ) : null}
    </div>
  );
}

export function FootnotesRegistry({ entries }: { entries: EeatRegistryEntry[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [entries, query]);

  return (
    <div className="mv-wrap">
      <MvPageHeader
        eyebrow="Evidence and editorial notes"
        title="Claims, sources, and notes"
        deck="The claim is what we assert on the site. The source reads like a bibliography entry. The note explains what the evidence shows and how it connects."
      />
      <div className="mv-search">
        <label htmlFor="footnotes-search">Search</label>
        <input
          id="footnotes-search"
          className="mv-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by page, claim, or source"
          autoComplete="off"
        />
        <p className="mv-count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
        </p>
      </div>
      <div className="mv-fn-list mv-page-end">
        {filtered.map((row) => (
          <article key={row.id} id={row.id} className="mv-fn">
            <div className="mv-fn-meta">
              <span className="mv-ix-kind">{row.claimType}</span>
              <span>{row.page}</span>
            </div>
            <div className="mv-fn-main">
              <p className="mv-fn-claim">{row.claim}</p>
              <Cite cite={row.cite} />
              <p className="mv-fn-note">{row.footnote}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
