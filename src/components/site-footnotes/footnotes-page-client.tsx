"use client";

import { useMemo, useState } from "react";

import styles from "@/components/agent-room/ink-band.module.css";
import type { EeatRegistryEntry } from "@/lib/citations/eeat-registry";

function formatCiteBlock(cite: EeatRegistryEntry["cite"]) {
  if (!cite || (!cite.author && !cite.title)) {
    return (
      <p className={styles.body} style={{ marginTop: 0, fontStyle: "italic" }}>
        No single external publication stands alone as the source. See the note beside
        the claim on this row.
      </p>
    );
  }

  const meta = [cite.date, cite.detail].filter(Boolean).join(" · ");

  return (
    <div className={styles.turnBlock}>
      <p className={styles.body} style={{ marginTop: 0 }}>
        <strong>{cite.author}</strong>
        <br />
        <em>{cite.title}</em>
      </p>
      {meta ? <p className={styles.honest}>{meta}</p> : null}
      {cite.url?.startsWith("https://") ? (
        <a href={cite.url} className={styles.wayCta} rel="noopener noreferrer" target="_blank">
          View original publication
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
    return entries.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [entries, query]);

  return (
    <div className={styles.sec} style={{ marginTop: 0 }}>
      <header style={{ marginBottom: "2rem", maxWidth: "48rem" }}>
        <p className={styles.eyebrow}>Evidence and editorial notes</p>
        <h1>Claims, sources, and notes</h1>
        <p className={styles.body}>
          The claim is what we assert on the site. The source reads like a bibliography
          entry. The note explains what the evidence shows and how it connects.
        </p>
      </header>

      <label className={styles.capLabel} htmlFor="footnotes-search">
        Search
        <input
          id="footnotes-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by page, claim, or source"
          autoComplete="off"
          className={styles.capField}
          style={{ marginTop: "0.35rem", display: "block", width: "100%", maxWidth: "28rem" }}
        />
      </label>
      <p className={styles.honest}>
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1.5rem" }}>
        {filtered.map((row) => (
          <article
            key={row.id}
            id={row.id}
            className={styles.way}
            style={{ scrollMarginTop: "5rem" }}
          >
            <p className={styles.secLabel}>
              {row.page} · {row.claimType}
            </p>
            <p className={styles.body} style={{ marginTop: "0.35rem" }}>
              <strong>{row.claim}</strong>
            </p>
            <div style={{ marginTop: "0.85rem" }}>{formatCiteBlock(row.cite)}</div>
            <p className={styles.body} style={{ marginTop: "0.85rem" }}>
              {row.footnote}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
