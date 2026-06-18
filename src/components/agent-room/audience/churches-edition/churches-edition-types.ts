import type { AskAiPromptKey } from "@/lib/agent-room/ask-ai";
import type { DocumentChip } from "@/components/agent-room/document/document-page-shell";

export type AudienceEditionSlug = "churches" | "nonprofits" | "institutions";

export type EditionNavEntry = { id: string; label: string };

export type EditionAccent = "blue" | "margin" | "ink";

export type EditionEvidenceCard = {
  where: string;
  num: string;
  accent: EditionAccent;
  title: string;
  body: string;
  evidence: {
    bold: string;
    detail?: string;
    source: string;
  };
};

export type EditionPathStage = {
  n: string;
  title: string;
  body: string;
  /** First stage links to safety path */
  href?: string;
  isFirst?: boolean;
};

export type EditionCharterPart = {
  n: string;
  title: string;
  body: string;
};

export type EditionLayerGroup = {
  title: string;
  tag: string;
  items: readonly string[];
  isBase?: boolean;
};

export type EditionCarouselSlide =
  | { kind: "quote"; quote: string; body?: string }
  | { kind: "content"; bold?: string; body: string };

export type EditionCta = {
  label: string;
  href: string;
  variant: "solid" | "ghost";
};

export type ChurchesEditionConfig = {
  slug: AudienceEditionSlug;
  mastVolume: string;
  nav: readonly EditionNavEntry[];
  hero: {
    eyebrow: string;
    leadClaim: string;
    intro: string;
    cardsNote: string;
  };
  evidenceCards: readonly EditionEvidenceCard[];
  path: {
    eyebrow: string;
    title: string;
    intro: string;
    stages: readonly EditionPathStage[];
    note: string;
  };
  safety: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
    marginalia: string;
    charterParts: readonly EditionCharterPart[];
  };
  solutions: {
    eyebrow: string;
    title: string;
    intro: string;
    layers: readonly EditionLayerGroup[];
    charterMini: {
      rn: string;
      title: string;
      body: string;
      pin: string;
    };
  };
  platform: {
    eyebrow: string;
    title: string;
    slides: readonly EditionCarouselSlide[];
  };
  limit: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
    marginalia: string;
  };
  start: {
    eyebrow: string;
    title: string;
    body: string;
    ctas: readonly EditionCta[];
    askAiPromptKey: AskAiPromptKey;
  };
  dock: {
    voiceLine: string;
    highlightChipLabel: string;
    chips: readonly DocumentChip[];
  };
};
