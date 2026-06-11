/**
 * Citation claims catalog.
 *
 * A *claim* is the page-facing atom — the specific sentence that gets a chip.
 * Each claim points to **one** canonical source from `sources.ts`. The popover
 * renders the `claim` HTML (numbers in <strong>) and the `meta` pill row.
 *
 * Why claims are separate from sources:
 *
 *   - One source backs many claims (e.g. Virtuous 2026 backs the 92% adoption
 *     statistic AND the 81% individual ad-hoc statistic).
 *   - Convergent findings let one popover summarize a pattern across multiple
 *     studies without chaining chips on a single line (corpus §10 + the
 *     editorial 3-chip ceiling).
 *
 * Editorial discipline:
 *
 *   - Numbers in the `claim` string are wrapped in `<strong>`.
 *   - `meta` is shown as a dot-separated row (year · sample · provenance).
 *   - Confidence tag inherits from the source unless explicitly overridden.
 *   - DROPPED claims (corpus §10) do NOT live here — they are removed from
 *     prose entirely.
 */

import type { SourceId } from "./sources";
import { sources, type ConfidenceTag } from "./sources";

export type Citation = {
  /** Stable kebab-case identifier */
  id: string;
  /** Pointer to the canonical source row in `sources.ts` */
  source: SourceId;
  /**
   * Popover body HTML. Authored content — numbers wrapped in <strong>, em-dashes
   * as ", ", proper curly quotes via &ldquo;/&rdquo;. Rendered with
   * dangerouslySetInnerHTML inside the popover.
   */
  claim: string;
  /** Pill-separated meta facts shown beneath the claim sentence */
  meta?: string[];
  /** Optional confidence override; defaults to the source's tag */
  tag?: ConfidenceTag;
};

export const citations = {
  // -- Adoption (nonprofits) ----------------------------------------------
  "nonprofit-92-adoption": {
    id: "nonprofit-92-adoption",
    source: "virtuous-2026",
    claim:
      "<strong>92%</strong> of nonprofits report using AI in some capacity. Only <strong>7%</strong> report major capability improvement.",
    meta: ["2026 Nonprofit AI Adoption Report", "n = 346", "Feb 16, 2026"],
  },
  "nonprofit-81-adhoc": {
    id: "nonprofit-81-adhoc",
    source: "virtuous-2026",
    claim:
      "<strong>81%</strong> of organizations report using AI individually and on an ad hoc basis. <strong>4%</strong> have documented, repeatable AI workflows.",
    meta: ["2026 Nonprofit AI Adoption Report", "n = 346"],
  },

  // -- The capability gap (cross-sector convergent finding) ---------------
  "high-performer-cohort-5-7": {
    id: "high-performer-cohort-5-7",
    source: "mckinsey-soa-2025",
    claim:
      "Across nonprofit, enterprise, and faith-sector studies the high-performer cohort lands at <strong>5–7%</strong>. McKinsey: <strong>6%</strong> AI high performers (n = 1,993). BCG: <strong>5%</strong> &ldquo;future-built&rdquo; (n = 1,250). MIT NANDA: <strong>95%</strong> of GenAI pilots fail.",
    meta: ["Converged finding · 2025", "4 independent studies"],
  },

  // -- Governance gap -----------------------------------------------------
  "nonprofit-47-no-policy": {
    id: "nonprofit-47-no-policy",
    source: "virtuous-2026",
    claim:
      "<strong>47%</strong> of nonprofits have <strong>no</strong> AI governance policy. TechSoup's adjacent measure: <strong>76%</strong> have no formal AI strategy (n = 1,321).",
    meta: ["Reports cited side-by-side as a range"],
  },

  // -- Documented harm ----------------------------------------------------
  "fbi-ic3-893m": {
    id: "fbi-ic3-893m",
    source: "fbi-ic3-2025",
    claim:
      "<strong>$893M</strong> in adjusted losses tied to AI-related scams in 2025. <strong>22,364</strong> AI-flagged complaints. <strong>$352M</strong> of those losses sustained by Americans 60+. Voice-cloning fraud rose <strong>400%+</strong> year-over-year.",
    meta: ["FBI Internet Crime Complaint Center", "Published 2026"],
  },

  // -- Faith / spiritual authority ----------------------------------------
  "barna-gloo-spiritual-trust-1-in-3": {
    id: "barna-gloo-spiritual-trust-1-in-3",
    source: "barna-gloo-sotc-2026",
    claim:
      "Nearly <strong>1 in 3</strong> U.S. adults agree spiritual advice from AI is as trustworthy as advice from a pastor. <strong>2 in 5</strong> among Gen Z and Millennials. Yet only <strong>12%</strong> of pastors say they feel comfortable teaching about AI.",
    meta: ["n = 1,514", "Nov 2025"],
  },

  // -- Church adoption (replaces the dropped 91% / 9% claims, corpus §10) -
  "barna-pushpay-church-tech-2026": {
    id: "barna-pushpay-church-tech-2026",
    source: "barna-pushpay-2026",
    claim:
      "<strong>60%</strong> of church leaders use AI monthly · <strong>33%</strong> church-wide use · <strong>5%</strong> with formal policy · <strong>64%</strong> believe a policy is important.",
    meta: ["n = 1,306", "Released March 9, 2026"],
  },
  "lifeway-pastor-42-use": {
    id: "lifeway-pastor-42-use",
    source: "lifeway-pastors-2026",
    claim:
      "<strong>10%</strong> regular AI users · <strong>32%</strong> experimenting · <strong>56%</strong> non-users. <strong>84%</strong> worry about reliability of generated content. <strong>55%</strong> say &ldquo;AI isn't a person.&rdquo;",
    meta: [
      "n = 1,003 Protestant senior pastors",
      "Phone · ±3.3%",
      "Sept 2025 · released April 21, 2026",
    ],
  },

  // -- The mechanism: workflow redesign predicts capability ---------------
  "mckinsey-workflow-redesign": {
    id: "mckinsey-workflow-redesign",
    source: "mckinsey-soa-2025",
    claim:
      "<strong>55%</strong> of high-performers have fundamentally redesigned at least some workflows; the rest of the field sits near <strong>20%</strong>. Workflow redesign is McKinsey's strongest correlate of AI EBIT impact (<strong>3.6&times;</strong> for transformative-change pursuers).",
    meta: ["n = 1,993 across 105 nations", "Nov 2025"],
  },

  // -- Governance fiduciary frame -----------------------------------------
  "forvis-fiduciary-ai": {
    id: "forvis-fiduciary-ai",
    source: "forvis-mazars-2026",
    claim:
      "AI governance now expands the board's traditional fiduciary duties of <strong>Care</strong>, <strong>Loyalty</strong>, and <strong>Obedience</strong>. The framework: resist the &ldquo;efficiency trap,&rdquo; codify responsibility (e.g. NIST AI RMF), require vendor accountability, and incorporate AI risk into enterprise risk management.",
    meta: ["February 13, 2026"],
  },

  // -- Theological grounding ----------------------------------------------
  "antiqua-et-nova-complement": {
    id: "antiqua-et-nova-complement",
    source: "vatican-antiqua-et-nova-2025",
    claim:
      "AI &ldquo;should be used only as a tool to complement human intelligence rather than replace its richness&rdquo; (¶112). The same document warns of deskilling and surveillance (¶67) and of humanity becoming &ldquo;enslaved to its own work&rdquo; (¶105).",
    meta: ["117-paragraph note", "Approved Jan 14, 2025"],
  },

  // -- Formation (Kolb / Pink) — used on Training section -------------------
  "kolb-experiential": {
    id: "kolb-experiential",
    source: "kolb-1984",
    claim:
      "Adult learning runs through a four-stage cycle: Concrete Experience &rarr; Reflective Observation &rarr; Abstract Conceptualization &rarr; Active Experimentation. Foundational for &ldquo;learn-by-doing&rdquo; cohort design.",
    meta: ["1984; 2nd ed. 2014"],
  },
  "pink-drive": {
    id: "pink-drive",
    source: "pink-drive-2009",
    claim:
      "Three intrinsic motivators predict performance on cognitive work: <strong>autonomy</strong>, <strong>mastery</strong>, and <strong>purpose</strong>. Vendor certifications target none of these.",
    meta: ["Drive (2009)"],
  },

  // -- Public trust / attribution (Pew) ------------------------------------
  "pew-ai-detection-attribution-gap": {
    id: "pew-ai-detection-attribution-gap",
    source: "pew-ai-impact-2025",
    claim:
      "About <strong>76%</strong> of U.S. adults say it is extremely or very important to tell whether pictures, videos, or text were made by AI or by people; <strong>53%</strong> are not too or not at all confident they can spot the difference.",
    meta: ["n = 5,023", "June 9–15, 2025", "Sept. 2025 report"],
  },
} as const satisfies Record<string, Citation>;

export type CitationId = keyof typeof citations;

/** Lookup helper — throws in development if a stale id is referenced. */
export function getCitation(id: CitationId): Citation {
  const c = citations[id];
  if (process.env.NODE_ENV !== "production" && !c) {
    throw new Error(`[citations] unknown claim id: ${String(id)}`);
  }
  return c;
}

/** Resolve a claim's confidence tag (claim override > source default). */
export function resolveTag(id: CitationId): ConfidenceTag {
  const c = getCitation(id);
  return c.tag ?? sources[c.source].tag;
}
