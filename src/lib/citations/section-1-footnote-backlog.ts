/**
 * Footnote backlog exported from `section-1-research-and-references.md` (RL-07).
 *
 * Book Section 1 scope (content team): kairos and threat landscape; credibility
 * crisis and trust collapse; AI as problem and solution; anthropological/adaptive
 * reframe; where people are; audience shift and adoption speed; why movement
 * leaders were right to ignore SEO; discoverability + network verification.
 *
 * Do NOT publish as a `/research` reader — wire into `/footnotes` or internal
 * book footnotes when Section 1 ships. Part 2 numbered refs (1–27) are the
 * canonical bibliography; Part 4 maps Section 1 statement numbers to those refs.
 */

export type Section1FootnoteRef = {
  /** Part 2 bibliography number (1–27) */
  ref: number;
  author: string;
  title: string;
  note: string;
  url?: string;
};

/** Part 4: Section 1 statement number → Part 2 ref numbers */
export const SECTION_1_STATEMENT_FOOTNOTE_MAP: Readonly<
  Record<number, readonly number[]>
> = {
  1: [1, 5, 6, 7],
  2: [1, 2, 3, 15, 16],
  3: [10, 11, 12, 13],
  4: [10, 11],
  5: [5, 6, 7, 8, 9],
  6: [5, 6],
  7: [],
  8: [5, 6, 7],
  9: [23, 24],
  10: [23],
  11: [5, 6, 22, 25, 26],
  12: [17, 18, 19],
  13: [22, 25],
  14: [20, 21, 22],
  15: [],
  16: [11],
  17: [],
} as const;

/** High-priority refs for agentic search / footnote wiring (subset of Part 2) */
export const SECTION_1_FOOTNOTE_BACKLOG: readonly Section1FootnoteRef[] = [
  {
    ref: 1,
    author: "Center for Humane Technology",
    title: "The A.I. Dilemma (presentation)",
    note: "March 2023 — canonical early-LLM threat list (racing dynamics, safety gaps).",
    url: "https://www.humanetech.com/",
  },
  {
    ref: 5,
    author: "Pew Research Center",
    title: "How Americans View AI and Its Impact on Human Abilities, Society",
    note: "Sept 2025 — concern vs excitement; erosion of creative thinking.",
    url: "https://www.pewresearch.org/science/2025/09/17/how-americans-view-ai-and-its-impact-on-people-and-society/",
  },
  {
    ref: 7,
    author: "Zenodo",
    title: "The Collapse of Trust in AI Assistants",
    note: "2025 — output volatility across identical runs (61% materially different).",
    url: "https://zenodo.org/records/17837188",
  },
  {
    ref: 10,
    author: "Ahrefs",
    title: "What Percentage of New Content Is AI-Generated?",
    note: "Apr 2025 — 900k pages; 74.2% with AI-detected content.",
    url: "https://ahrefs.com/blog/what-percentage-of-new-content-is-ai-generated",
  },
  {
    ref: 12,
    author: "ACM",
    title: "People Cannot Distinguish GPT-4 From a Human in a Turing Test",
    note: "2024/2025 — general participants ~54% judge GPT-4 as human.",
  },
  {
    ref: 17,
    author: "Aalto University (via Tech Xplore)",
    title: "AI Use Makes Us Overestimate Our Cognitive Performance",
    note: "Oct 2025 — higher AI literacy → greater overconfidence with ChatGPT.",
  },
  {
    ref: 20,
    author: "UBS (via Reuters)",
    title: "ChatGPT Sets Record for Fastest-Growing User Base",
    note: "Feb 2023 — 100M MAU in two months.",
  },
  {
    ref: 23,
    author: "Heifetz, Ronald A.",
    title: "Leadership Without Easy Answers",
    note: "1994 — technical vs adaptive challenges; essential for Section 1 reframe.",
  },
] as const;
