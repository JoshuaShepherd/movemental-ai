/* ------------------------------------------------------------------ */
/*  Types & helpers that can be imported from both server and client    */
/* ------------------------------------------------------------------ */

export type BookPart = {
  number: number;
  title: string;
  /** Chapter `number` values (0 = preface, 1–22 = chapters, 99 = coda). */
  chapters: number[];
};

export type ChapterKind = "preface" | "chapter" | "coda";

export type ChapterPublicationStatus = "live" | "coming_soon";

export type Chapter = {
  /** 0 = preface, 1–22 = chapters, 99 = coda */
  number: number;
  slug: string;
  title: string;
  chapterKind: ChapterKind;
  partNumber: number;
  partTitle: string;
  /** Raw markdown body (title stripped); empty when coming_soon */
  body: string;
  paragraphs: Paragraph[];
  wordCount: number;
  readingTime: number;
  publicationStatus: ChapterPublicationStatus;
};

export type Paragraph = {
  id: string;
  /** Raw markdown text of the paragraph */
  text: string;
  /** Index within the chapter body */
  index: number;
};

export type AudienceLens =
  | "movement-leaders"
  | "churches"
  | "nonprofits"
  | "institutions";

/** Declarative spine: read order, filenames `NN-slug.md`, SEO slugs. */
export type BookSpineEntry = {
  filePrefix: string;
  slug: string;
  chapterKind: ChapterKind;
  /** 0 preface, 1–22 chapters, 99 coda */
  number: number;
  /** TOC / coming-soon title when file is absent */
  plannedTitle: string;
};

export const BOOK_SPINE: readonly BookSpineEntry[] = [
  {
    filePrefix: "00",
    slug: "preface-the-scatter-field",
    chapterKind: "preface",
    number: 0,
    plannedTitle: "The scatter field you are already standing in",
  },
  {
    filePrefix: "01",
    slug: "the-invisible-tax",
    chapterKind: "chapter",
    number: 1,
    plannedTitle: "The invisible tax",
  },
  {
    filePrefix: "02",
    slug: "two-intelligences",
    chapterKind: "chapter",
    number: 2,
    plannedTitle: "Two intelligences",
  },
  {
    filePrefix: "03",
    slug: "fragmentation-is-structural",
    chapterKind: "chapter",
    number: 3,
    plannedTitle: "Fragmentation is structural, not a content problem",
  },
  {
    filePrefix: "04",
    slug: "the-moment-ai-made-the-tax-visible",
    chapterKind: "chapter",
    number: 4,
    plannedTitle: "The moment AI made the tax visible",
  },
  {
    filePrefix: "05",
    slug: "the-six-stages-at-a-glance",
    chapterKind: "chapter",
    number: 5,
    plannedTitle: "The six stages, at a glance",
  },
  {
    filePrefix: "06",
    slug: "what-integration-actually-is",
    chapterKind: "chapter",
    number: 6,
    plannedTitle: "What integration actually is",
  },
  {
    filePrefix: "07",
    slug: "minting-the-schema",
    chapterKind: "chapter",
    number: 7,
    plannedTitle: "Minting the schema",
  },
  {
    filePrefix: "08",
    slug: "carry-forward",
    chapterKind: "chapter",
    number: 8,
    plannedTitle: "Carry-forward",
  },
  {
    filePrefix: "09",
    slug: "why-integration-stalls",
    chapterKind: "chapter",
    number: 9,
    plannedTitle: "Why integration stalls (and how to start anyway)",
  },
  {
    filePrefix: "10",
    slug: "activation-the-library-answers",
    chapterKind: "chapter",
    number: 10,
    plannedTitle: "Activation: the library answers",
  },
  {
    filePrefix: "11",
    slug: "the-library-the-pathways-the-voice",
    chapterKind: "chapter",
    number: 11,
    plannedTitle: "The library, the pathways, the voice",
  },
  {
    filePrefix: "12",
    slug: "formation-as-the-moral-stage",
    chapterKind: "chapter",
    number: 12,
    plannedTitle: "Formation as the moral stage",
  },
  {
    filePrefix: "13",
    slug: "information-can-be-structured-formation-requires-relationship",
    chapterKind: "chapter",
    number: 13,
    plannedTitle: "Information can be structured; formation requires relationship",
  },
  {
    filePrefix: "14",
    slug: "multiplication-when-the-work-stops-depending-on-you",
    chapterKind: "chapter",
    number: 14,
    plannedTitle: "Multiplication: when the work stops depending on you",
  },
  {
    filePrefix: "15",
    slug: "orbits-and-infra-channels",
    chapterKind: "chapter",
    number: 15,
    plannedTitle: "Orbits and infra channels",
  },
  {
    filePrefix: "16",
    slug: "movement-when-platforms-become-a-field",
    chapterKind: "chapter",
    number: 16,
    plannedTitle: "Movement: when platforms become a field",
  },
  {
    filePrefix: "17",
    slug: "the-movement-leader-author",
    chapterKind: "chapter",
    number: 17,
    plannedTitle: "The movement leader / author",
  },
  {
    filePrefix: "18",
    slug: "the-nonprofit",
    chapterKind: "chapter",
    number: 18,
    plannedTitle: "The nonprofit",
  },
  {
    filePrefix: "19",
    slug: "the-church",
    chapterKind: "chapter",
    number: 19,
    plannedTitle: "The church",
  },
  {
    filePrefix: "20",
    slug: "the-institution",
    chapterKind: "chapter",
    number: 20,
    plannedTitle: "The institution",
  },
  {
    filePrefix: "21",
    slug: "stewardship-the-ethical-weight-of-integrated-intelligence",
    chapterKind: "chapter",
    number: 21,
    plannedTitle: "Stewardship: the ethical weight of integrated intelligence",
  },
  {
    filePrefix: "22",
    slug: "starting-where-you-are",
    chapterKind: "chapter",
    number: 22,
    plannedTitle: "Starting where you are",
  },
  {
    filePrefix: "23",
    slug: "coda-the-movement-you-join-when-you-stop-fragmenting",
    chapterKind: "coda",
    number: 99,
    plannedTitle: "The movement you join when you stop fragmenting",
  },
] as const;

export const bookParts: BookPart[] = [
  {
    number: 1,
    title: "The tax you are already paying",
    chapters: [0, 1, 2, 3, 4],
  },
  { number: 2, title: "The map", chapters: [5] },
  {
    number: 3,
    title: "Integration (the stage everything depends on)",
    chapters: [6, 7, 8, 9],
  },
  {
    number: 4,
    title: "Activation and formation (the payback)",
    chapters: [10, 11, 12, 13],
  },
  {
    number: 5,
    title: "Multiplication and movement (the compounding)",
    chapters: [14, 15, 16],
  },
  { number: 6, title: "Playbooks", chapters: [17, 18, 19, 20] },
  {
    number: 7,
    title: "The moral frame and the beginning",
    chapters: [21, 22, 99],
  },
];

export function chapterLabel(chapter: Pick<Chapter, "number" | "chapterKind">): string {
  if (chapter.chapterKind === "preface") return "Preface";
  if (chapter.chapterKind === "coda") return "Coda";
  return `Chapter ${chapter.number}`;
}

export function formatLens(lens: AudienceLens): string {
  switch (lens) {
    case "movement-leaders":
      return "Movement Leaders";
    case "churches":
      return "Church Leaders";
    case "nonprofits":
      return "Nonprofit Leaders";
    case "institutions":
      return "Institutions";
  }
}

/** Valid lens query values (default route omits param for movement-leaders). */
export const AUDIENCE_LENS_VALUES: readonly AudienceLens[] = [
  "movement-leaders",
  "churches",
  "nonprofits",
  "institutions",
] as const;

export function parseAudienceLens(value: string | undefined): AudienceLens {
  if (value && (AUDIENCE_LENS_VALUES as readonly string[]).includes(value)) {
    return value as AudienceLens;
  }
  return "movement-leaders";
}
