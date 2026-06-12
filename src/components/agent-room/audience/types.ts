import type { AskAiPromptKey } from "@/lib/agent-room/ask-ai";
import type { DocumentChip } from "@/components/agent-room/document/document-page-shell";
import type { DeckData } from "@/components/agent-room/deck/deck-types";

export type AudienceNavEntry = { id: string; label: string };

/** The persistent concierge dock at the foot of an audience document. */
export type AudienceDock = {
  /** Caveat voice line the concierge writes above the chips. */
  voiceLine: string;
  /** The one chip that earns the highlighter swipe (null = none). */
  highlightChipLabel: string | null;
  chips: readonly DocumentChip[];
};

export type AudiencePainCard = { title: string; body: string };

export type AudienceFixRow = { pain: string; gain: string };

export type AudienceToolExample = { label: string; text: string };

export type AudiencePathStage = {
  n: string;
  title: string;
  here: boolean;
};

export type AudiencePageConfig = {
  slug: "institutions" | "churches" | "nonprofits";
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
  };
  painSection: {
    title: string;
    intro: string;
    cards: readonly AudiencePainCard[];
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
    title: string;
    paragraphs: readonly string[];
    toolExamples: readonly AudienceToolExample[];
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
    intro: string;
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
