import type { CitationId } from "./claims";

import siteClaims from "./eeat-site-claims.json";

export type EeatCite = {
  author: string;
  title: string;
  date: string;
  detail?: string;
  url: string;
} | null;

export type EeatRegistryEntry = {
  id: string;
  rank: number;
  page: string;
  claimType: string;
  claim: string;
  cite: EeatCite;
  footnote: string;
  citationIds?: readonly CitationId[];
};

/**
 * Editorial supplement: the public 35-row “Claims, sources, and footnotes” table
 * does not include a dedicated row for the Barna × Gloo spiritual-trust chip on
 * `/field-guides/safety`. This entry keeps that tooltip wired without splitting the map.
 */
const TOOLKIT_BARN_GLOO_SPIRITUAL_TRUST: EeatRegistryEntry = {
  id: "toolkit-barna-gloo-spiritual-trust",
  rank: 3,
  page: "/field-guides/safety",
  claimType: "Purported fact",
  claim:
    "Public openness to AI-shaped spiritual guidance runs ahead of pastoral comfort; large majorities of pastors treat AI as a concerning tool, not a substitute for human ministry.",
  cite: {
    author: "Barna Group & Gloo",
    title: "State of the Church 2026 — AI Series",
    date: "November 2025 onward",
    detail: "n = 1,514 U.S. adults · online",
    url: "https://www.barna.com/research/state-of-the-church-2026-trends/",
  },
  footnote:
    "The AI-focused waves find a sharp split between general-public openness to AI-influenced spiritual guidance and pastoral caution—useful context when arguing that churches cannot treat AI-shaped communication as morally neutral infrastructure.",
  citationIds: ["barna-gloo-spiritual-trust-1-in-3"],
};

/** Inline Antiqua et Nova chip on `/field-guides/safety` — row lives off the home JSON bundle. */
const TOOLKIT_ANTQUA_ET_NOVA: EeatRegistryEntry = {
  id: "toolkit-antiqua-et-nova-complement",
  rank: 3,
  page: "/field-guides/safety",
  claimType: "Opinion",
  claim:
    "Sandbox, Skills, Solutions — staged maturity; magisterial frame for complementing rather than replacing human judgment.",
  cite: {
    author:
      "Vatican (Dicastery for the Doctrine of the Faith and Dicastery for Culture and Education)",
    title:
      "Antiqua et Nova: Note on the Relationship Between AI and Human Intelligence",
    date: "January 28, 2025",
    detail: "",
    url: "https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_ddf_doc_20250128_antiqua-et-nova_en.html",
  },
  footnote:
    "The note insists that artificial intelligence should complement human intelligence rather than replace its moral and relational depth, and warns against deskilling and surrendering judgment to machines. That ethical stance aligns with treating experimentation and formation as stages before wholesale automation—without claiming any one vendor methodology.",
  citationIds: ["antiqua-et-nova-complement"],
};

export const EEAT_REGISTRY: EeatRegistryEntry[] = [
  ...(siteClaims as EeatRegistryEntry[]),
  TOOLKIT_BARN_GLOO_SPIRITUAL_TRUST,
  TOOLKIT_ANTQUA_ET_NOVA,
];

const citationToRegistryId = new Map<CitationId, string>();

for (const entry of EEAT_REGISTRY) {
  for (const cid of entry.citationIds ?? []) {
    if (citationToRegistryId.has(cid)) {
      throw new Error(
        `[eeat-registry] citation id "${cid}" is mapped to more than one registry row`,
      );
    }
    citationToRegistryId.set(cid, entry.id);
  }
}

export function getEeatEntry(id: string): EeatRegistryEntry | undefined {
  return EEAT_REGISTRY.find((e) => e.id === id);
}

export function getRegistryIdForCitation(id: CitationId): string | undefined {
  return citationToRegistryId.get(id);
}

export function getTooltipFootnoteForCitation(id: CitationId): string {
  const regId = citationToRegistryId.get(id);
  if (!regId) {
    throw new Error(
      `[eeat-registry] no registry row declares citationIds for "${id}". Add a row in eeat-site-claims.json or eeat-registry.ts.`,
    );
  }
  const entry = getEeatEntry(regId);
  if (!entry) {
    throw new Error(`[eeat-registry] missing entry for id "${regId}"`);
  }
  return entry.footnote;
}
