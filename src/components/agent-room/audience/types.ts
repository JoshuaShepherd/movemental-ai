import type { AskAiPromptKey } from "@/lib/agent-room/ask-ai";
import type { DocumentChip } from "@/components/agent-room/document/document-page-shell";
import type { DeckData } from "@/components/agent-room/deck/deck-types";
import type { SourceId } from "@/lib/citations/sources";

export type AudienceNavEntry = { id: string; label: string };

/** The persistent concierge dock at the foot of an audience document. */
export type AudienceDock = {
  /** Caveat voice line the concierge writes above the chips. */
  voiceLine: string;
  /** The one chip that earns the highlighter swipe (null = none). */
  highlightChipLabel: string | null;
  chips: readonly DocumentChip[];
};

/**
 * A measured phrase inside a card body. The renderer wraps `phrase` (matched
 * verbatim in `body`) in a `.stat` underline; when `cite` is set it appends a
 * superscript that hover-links to the matching numbered entry in the Sources
 * dock. Only measured claims carry a cite — structural patterns never do.
 */
export type AudienceCardStat = { phrase: string; cite?: number };

/**
 * Card footer treatment. `sourced` → a mono "Sourced" pill (the card rests on a
 * verified statistic). `pattern` → a handwritten label (a structural pattern,
 * never dressed up as a survey number).
 */
export type AudienceCardFooter = { kind: "sourced" } | { kind: "pattern"; label: string };

export type AudiencePainCard = {
  title: string;
  body: string;
  /** Measured phrases to underline + optionally cite. */
  stats?: readonly AudienceCardStat[];
  /** Footer pill / hand label. Defaults to "sourced" when stats carry cites. */
  footer?: AudienceCardFooter;
  /** Structural-pattern card — renders on the surface tone (the HTML `.synth`). */
  synth?: boolean;
};

/**
 * One numbered entry in the Sources dock. `claim` is the plain-language summary;
 * the publisher attribution + "Verified" badge are derived from the canonical
 * `sources.ts` catalog via `sourceIds`, so the dock can never drift from the
 * single source of truth.
 */
export type AudienceSource = {
  n: number;
  claim: string;
  sourceIds: readonly SourceId[];
};

export type AudienceFixRow = { pain: string; gain: string };

export type AudiencePathStage = {
  n: string;
  title: string;
  here: boolean;
};

export type AudiencePageConfig = {
  slug: "institutions" | "churches" | "nonprofits";
  hero: {
    eyebrow: string;
    /** Legacy churches/institutions headline */
    title?: string;
    sub?: string;
    /** Claim-first layout (nonprofits) */
    rhetoricalTitle?: string;
    framing?: string;
    claim?: string;
    /** Phrase inside rhetoricalTitle that earns the page's single highlighter */
    highlightPhrase?: string;
    segue?: string;
  };
  painSection: {
    title: string;
    intro: string;
    cards: readonly AudiencePainCard[];
    /** Numbered, verified Sources dock under the evidence grid. */
    sources?: readonly AudienceSource[];
    /** Honest footnote on how many cards are patterns vs. measured claims. */
    sourcesNote?: string;
  };
  deeperProblem: {
    title: string;
    paragraphs: readonly string[];
  };
  theCase: {
    title: string;
    intro: string;
    letterAriaLabel: string;
    askAiPromptKey: AskAiPromptKey;
  };
  foundation: {
    title: string;
    paragraphs: readonly string[];
    fixRows: readonly AudienceFixRow[];
    diagramCenterLabel?: string;
  };
  theBuild: {
    /** H2 without the underline target — e.g. "Then we build the tools on top of it." */
    title: string;
    /** Phrase inside title that receives the ink underline — e.g. "the tools" */
    titleHighlight?: string;
    /** Subhead under the H2 */
    intro: string;
    /** Italic foot line under the explorer */
    footnote: string;
    /**
     * Optional seam-out line that hands the reader into the deck — raises the
     * "isn't this just an expensive website?" question the deck answers. Lets
     * "The build" own less of the platform-vs-website contrast so it isn't
     * argued twice.
     */
    bridgeQuestion?: string;
  };
  formation: {
    title: string;
    paragraphs: readonly string[];
    handLine?: string;
  };
  thePath: {
    headline?: string;
    intro: string;
    closing?: string;
  };
  start: {
    title: string;
    body: string;
    mailtoHref: string;
    downloadFilename: string;
    sendToBoardSubject: string;
    askAiPromptKey: AskAiPromptKey;
  };
  nav: readonly AudienceNavEntry[];
  letterEmbedStart: string;
  dock: AudienceDock;
  /**
   * Optional embedded "Why a platform" deck, rendered after "The build" and
   * before "Formation". When present, a nav anchor is inserted automatically.
   * Churches / institutions are later just new `DeckData` objects.
   */
  deck?: DeckData;
};
