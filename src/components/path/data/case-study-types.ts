/**
 * Shared case-study type — used by all three audience case-study files.
 */

/** A single block of prose-shaped content inside a case-study section. */
export type CaseStudyBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; items: ReadonlyArray<string> }
  | { kind: "pull"; text: string }
  | { kind: "emphasis"; text: string }
  | { kind: "numbered"; items: ReadonlyArray<string> };

/** A "before / case-step / produced / why" section. */
export type CaseStudySection = {
  /** Optional eyebrow ("Step 01 · Safety"). */
  eyebrow?: string;
  /** Section title — may include `<em>`. */
  title: string;
  /** Top-level blocks shown above any What they did/changed columns. */
  intro?: ReadonlyArray<CaseStudyBlock>;
  /** Optional 2-column "What they did / What changed" pair. */
  what?: {
    didLabel: string;
    didBlocks: ReadonlyArray<CaseStudyBlock>;
    changedLabel: string;
    changedBlocks: ReadonlyArray<CaseStudyBlock>;
  };
};

export type CaseStudyConfig = {
  eyebrow: string;
  /** "How a mid-sized youth nonprofit brought AI under control..." */
  title: string;
  /** Intro line under the title. */
  lede: string;
  /** Three stat tiles. `meta` adds a smaller note under the label. */
  stats: ReadonlyArray<{ num: string; label: string; meta?: string }>;
  /** Section blocks: situation → 4 stage steps → produced → why. */
  sections: ReadonlyArray<CaseStudySection>;
};
