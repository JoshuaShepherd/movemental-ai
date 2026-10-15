"use client";

import Link from "next/link";
import { useState } from "react";

import { RESEARCH_ARCHIVE } from "@/lib/research/data";

import { MV_ROUTES } from "@/components/mv/routes";

import { ResearchRowItem } from "./research-row";

/** "Load archive" appends the older research rows to the index. */
export function LoadArchiveRows() {
  const [open, setOpen] = useState(false);
  if (open) return RESEARCH_ARCHIVE.map((item) => <ResearchRowItem key={item.slug} item={item} />);
  return (
    <li className="mv-ix-more">
      <button type="button" className="mv-btn-quiet" onClick={() => setOpen(true)}>
        Load archive
      </button>
    </li>
  );
}

/** Print, cite and ask: the paper's footer actions (same behaviour as before). */
export function PaperActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const cite = () => {
    void navigator.clipboard?.writeText(`Movemental. "${title}." Movemental Research Library, 2026.`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="mv-actions mv-no-print">
      <button type="button" className="mv-btn-quiet" onClick={() => window.print()}>
        Print this page
      </button>
      <button type="button" className="mv-btn-quiet" onClick={cite} aria-live="polite">
        {copied ? "Citation copied" : "Cite this paper"}
      </button>
      <Link className="mv-btn-quiet" href={MV_ROUTES.agent}>
        Ask your AI about this
      </Link>
    </div>
  );
}
