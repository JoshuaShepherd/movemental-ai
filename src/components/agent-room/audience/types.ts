export type AudienceNavEntry = { id: string; label: string };

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
    askAiPrompt: string;
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
    askAiPrompt: string;
  };
  nav: readonly AudienceNavEntry[];
  letterEmbedStart: string;
};
