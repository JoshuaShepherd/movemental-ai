/**
 * Copy and image paths for the fragmentation narrative page.
 * Audience / field keys align with the HTML mockups in docs/build/.
 */

import type { IntelAudience, IntelField, NarrativeIntelSlug } from "@/components/intel-artifacts/types";

export type AudienceId = "leader" | "nonprofit" | "church" | "institution";

export type IntelligenceField = "informational" | "relational";

/** Map story field rail to intel-artifact `field` prop. */
export function toIntelField(field: IntelligenceField): IntelField {
  return field === "relational" ? "rel" : "info";
}

/** Map story audience to intel-artifact `audience` (institution → seminary). */
export function toIntelAudience(audience: AudienceId): IntelAudience {
  return audience === "institution" ? "seminary" : audience;
}

export const AUDIENCE_ORDER: AudienceId[] = [
  "leader",
  "nonprofit",
  "church",
  "institution",
];

export const AUDIENCE_LABEL: Record<AudienceId, string> = {
  leader: "Movement Leaders",
  nonprofit: "Nonprofits",
  church: "Churches",
  institution: "Institutions",
};

export const AUDIENCE_PANEL_META: Record<AudienceId, string> = {
  leader: "Audience 01 · Movement leader",
  nonprofit: "Audience 02 · Nonprofit",
  church: "Audience 03 · Church",
  institution: "Audience 04 · Institution (seminary, university, network)",
};

/** WebP assets under public/images/fragmentation-story/ */
export const IMG = {
  orderOfService: "/images/fragmentation-story/order-of-service-structured-units.webp",
  sessionCard: "/images/fragmentation-story/session-essential-structures-card.webp",
  splitFlow: "/images/fragmentation-story/formal-design-systems-split-flow.webp",
  book: "/images/fragmentation-story/book-fragments-of-form.webp",
  module: "/images/fragmentation-story/module-formal-systems-intro.webp",
  coverPrinciples: "/images/fragmentation-story/cover-principles-design-fragmentation.webp",
  coverStructural: "/images/fragmentation-story/cover-structural-fragments-investigation.webp",
  podcast: "/images/fragmentation-story/podcast-card-abstract-structures.webp",
  chat: "/images/fragmentation-story/mobile-chat-skeleton-bubbles.webp",
  email: "/images/fragmentation-story/email-thread-multi-participant.webp",
  thread: "/images/fragmentation-story/message-thread-staggered-fragments.webp",
  hub: "/images/fragmentation-story/core-hub-to-fragment-nodes.webp",
  sketch: "/images/fragmentation-story/sketch-converge-diverge-flow.webp",
  stage: "/images/fragmentation-story/stage-presentation-three-shapes.webp",
} as const;

/**
 * Narrative intel slugs backed by authored WebP in `public/images/fragmentation-story/`
 * (basename === slug). Other narrative slugs still render via the intel React registry.
 */
const FRAGMENTATION_STORY_WEBP_SLUG_SET = new Set<NarrativeIntelSlug>([
  "order-of-service-structured-units",
  "session-essential-structures-card",
  "formal-design-systems-split-flow",
  "book-fragments-of-form",
  "module-formal-systems-intro",
  "cover-principles-design-fragmentation",
  "cover-structural-fragments-investigation",
  "podcast-card-abstract-structures",
  "mobile-chat-skeleton-bubbles",
  "email-thread-multi-participant",
  "message-thread-staggered-fragments",
  "core-hub-to-fragment-nodes",
  "sketch-converge-diverge-flow",
  "stage-presentation-three-shapes",
]);

export function isFragmentationStoryWebpSlug(slug: NarrativeIntelSlug): boolean {
  return FRAGMENTATION_STORY_WEBP_SLUG_SET.has(slug);
}

export function fragmentationStoryWebpPath(slug: NarrativeIntelSlug): string {
  return `/images/fragmentation-story/${slug}.webp`;
}

export type ChapterId =
  | "unity"
  | "session"
  | "first-break"
  | "divergence"
  | "channels"
  | "misalignment";

/** Right-column inline figures — matches fragmentation-sticky-mockup.html `chapter__inline`. */
export const CHAPTER_INLINE: Record<
  ChapterId,
  {
    slug: NarrativeIntelSlug;
    alt: string;
    /** CSS aspect-ratio value e.g. "927 / 1152" */
    aspectRatio: string;
    /** Optional max width on the figure */
    maxWidthClass?: string;
  }
> = {
  unity: {
    slug: "order-of-service-structured-units",
    alt: "A structured order of service with numbered units.",
    aspectRatio: "927 / 1152",
  },
  session: {
    slug: "session-essential-structures-card",
    alt: "A session card describing essential structures.",
    aspectRatio: "928 / 1152",
  },
  "first-break": {
    slug: "formal-design-systems-split-flow",
    alt: "A split flow diagram showing one node branching into many.",
    aspectRatio: "1312 / 816",
    maxWidthClass: "max-w-md",
  },
  divergence: {
    slug: "book-fragments-of-form",
    alt: "A book titled Fragments of Form.",
    aspectRatio: "896 / 1200",
  },
  channels: {
    slug: "mobile-chat-skeleton-bubbles",
    alt: "A mobile chat thread with skeleton message bubbles.",
    aspectRatio: "928 / 1152",
  },
  misalignment: {
    slug: "message-thread-staggered-fragments",
    alt: "A staggered message thread with fragmented replies.",
    aspectRatio: "928 / 1152",
  },
};

export type ChapterDef = {
  id: ChapterId;
  meta: string;
  title: string;
  /** Default paragraphs; audience-specific overrides optional */
  paragraphs: string[];
  /** Optional HTML in paragraph (use sparingly) */
  paragraphsHtml?: boolean[];
  /** Override paragraphs[1] or last for audience+field */
  audienceParagraphs?: Partial<
    Record<
      AudienceId,
      Partial<
        Record<IntelligenceField, { paragraphIndex: number; text: string }[]>
      >
    >
  >;
};

const baseChapters: ChapterDef[] = [
  {
    id: "unity",
    meta: "Act I · Unity",
    title: "One surface. One sequence.",
    paragraphs: [
      "At the start, everything you make sits in a single, readable shape. One bulletin. One schedule. One room. A person can hold it in their hands and know what comes next.",
      "This is what **coherence** looks like. Nothing is louder than anything else. Nothing is missing.",
    ],
  },
  {
    id: "session",
    meta: "Act I · Unity",
    title: "Designed to be whole.",
    paragraphs: [
      "A session card. A teaching plan. A single artifact that carries the whole idea and the order it moves in. It is the **complete unit of meaning**—before anything is copied, forwarded, or restated.",
    ],
  },
  {
    id: "first-break",
    meta: "Act II · First break",
    title: "The same thing—twice.",
    paragraphs: [
      "Then something subtle happens. The work gets copied. A diagram appears in two places, with two versions. Neither is wrong. Neither is canonical.",
      "This is the first quiet tear. **Duplication without a center.**",
    ],
  },
  {
    id: "divergence",
    meta: "Act III · Divergence",
    title: "A book. A module. A cover. A PDF.",
    paragraphs: [
      "One body of thought becomes many surfaces. The book says one thing. The course says it differently. The cover promises a third angle. Each is well made. None of them knows about the others.",
      "What started as **one idea** now travels as **four disconnected artifacts**.",
    ],
  },
  {
    id: "channels",
    meta: "Act IV · Channels multiply",
    title: "Now it lives, in real time, in parallel.",
    paragraphs: [
      "Podcasts get recorded. Chat threads answer the same question three different ways. The idea is no longer an object—it is a stream, running through channels that were never designed to stay in sync.",
      "Everything is **findable**. Nothing is **unified**.",
    ],
  },
  {
    id: "misalignment",
    meta: "Act V · Misalignment",
    title: "The thread loses the plot.",
    paragraphs: [
      "At the end of the line: an email chain with seven names on it, a staggered reply, a quote pulled from a draft nobody shipped. The signal is still there—just **distributed across people who aren't talking to each other**.",
      "This is the state most work lives in. Not broken. Just **ambient, fragmented, and quietly expensive**.",
    ],
  },
];

/** Split `**bold**` text into segments. Pure data — render in a .tsx file. */
export function splitEmphasis(text: string): Array<{ text: string; emphasis: boolean }> {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => ({ text: part, emphasis: i % 2 === 1 }));
}

/** Act III–V accent by audience (informational lens examples) */
const informationalAccent: Record<
  AudienceId,
  Partial<Record<ChapterId, string>>
> = {
  leader: {
    divergence:
      "Manuscripts across tools. Talks on platforms you don't own. The corpus that should be one library is many exports.",
    channels:
      "Substack, YouTube, courseware, and cohort chat each carry a different slice of the same argument.",
    misalignment:
      "AI surfaces a competitor's cleaner summary of your own framework because theirs is more attributable.",
  },
  nonprofit: {
    divergence:
      "Program PDFs, grant attachments, donor decks, and the annual report each tell a parallel version of impact.",
    channels:
      "Development posts, program blogs, and volunteer SMS run on different rhythms with no shared foundation.",
    misalignment:
      "The story a major donor heard last quarter no longer exists in any file the program team can find.",
  },
  church: {
    divergence:
      "Liturgy, curriculum, small-group kits, and sermon series live as separate well-meaning artifacts.",
    channels:
      "Instagram clips, newsletter blurbs, and parent emails multiply without a single canonical narrative.",
    misalignment:
      "Pastoral care threads and admin email hold the relational truth the bulletin never sees.",
  },
  institution: {
    divergence:
      "Syllabus, reader, LMS module, department site, and faculty notes diverge before week three.",
    channels:
      "Research center site, registrar comms, department blogs, and student Slack each fragment the same institutional arc.",
    misalignment:
      "Accreditation packets, department plans, and classroom reality drift apart because no artifact owns the whole.",
  },
};

const relationalAccent: Record<
  AudienceId,
  Partial<Record<ChapterId, string>>
> = {
  leader: {
    divergence:
      "Board packets, publisher relationships, and cohort trust live in different inboxes than the corpus.",
    channels:
      "Mentoring threads, conference hallway debriefs, and DM chains carry the same care on parallel tracks.",
    misalignment:
      "Succession lives in relationships—not folders—so when staff turns over, the network thins.",
  },
  nonprofit: {
    divergence:
      "Program staff and development each know true stories—with no shared relational memory between them.",
    channels:
      "Donor coffees, grant officer calls, and beneficiary intake repeat the same questions in different rooms.",
    misalignment:
      "When a development hire leaves, years of donor nuance walk out with their inbox.",
  },
  church: {
    divergence:
      "Elders, volunteers, and families meet the church through different relational graphs with no shared spine.",
    channels:
      "Care conversations, group texts, and Sunday handoffs multiply faster than any single leader can stitch.",
    misalignment:
      "The people who need the answer were never in the same thread as the people who had it.",
  },
  institution: {
    divergence:
      "Trustees, faculty, departments, and student cohorts each carry a faithful fragment of the institution's story.",
    channels:
      "Advising, field education, research partnerships, and alumni touchpoints run on tools that never compare notes.",
    misalignment:
      "The relational capital that sustains the institution sits in tenure-line heads and private threads.",
  },
};

export function getChaptersFor(
  audience: AudienceId,
  field: IntelligenceField
): Array<
  ChapterDef & { resolvedParagraphs: string[] }
> {
  const accent =
    field === "informational" ? informationalAccent : relationalAccent;
  return baseChapters.map((ch) => {
    const extra = accent[audience]?.[ch.id];
    const resolvedParagraphs =
      extra && ch.paragraphs.length >= 1
        ? [ch.paragraphs[0] + " " + extra, ...ch.paragraphs.slice(1)]
        : [...ch.paragraphs];
    return { ...ch, resolvedParagraphs };
  });
}

export type ScatterTile = {
  key: string;
  slug: NarrativeIntelSlug;
  /** Percent positions on field */
  t: string;
  l: string;
  /** Rotation in degrees (GSAP) */
  rotate: number;
  s: number;
  w: string;
  ar: string;
};

export const SCATTER_TILES: ScatterTile[] = [
  { key: "book", slug: "book-fragments-of-form", t: "13%", l: "10%", rotate: -5, s: 1, w: "11.5rem", ar: "896/1200" },
  { key: "hub", slug: "core-hub-to-fragment-nodes", t: "10%", l: "38%", rotate: 2, s: 0.95, w: "12rem", ar: "1/1" },
  {
    key: "coverP",
    slug: "cover-principles-design-fragmentation",
    t: "14%",
    l: "62%",
    rotate: -2,
    s: 0.98,
    w: "11.5rem",
    ar: "928/1152",
  },
  {
    key: "coverS",
    slug: "cover-structural-fragments-investigation",
    t: "12%",
    l: "86%",
    rotate: 6,
    s: 0.85,
    w: "9.5rem",
    ar: "928/1152",
  },
  {
    key: "email",
    slug: "email-thread-multi-participant",
    t: "34%",
    l: "6%",
    rotate: 3,
    s: 0.98,
    w: "11rem",
    ar: "927/1152",
  },
  {
    key: "split",
    slug: "formal-design-systems-split-flow",
    t: "46%",
    l: "40%",
    rotate: -3,
    s: 1,
    w: "15rem",
    ar: "1312/816",
  },
  {
    key: "thread",
    slug: "message-thread-staggered-fragments",
    t: "38%",
    l: "72%",
    rotate: 5,
    s: 0.92,
    w: "11rem",
    ar: "928/1152",
  },
  {
    key: "chat",
    slug: "mobile-chat-skeleton-bubbles",
    t: "52%",
    l: "90%",
    rotate: -4,
    s: 0.78,
    w: "8.5rem",
    ar: "928/1152",
  },
  {
    key: "module",
    slug: "module-formal-systems-intro",
    t: "64%",
    l: "7%",
    rotate: 4,
    s: 0.88,
    w: "10.5rem",
    ar: "928/1152",
  },
  {
    key: "order",
    slug: "order-of-service-structured-units",
    t: "74%",
    l: "34%",
    rotate: -6,
    s: 0.98,
    w: "11.5rem",
    ar: "927/1152",
  },
  {
    key: "podcast",
    slug: "podcast-card-abstract-structures",
    t: "68%",
    l: "56%",
    rotate: 2,
    s: 1,
    w: "12rem",
    ar: "1/1",
  },
  {
    key: "session",
    slug: "session-essential-structures-card",
    t: "80%",
    l: "82%",
    rotate: -4,
    s: 0.82,
    w: "9.5rem",
    ar: "928/1152",
  },
  {
    key: "sketch",
    slug: "sketch-converge-diverge-flow",
    t: "88%",
    l: "22%",
    rotate: 5,
    s: 0.78,
    w: "10.5rem",
    ar: "1/1",
  },
  {
    key: "stage",
    slug: "stage-presentation-three-shapes",
    t: "90%",
    l: "66%",
    rotate: -3,
    s: 0.88,
    w: "14rem",
    ar: "1600/872",
  },
];

/**
 * Per-audience permutation of scatter DOM slots (slot `i` renders `SCATTER_TILES[perm[i]]`).
 * Matches `SCATTER_PERM` in docs/build/fragmentation-unified-narrative.js (`seminary` → `institution`).
 */
export const SCATTER_PERM_BY_AUDIENCE: Record<AudienceId, readonly number[]> = {
  leader: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  nonprofit: [3, 0, 5, 2, 7, 1, 9, 4, 11, 6, 13, 8, 10, 12],
  church: [8, 10, 0, 12, 2, 4, 6, 1, 3, 5, 7, 9, 11, 13],
  institution: [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
};

export function getScatterTilesForAudience(audience: AudienceId): ScatterTile[] {
  const perm = SCATTER_PERM_BY_AUDIENCE[audience];
  if (perm.length !== SCATTER_TILES.length) return [...SCATTER_TILES];
  return perm.map((idx) => SCATTER_TILES[idx]!);
}

export function getCostLedger(
  audience: AudienceId,
  field: IntelligenceField
): { eyebrow: string; title: string; items: string[] } {
  const base = {
    eyebrow: "What it's costing you",
    title: "You built all of this.\nNone of it can find itself.",
  };
  if (field === "informational") {
    const byAudience: Record<AudienceId, string[]> = {
      leader: [
        "Every channel is a search across publishers and platforms you do not control.",
        "Every copy is drift between book, course, and talk—none sure which is canonical.",
        "Every launch is a translation tax: the idea ships again instead of shipping once.",
      ],
      nonprofit: [
        "Grant narratives and program PDFs diverge before the site catches up.",
        "Case studies live where fundraisers cannot surface them at the moment of need.",
        "Board packets restate what staff already proved—hours lost to recomposition.",
      ],
      church: [
        "Curriculum, liturgy, and messaging disagree about the same season of the church year.",
        "Families hear different vocabularies from stage, small group, and social.",
        "Volunteer handbooks age in silence while Sunday keeps changing.",
      ],
      institution: [
        "Syllabus, reader, LMS, and department site disagree by week four.",
        "Accreditation evidence and classroom practice are narrated in parallel files.",
        "Faculty research never lands where students, partners, and funders already live online.",
      ],
    };
    return { ...base, items: byAudience[audience] };
  }
  const rel: Record<AudienceId, string[]> = {
    leader: [
      "Mentoring energy repeats because no thread carries the whole network.",
      "Succession risk rises when relationships live in inboxes instead of a shared spine.",
      "Partners meet a leader's fragment—not the movement's whole intelligence.",
    ],
    nonprofit: [
      "Donors meet one relational story; beneficiaries hear another—both true, both isolated.",
      "Staff turnover walks away with donor nuance no CRM captured.",
      "Volunteer care threads never reconnect to the grant story funders need.",
    ],
    church: [
      "Pastoral threads and admin email hold truth the bulletin never sees.",
      "Elders and staff carry different relational maps of the same households.",
      "New members meet parallel welcomes from website, foyer, and group chat.",
    ],
    institution: [
      "Advising, field ed, research partnerships, and faculty DMs carry student formation no LMS records.",
      "Trust relationships with funders and partners live off-schema from curriculum.",
      "Alumni care continues in threads the registrar never sees.",
    ],
  };
  return { ...base, items: rel[audience] };
}

export function getClimaxCopy(): {
  eyebrow: string;
  titleBefore: string;
  titleEmphasis: string;
  sub: string;
} {
  return {
    eyebrow: "The answer",
    titleBefore: "One intelligence.",
    titleEmphasis: "Many expressions.",
    sub: "Every artifact, connected to one source of truth. The scatter stops being a tax and starts being a surface.",
  };
}

/** Short “full story” outcomes for Part II rails */
export function getFullStorySnippet(
  audience: AudienceId,
  field: IntelligenceField
): string {
  const snippets: Record<
    AudienceId,
    Record<IntelligenceField, string>
  > = {
    leader: {
      informational:
        "Integrated knowledge for a movement leader means one attributable corpus—publish once, cite cleanly, and let AI answer from your version, not a competitor's summary.",
      relational:
        "Integrated relationship means succession-ready memory: boards, publishers, and cohorts share one foundation so trust compounds instead of resetting every hire.",
    },
    nonprofit: {
      informational:
        "Integrated knowledge ties programs, development, and compliance to one narrative spine—grants, site, and reports update together.",
      relational:
        "Integrated relationship preserves donor and beneficiary truth across turnover—stories stay human without rewriting the org every two years.",
    },
    church: {
      informational:
        "Integrated knowledge aligns liturgy, curriculum, and public voice so families hear one story with many doors in.",
      relational:
        "Integrated relationship connects pastoral care, groups, and Sunday so nobody is the odd thread out.",
    },
    institution: {
      informational:
        "Integrated knowledge keeps syllabus, reader, department plans, and digital classroom in one versioned arc with clean attribution for accreditors, funders, and students alike.",
      relational:
        "Integrated relationship carries faculty, departments, field partners, and students across one trust graph—not parallel silences.",
    },
  };
  return snippets[audience][field];
}

export function parseAudienceParam(
  value: string | string[] | undefined
): AudienceId {
  const v = Array.isArray(value) ? value[0] : value;
  if (v === "nonprofit" || v === "church" || v === "institution" || v === "leader") {
    return v;
  }
  // Legacy URLs: `?audience=seminary` continues to resolve to institution.
  if (v === "seminary") return "institution";
  return "leader";
}

export function parseNodeCountParam(
  value: string | string[] | undefined,
  fallback = 24
): number {
  const v = Array.isArray(value) ? value[0] : value;
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function parseFieldParam(
  value: string | string[] | undefined
): IntelligenceField {
  const v = Array.isArray(value) ? value[0] : value;
  if (v === "relational") return "relational";
  return "informational";
}

/* ------------------------------------------------------------------
 * Stage copy — Integration → Movement
 * ------------------------------------------------------------------ */

export type StageCopy = {
  eyebrow: string;
  title: string;
  lede: string;
  captions: Array<{ t: string; b: string }>;
};

export const INTEGRATION_COPY: StageCopy = {
  eyebrow: "Stage 02 · Integration",
  title: "Connection replaces scatter.",
  lede:
    "The same artifacts—now clustered, related, aware of each other. Informational intelligence (the book, the course, the thread) and relational intelligence (the people, the partners, the cohort) are gathered into one coherent structure with a shared source of truth.",
  captions: [
    {
      t: "One source, many surfaces",
      b: "Update the book; the course, the deck, and the thread update with it.",
    },
    {
      t: "Relationships, not folders",
      b: "Every artifact knows what it belongs to. Context travels with the content.",
    },
    {
      t: "Both intelligences, one spine",
      b: "Taxonomy for content. A graph for people. Same system, two legible layers.",
    },
  ],
};

export const ACTIVATION_COPY: StageCopy = {
  eyebrow: "Stage 03 · Activation",
  title: "The intelligence becomes a workspace.",
  lede:
    "The system turns usable. Database, CMS, CRM, and LMS sit under one surface. Search, selection, and grounded AI make the corpus respond—anyone on the team can reach the right artifact and the right person at the right time.",
  captions: [
    {
      t: "Ask your own work",
      b: "Questions route through your corpus first; everything else is augmentation.",
    },
    {
      t: "Citations, not hallucinations",
      b: "Every answer shows which artifacts it came from, down to the chapter and timestamp.",
    },
    {
      t: "One team, one system",
      b: "A staff member, a partner, a new hire—all asking the same system for the same truth.",
    },
  ],
};

export const FORMATION_COPY: StageCopy = {
  eyebrow: "Stage 04 · Formation",
  title: "From access to formation.",
  lede:
    "Two arcs converge into one lived system. Informationally: dissonance → action → reflection → community → local embodied practice. Relationally: recognition → belonging → alignment → accountability → imitation. Content and community stop feeling separate.",
  captions: [
    {
      t: "Formation starts with tension",
      b: "Dissonance comes first. Formation begins with the felt gap between what is and what should be.",
    },
    {
      t: "Action before mastery",
      b: "People take small, real steps, then reflect with a cohort. The corpus serves the arc.",
    },
    {
      t: "Local, embodied, or nothing",
      b: "The path ends in practice in a neighbourhood, a team, a room. If it doesn't land there, it didn't form anyone.",
    },
  ],
};

/** Bottom relational arc — same shape as informational stops; positions match SVG polyline in formation stage. */
export const FORMATION_RELATIONAL_STOPS: Array<{
  t: string;
  l: string;
  slug: NarrativeIntelSlug;
  ar: string;
  label: string;
}> = [
  {
    t: "82.14%",
    l: "6%",
    slug: "email-thread-multi-participant",
    ar: "927/1152",
    label: "Recognition",
  },
  {
    t: "78.57%",
    l: "24%",
    slug: "mobile-chat-skeleton-bubbles",
    ar: "928/1152",
    label: "Belonging",
  },
  {
    t: "83.93%",
    l: "44%",
    slug: "crm-person-card",
    ar: "1/1",
    label: "Alignment",
  },
  {
    t: "78.57%",
    l: "64%",
    slug: "node-group",
    ar: "928/1152",
    label: "Accountability",
  },
  {
    t: "80.36%",
    l: "83%",
    slug: "session-essential-structures-card",
    ar: "928/1152",
    label: "Imitation",
  },
];

export const MULTIPLICATION_COPY: StageCopy = {
  eyebrow: "Stage 05 · Multiplication",
  title: "The platform grows the limbs to reproduce.",
  lede:
    "Multiplication is not more nodes—it is infrastructure. The integrated, activated, formative system develops the informational and relational capacities that let it reproduce: discovery, translation, AI, commerce on one side; memory, communications, networks, participation on the other.",
  captions: [
    {
      t: "Partners, leaders, credibility",
      b: "Orgs and public voices connect through the same spine—cohorts cite each other, partners reinforce trust, and the field stays legible without duplicating content everywhere.",
    },
    {
      t: "Informational infrastructure",
      b: "Search, AI answers, translation, subscriptions carry the same artifacts into every context.",
    },
    {
      t: "Relational infrastructure",
      b: "CRM memory, communications, network awareness, and participation propagate the practice between people.",
    },
  ],
};

/** Hub-and-field diagram for multiplication — normalized 0–100 coords (viewBox) for layout + SVG edges. */
export type MultiplicationOrbitNode = {
  id: string;
  title: string;
  subtitle?: string;
  /** 0–100, maps to % left / top with translate(-50%,-50%) */
  x: number;
  y: number;
};

export type MultiplicationCredibilityEdge = {
  from: string;
  to: string;
  label: string;
};

export type MultiplicationEcosystemDef = {
  orbit: MultiplicationOrbitNode[];
  edges: MultiplicationCredibilityEdge[];
};

const MULTIPLICATION_ECOSYSTEMS: Record<AudienceId, MultiplicationEcosystemDef> = {
  leader: {
    orbit: [
      { id: "brad-brisco", title: "Brad Brisco", subtitle: "Missional strategist", x: 50, y: 12 },
      { id: "jr-woodward", title: "JR Woodward", subtitle: "Network leader", x: 86, y: 28 },
      { id: "josh-shepherd", title: "Josh Shepherd", subtitle: "Platform builder", x: 86, y: 72 },
      { id: "tim-catchim", title: "Tim Catchim", subtitle: "APE practitioner", x: 50, y: 88 },
      { id: "pub-network", title: "Publishing partners", subtitle: "Shared canon & rights", x: 14, y: 72 },
      { id: "cohort-field", title: "Regional cohort field", subtitle: "Mutual visibility", x: 14, y: 28 },
    ],
    edges: [
      { from: "center", to: "brad-brisco", label: "Spine" },
      { from: "center", to: "jr-woodward", label: "Spine" },
      { from: "center", to: "josh-shepherd", label: "Spine" },
      { from: "center", to: "tim-catchim", label: "Spine" },
      { from: "center", to: "pub-network", label: "Spine" },
      { from: "center", to: "cohort-field", label: "Spine" },
      { from: "brad-brisco", to: "jr-woodward", label: "Co-teaches" },
      { from: "josh-shepherd", to: "tim-catchim", label: "Aligned practice" },
      { from: "pub-network", to: "cohort-field", label: "Mutual citation" },
    ],
  },
  nonprofit: {
    orbit: [
      { id: "ed", title: "Executive Director", subtitle: "Leadership", x: 50, y: 12 },
      { id: "dev", title: "Development Lead", subtitle: "Fundraising", x: 86, y: 32 },
      { id: "program", title: "Program Director", subtitle: "Impact", x: 86, y: 68 },
      { id: "board", title: "Board Chair", subtitle: "Governance", x: 50, y: 88 },
      { id: "partner", title: "Partner org", subtitle: "Co-delivery", x: 14, y: 68 },
      { id: "donor", title: "Major donor", subtitle: "Stakeholder", x: 14, y: 32 },
    ],
    edges: [
      { from: "center", to: "ed", label: "Spine" },
      { from: "center", to: "dev", label: "Spine" },
      { from: "center", to: "program", label: "Spine" },
      { from: "center", to: "board", label: "Spine" },
      { from: "center", to: "partner", label: "Spine" },
      { from: "center", to: "donor", label: "Spine" },
      { from: "partner", to: "board", label: "Governance" },
      { from: "ed", to: "program", label: "Strategy" },
      { from: "donor", to: "dev", label: "Stewardship" },
    ],
  },
  church: {
    orbit: [
      { id: "senior-pastor", title: "Senior Pastor", subtitle: "Teaching lead", x: 50, y: 12 },
      { id: "teaching", title: "Teaching Team", subtitle: "Formation", x: 86, y: 32 },
      { id: "ministry", title: "Ministry Leads", subtitle: "Practice", x: 86, y: 68 },
      { id: "elders", title: "Elders", subtitle: "Governance", x: 50, y: 88 },
      { id: "partner-church", title: "Partner church", subtitle: "Sister platform", x: 14, y: 68 },
      { id: "denomination", title: "Denominational lead", subtitle: "Network", x: 14, y: 32 },
    ],
    edges: [
      { from: "center", to: "senior-pastor", label: "Spine" },
      { from: "center", to: "teaching", label: "Spine" },
      { from: "center", to: "ministry", label: "Spine" },
      { from: "center", to: "elders", label: "Spine" },
      { from: "center", to: "partner-church", label: "Spine" },
      { from: "center", to: "denomination", label: "Spine" },
      { from: "senior-pastor", to: "teaching", label: "Liturgy" },
      { from: "elders", to: "partner-church", label: "Accountability" },
      { from: "ministry", to: "denomination", label: "Field" },
    ],
  },
  institution: {
    orbit: [
      { id: "department", title: "Department Head", subtitle: "Academic unit", x: 50, y: 12 },
      { id: "faculty", title: "Senior Faculty", subtitle: "Research / teaching", x: 86, y: 32 },
      { id: "research", title: "Research Lead", subtitle: "Inquiry", x: 86, y: 68 },
      { id: "registrar", title: "Registrar", subtitle: "Operations", x: 50, y: 88 },
      { id: "peer", title: "Peer institution", subtitle: "Collaboration", x: 14, y: 68 },
      { id: "funder", title: "Institutional funder", subtitle: "Stakeholder", x: 14, y: 32 },
    ],
    edges: [
      { from: "center", to: "department", label: "Spine" },
      { from: "center", to: "faculty", label: "Spine" },
      { from: "center", to: "research", label: "Spine" },
      { from: "center", to: "registrar", label: "Spine" },
      { from: "center", to: "peer", label: "Spine" },
      { from: "center", to: "funder", label: "Spine" },
      { from: "peer", to: "faculty", label: "Joint work" },
      { from: "department", to: "research", label: "Curriculum" },
      { from: "registrar", to: "funder", label: "Reporting" },
    ],
  },
};

export function getMultiplicationEcosystem(audience: AudienceId): MultiplicationEcosystemDef {
  return MULTIPLICATION_ECOSYSTEMS[audience];
}

export const MOVEMENT_COPY: Record<AudienceId, StageCopy> = {
  leader: {
    eyebrow: "Stage 06 · Movement",
    title: "Platforms as network nodes.",
    lede:
      "What multiplication makes possible, movement makes visible. Five movement leaders, each a full platform. Add peers to see how the field compounds—cross-pollinating canon, relational trust, and shared practice between systems.",
    captions: [
      {
        t: "Each node is a platform",
        b: "Every node on the graph carries its own integrated informational and relational intelligence.",
      },
      {
        t: "Edges carry practice",
        b: "Nodes aren't just connected—they exchange canon, cohorts, corrections, and cohort trust.",
      },
      {
        t: "The field is the product",
        b: "At scale, value lives in the network, not any single platform. The system becomes a commons.",
      },
    ],
  },
  nonprofit: {
    eyebrow: "Stage 06 · Movement",
    title: "Your org inside a live ecosystem.",
    lede:
      "Your org, its partners, and the stakeholders who carry the mission sit on a shared graph. Program, development, and governance stop being silos; the ecosystem becomes visible and addressable.",
    captions: [
      {
        t: "Partners are platforms",
        b: "Each partner org shows up as its own node carrying its own corpus and community.",
      },
      {
        t: "Stakeholders compound",
        b: "Donors, grantors, and board members belong to a field, not a file.",
      },
      {
        t: "Impact becomes legible",
        b: "When platforms connect, outcomes trace across orgs instead of restarting at each boundary.",
      },
    ],
  },
  church: {
    eyebrow: "Stage 06 · Movement",
    title: "Your church among sister churches.",
    lede:
      "Pastors, partner churches, parachurch collaborators, and denominational leaders belong to one visible network. Formation travels between rooms—content, care, and practice compound across the field.",
    captions: [
      {
        t: "Sister churches as nodes",
        b: "Each church is a platform carrying its own liturgy, cohort, and relational graph.",
      },
      {
        t: "Leaders are bridges",
        b: "Pastors and partners act as edges between platforms, not solitary operators.",
      },
      {
        t: "A regional field emerges",
        b: "Shared canon and trust between churches surfaces a movement where before there were only programs.",
      },
    ],
  },
  institution: {
    eyebrow: "Stage 06 · Movement",
    title: "An institution inside its field.",
    lede:
      "Departments, faculty, peer institutions, and external collaborators appear as nodes on one graph. Research, teaching, and partnerships stop running in parallel; the ecosystem becomes navigable and generative.",
    captions: [
      {
        t: "Peer institutions as nodes",
        b: "Each institution is a platform carrying its own curriculum, research, and trust graph.",
      },
      {
        t: "Faculty are bridges",
        b: "Researchers and practitioners connect platforms—edges carry canon, methods, and cohorts.",
      },
      {
        t: "The commons compounds",
        b: "Shared corpora and joint cohorts make the field addressable and cumulative.",
      },
    ],
  },
};

export function getStageCopy(
  stage: "integration" | "activation" | "formation" | "multiplication"
): StageCopy {
  switch (stage) {
    case "integration":
      return INTEGRATION_COPY;
    case "activation":
      return ACTIVATION_COPY;
    case "formation":
      return FORMATION_COPY;
    case "multiplication":
      return MULTIPLICATION_COPY;
  }
}

export function getMovementCopy(audience: AudienceId): StageCopy {
  return MOVEMENT_COPY[audience];
}

/* ------------------------------------------------------------------
 * Multiplication — infrastructure overlay
 * ------------------------------------------------------------------ */

export type InfraKind = "informational" | "relational";

export type InfraChannel = {
  id: string;
  kind: InfraKind;
  label: string;
  example: string;
  body: string;
};

export const MULTIPLICATION_INFRA: InfraChannel[] = [
  {
    id: "seo",
    kind: "informational",
    label: "Search & Discovery",
    example: "how to start a missional cohort",
    body: "Platform content surfaces where leaders already search. SEO + GEO carry the corpus to the moment of need.",
  },
  {
    id: "ai",
    kind: "informational",
    label: "AI Response",
    example: "Movement DNA · grounded answer",
    body: "Tenant-safe AI quotes the canon, cites the source, carries the voice. Every answer is attributable.",
  },
  {
    id: "translate",
    kind: "informational",
    label: "Translation",
    example: "EN · ES · PT · FR · KO · SW",
    body: "Every artifact, every language — one source of truth. Variants ship without drift.",
  },
  {
    id: "commerce",
    kind: "informational",
    label: "Commerce & Access",
    example: "Pro · Team · Enterprise",
    body: "Subscriptions, seats, and courseware meter access without fragmenting the corpus.",
  },
  {
    id: "crm",
    kind: "relational",
    label: "CRM Memory",
    example: "unified identity",
    body: "One record per person across donor, cohort, staff, and partner roles. Memory survives turnover.",
  },
  {
    id: "comms",
    kind: "relational",
    label: "Integrated Communications",
    example: "email · text · in-app",
    body: "Conversation travels with the artifact. No side channels; no lost context.",
  },
  {
    id: "network",
    kind: "relational",
    label: "Network Awareness",
    example: "who knows whom",
    body: "The platform knows the relational graph — partners, peers, mentors, alumni — and surfaces it.",
  },
  {
    id: "participation",
    kind: "relational",
    label: "Group Participation",
    example: "cohorts · circles",
    body: "Small groups are first-class objects. Participation, presence, and contribution are part of the system.",
  },
];

/* ------------------------------------------------------------------
 * Movement — node network per audience
 * ------------------------------------------------------------------ */

export type MovementNodeKind = "primary" | "seed" | "expansion";

export type MovementNode = {
  id: string;
  name: string;
  role?: string;
  kind: MovementNodeKind;
};

/** Fixed primary + seed roster per audience. Expansion nodes are synthesized. */
export const MOVEMENT_NODES: Record<AudienceId, MovementNode[]> = {
  leader: [
    { id: "alan-hirsch", name: "Alan Hirsch", role: "Author · Movement architect", kind: "primary" },
    { id: "brad-brisco", name: "Brad Brisco", role: "Missional strategist", kind: "seed" },
    { id: "jr-woodward", name: "JR Woodward", role: "Network leader", kind: "seed" },
    { id: "josh-shepherd", name: "Josh Shepherd", role: "Platform builder", kind: "seed" },
    { id: "tim-catchim", name: "Tim Catchim", role: "APE practitioner", kind: "seed" },
  ],
  nonprofit: [
    { id: "org", name: "Your org", role: "Central platform", kind: "primary" },
    { id: "ed", name: "Executive Director", role: "Leadership", kind: "seed" },
    { id: "dev", name: "Development Lead", role: "Fundraising", kind: "seed" },
    { id: "program", name: "Program Director", role: "Impact", kind: "seed" },
    { id: "board", name: "Board Chair", role: "Governance", kind: "seed" },
    { id: "partner", name: "Partner org", role: "Co-delivery", kind: "seed" },
    { id: "donor", name: "Major donor", role: "Stakeholder", kind: "seed" },
  ],
  church: [
    { id: "church", name: "Your church", role: "Central platform", kind: "primary" },
    { id: "senior-pastor", name: "Senior Pastor", role: "Teaching lead", kind: "seed" },
    { id: "elders", name: "Elders", role: "Governance", kind: "seed" },
    { id: "teaching", name: "Teaching Team", role: "Formation", kind: "seed" },
    { id: "ministry", name: "Ministry Leads", role: "Practice", kind: "seed" },
    { id: "partner-church", name: "Partner church", role: "Sister platform", kind: "seed" },
    { id: "denomination", name: "Denominational lead", role: "Network", kind: "seed" },
  ],
  institution: [
    { id: "institution", name: "Your institution", role: "Central platform", kind: "primary" },
    { id: "department", name: "Department Head", role: "Academic unit", kind: "seed" },
    { id: "faculty", name: "Senior Faculty", role: "Research / teaching", kind: "seed" },
    { id: "research", name: "Research Lead", role: "Inquiry", kind: "seed" },
    { id: "registrar", name: "Registrar", role: "Operations", kind: "seed" },
    { id: "peer", name: "Peer institution", role: "Collaboration", kind: "seed" },
    { id: "funder", name: "Institutional funder", role: "Stakeholder", kind: "seed" },
  ],
};

/** Stable expansion-node label generator per audience. */
const EXPANSION_LABELS: Record<AudienceId, string[]> = {
  leader: ["Platform builder", "Cohort operator", "Voice in the field", "Publisher"],
  nonprofit: ["Volunteer lead", "Grant officer", "Beneficiary network", "Thought leader"],
  church: ["Small-group leader", "Congregational steward", "Parachurch partner", "Regional lead"],
  institution: ["Student cohort", "Alumni network", "Embedded practitioner", "External collaborator"],
};

export type MovementNodeResolved = MovementNode & {
  /** Polar coords assigned by the generator, 0–1 radius, degrees 0–360. */
  r: number;
  theta: number;
};

export type MovementNetwork = {
  nodes: MovementNodeResolved[];
  edges: Array<[string, string]>;
};

/**
 * Resolve a node network for an audience at a given count (0–100).
 * Named seeds always appear when count > 0; expansion nodes are synthesized
 * with stable labels and deterministic angles so the layout is steady.
 */
export function getMovementNetwork(
  audience: AudienceId,
  count: number
): MovementNetwork {
  const clamped = Math.max(0, Math.min(100, Math.round(count)));
  const roster = MOVEMENT_NODES[audience];
  const resolved: MovementNodeResolved[] = [];
  const pool = Math.min(clamped, roster.length + 100);

  // Primary goes at center.
  const primary = roster.find((n) => n.kind === "primary");
  if (primary && clamped > 0) {
    resolved.push({ ...primary, r: 0, theta: 0 });
  }

  // Seeds ring the primary at radius 0.42.
  const seeds = roster.filter((n) => n.kind === "seed");
  const seedCount = Math.max(0, Math.min(seeds.length, pool - resolved.length));
  for (let i = 0; i < seedCount; i++) {
    const theta = (360 / Math.max(seeds.length, 1)) * i - 90;
    resolved.push({ ...seeds[i], r: 0.42, theta });
  }

  // Expansion nodes sit further out (radius 0.72–0.95) on a deterministic spiral.
  const labelRing = EXPANSION_LABELS[audience];
  let idx = 0;
  while (resolved.length < clamped) {
    const label = labelRing[idx % labelRing.length];
    const spiral = idx / Math.max(clamped - resolved.length, 1);
    // Golden-angle distribution keeps expansion nodes visually non-linear.
    const theta = (idx * 137.508) % 360;
    const r = 0.72 + ((idx * 0.11) % 1) * 0.23;
    resolved.push({
      id: `${audience}-x-${idx}`,
      name: label,
      role: undefined,
      kind: "expansion",
      r: Math.min(0.98, r + spiral * 0.02),
      theta,
    });
    idx++;
  }

  // Edges: spokes from primary to every visible seed, plus a scattering of
  // peer-to-peer edges among expansion nodes (every third pair, deterministic)
  // to imply network effects without clutter.
  const edges: Array<[string, string]> = [];
  const primaryNode = resolved.find((n) => n.kind === "primary");
  if (primaryNode) {
    resolved
      .filter((n) => n.kind === "seed")
      .forEach((n) => edges.push([primaryNode.id, n.id]));
    // A handful of expansion nodes also connect back to the primary.
    resolved
      .filter((n) => n.kind === "expansion")
      .forEach((n, i) => {
        if (i % 4 === 0) edges.push([primaryNode.id, n.id]);
      });
  }
  // Peer-to-peer edges for a field-feel when count is high.
  const expansions = resolved.filter((n) => n.kind === "expansion");
  for (let i = 0; i < expansions.length; i++) {
    if (i % 3 === 0 && i + 2 < expansions.length) {
      edges.push([expansions[i].id, expansions[i + 2].id]);
    }
  }

  return { nodes: resolved, edges };
}
