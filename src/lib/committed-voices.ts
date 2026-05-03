/**
 * Committed voices — Movement Leaders Scenius.
 *
 * Published subset of `docs/movement_leader_research/<slug>/`. Editorial source
 * of truth lives in those folders; this module is the curated, rights-cleared
 * publication layer used by `/voices` and `/voices/[slug]`.
 *
 * Conventions:
 *  - `slug` matches the research-folder name and the URL path segment.
 *  - `portraitSrc` follows `/headshots/<slug>.webp` once licensed assets exist.
 *    Leaving it `undefined` triggers the editorial-portrait-in-production
 *    fallback (initials card) — same pattern as `team-page-content.tsx`.
 *  - `credentials` is capped at 4 lines per `docs/build/plans/...` plan §5.1.
 *  - `featuredWorks` lists titles only; no rights-encumbered links.
 *  - `lastReviewed` enables the quarterly review cadence (plan §8 risks).
 *  - `comingWork` keeps Phase 3 SKU slots honest — never invent ship dates.
 */

export type VoiceRelationship = "scenius";

export type ComingWorkStatus =
  | { kind: "in_development"; label: string }
  | { kind: "exploring"; label: string };

export type ComingWorkSlot = {
  /** Stable slot identifier — used for analytics later. */
  id: "courses" | "articles" | "agents";
  heading: string;
  status: ComingWorkStatus;
  /** One short sentence describing what this slot will hold. */
  preview: string;
};

export type CommittedVoice = {
  slug: "rowland-smith" | "liz-rios" | "jr-woodward";
  displayName: string;
  /** Public role line — what the cards and detail headings render. */
  role: string;
  /** City, state — appears as a quiet subline on the detail page. */
  locationLine: string;
  /** One-line thesis suitable for a card. ≤ 160 chars. */
  shortTagline: string;
  /** 2–3 short tags. ≤ 28 chars each. */
  themes: readonly string[];
  /** Public credentials — max 4 lines, drawn from the research README. */
  credentials: readonly string[];
  /** 2–3 paragraph editorial bio for `/voices/[slug]`. */
  editorialBio: readonly string[];
  /** Book / dissertation titles only. No links until rights are cleared. */
  featuredWorks: readonly string[];
  /** Primary external site — user leaves Movemental deliberately. */
  primaryUrl: string;
  /** Optional secondary external links — networks the person leads. */
  secondaryLinks: ReadonlyArray<{ label: string; href: string }>;
  /** `/headshots/<slug>.webp` once asset is licensed. Undefined → initials fallback. */
  portraitSrc?: string;
  /** Two-letter monogram for portrait fallback. */
  initials: string;
  /** Alt text used when `portraitSrc` is set. */
  portraitAlt: string;
  /** Phase 3 honest empty-state slots. */
  comingWork: readonly ComingWorkSlot[];
  /** ISO date — bump on quarterly review (plan §8). */
  lastReviewed: string;
  movementalRelationship: VoiceRelationship;
};

const REVIEWED_2026_04 = "2026-04-21" as const;

const STANDARD_COMING_WORK: readonly ComingWorkSlot[] = [
  {
    id: "courses",
    heading: "Courses",
    status: { kind: "in_development", label: "In development" },
    preview: "Cohort and self-paced offerings will appear here once shaped together.",
  },
  {
    id: "articles",
    heading: "Articles",
    status: { kind: "in_development", label: "In development" },
    preview: "Curated essays and field notes drawn from public work.",
  },
  {
    id: "agents",
    heading: "Conversation agents",
    status: { kind: "exploring", label: "Exploring" },
    preview: "Voice-faithful access to frameworks — only when consent and corpus are ready.",
  },
] as const;

export const COMMITTED_VOICES: readonly CommittedVoice[] = [
  {
    slug: "liz-rios",
    displayName: "Rev. Dr. Liz Rios",
    role: "Founder, Passion2Plant · Director, Púlpito Fellows",
    locationLine: "Central Florida & Puerto Rico",
    shortTagline:
      "Afro-Boricua theologian and church-planter building the only national BIPOC-woman-led planting network in the U.S.",
    themes: ["Church planting", "Bilingual formation", "Mujerista theology"],
    credentials: [
      "Founder, Passion2Plant — national BIPOC-woman-led church planting network",
      "Director, Púlpito Fellows — Lilly Endowment-funded preaching fellowship",
      "Adjunct, Fuller Theological Seminary",
      "Board, Sojourners · Senior Consultant, Freedom Road",
    ],
    editorialBio: [
      "Liz Rios has carried thirty-five years of ministry across pastoring, planting, teaching, and consulting — and into infrastructure. She founded Passion2Plant, the only national BIPOC-woman-led church planting network in the United States, and directs Púlpito Fellows, a three-year, bilingual preaching fellowship funded by the Lilly Endowment.",
      "Her work runs simultaneously across denominational, academic, and movement spaces: ordained Disciples of Christ; adjunct faculty at Fuller; board member at Sojourners; senior consultant with Freedom Road; consulting editor at Outreach Magazine. She holds a BA, MA, EdD, DMin, and a 2025 MA in Social Justice from Union.",
      "She writes from a mujerista frame — distinct in tone and theological surface area from anyone else inside Movemental's circle — and brings a live cohort operator's discipline to what a leader-platform actually has to carry.",
    ],
    featuredWorks: [
      "Don't Buy The Lie (sole author, 2012)",
      "Need to Know — contributor (100 Movements Publishing)",
      "Mujerista in Motion — Substack",
    ],
    primaryUrl: "https://www.passion2plant.org",
    secondaryLinks: [
      { label: "Púlpito Fellows", href: "https://www.pulpitofellows.org" },
      { label: "The Passion Center", href: "https://www.thepassioncenter.org" },
    ],
    initials: "LR",
    portraitAlt:
      "Portrait of Rev. Dr. Liz Rios, editorial photograph for the Movemental committed voices page.",
    comingWork: STANDARD_COMING_WORK,
    lastReviewed: REVIEWED_2026_04,
    movementalRelationship: "scenius",
  },
  {
    slug: "jr-woodward",
    displayName: "JR Woodward",
    role: "National Director, V3 Church Planting Movement",
    locationLine: "United States",
    shortTagline:
      "Three decades of church planting, three published books, and a Manchester Ph.D. on the powers of leadership.",
    themes: ["Church planting", "Published author", "Missional formation"],
    credentials: [
      "National Director, V3 Church Planting Movement",
      "Co-founder, Missio Alliance and Praxis Gathering",
      "Adjunct, Fuller · Central · Missio Seminary",
      "Ph.D., University of Manchester · M.A. Global Leadership, Fuller",
    ],
    editorialBio: [
      "JR Woodward has spent three decades planting churches that hold tight community, life-forming discipleship, locally rooted presence, and boundary-crossing mission together. He leads the V3 Church Planting Movement nationally and trains church planters across North America.",
      "His written corpus runs from Creating a Missional Culture (IVP, 2012) through The Church as Movement (IVP, 2016, with Dan White Jr.) to The Scandal of Leadership (100 Movements Publishing, 2023) — the trade book based on his Manchester Ph.D. on the powers of domination in the church.",
      "He co-founded Missio Alliance and the Praxis Gathering, teaches as adjunct faculty at Fuller, Central, and Missio Seminary, and serves on the boards of Reliant Mission, Movement Leaders Collective, and the Fuller Global Mission Advisory Council.",
    ],
    featuredWorks: [
      "Creating a Missional Culture (IVP, 2012)",
      "The Church as Movement (IVP, 2016, with Dan White Jr.)",
      "The Scandal of Leadership (100 Movements Publishing, 2023)",
    ],
    primaryUrl: "https://www.jrwoodward.com",
    secondaryLinks: [
      { label: "V3 Church Planting Movement", href: "https://thev3movement.org" },
      { label: "Missio Alliance", href: "https://www.missioalliance.org" },
    ],
    initials: "JW",
    portraitAlt:
      "Portrait of JR Woodward, editorial photograph for the Movemental committed voices page.",
    comingWork: STANDARD_COMING_WORK,
    lastReviewed: REVIEWED_2026_04,
    movementalRelationship: "scenius",
  },
  {
    slug: "rowland-smith",
    displayName: "L. Rowland Smith",
    role: "National Director, Forge America · Founder, The Pando Collective",
    locationLine: "Colorado Springs, Colorado",
    shortTagline:
      "National Forge leader, micro-church network founder, pastor, and curator of the Red Skies conversation.",
    themes: ["Mission training", "Micro-church networks", "Editorial curation"],
    credentials: [
      "National Director, Forge America Mission Training Network",
      "Founder/Director, The Pando Collective — Front-Range micro-church network",
      "Pastor of Missional Culture, The Church at Pulpit Rock",
      "Adjunct, Fuller · Denver Seminary · Grand Canyon University",
    ],
    editorialBio: [
      "Rowland Smith carries the National Director role at Forge America while founding and directing The Pando Collective, a Front-Range micro-church network, and pastoring missional culture at The Church at Pulpit Rock in Colorado Springs.",
      "He has authored Life Out Loud: Joining Jesus Outside the Walls of the Church (100 Movements Publishing, 2019) and curated and edited Red Skies: 10 Essential Conversations Exploring Our Future as the Church (100 Movements Publishing, 2022) — a multi-author conversation with Alan Hirsch, Michael Frost, Debra Hirsch, Brian Sanders, Mark DeYmaz, Rich Robinson, and others.",
      "He teaches as adjunct faculty at Fuller, Denver Seminary, and Grand Canyon University, holding an MA in Global Leadership and a DMiss from Fuller. His doctoral dissertation, Missional Emergence, has its own published authority record.",
    ],
    featuredWorks: [
      "Life Out Loud (100 Movements Publishing, 2019)",
      "Red Skies — curator and editor (100 Movements Publishing, 2022)",
      "Missional Emergence — doctoral dissertation (Fuller)",
    ],
    primaryUrl: "https://www.rowlandsmith.net",
    secondaryLinks: [
      { label: "Forge America", href: "https://www.forgeamerica.com" },
      { label: "The Pando Collective", href: "https://thepandocollective.com" },
    ],
    initials: "RS",
    portraitAlt:
      "Portrait of L. Rowland Smith, editorial photograph for the Movemental committed voices page.",
    comingWork: STANDARD_COMING_WORK,
    lastReviewed: REVIEWED_2026_04,
    movementalRelationship: "scenius",
  },
];

export function listCommittedVoiceSlugs(): readonly CommittedVoice["slug"][] {
  return COMMITTED_VOICES.map((voice) => voice.slug);
}

export function getCommittedVoice(slug: string): CommittedVoice | undefined {
  return COMMITTED_VOICES.find((voice) => voice.slug === slug);
}

/** Stable canonical path for the hub. Single source of truth. */
export const VOICES_HUB_PATH = "/voices" as const;

/** Build the canonical path for a per-voice page. */
export function voicePath(slug: CommittedVoice["slug"]): string {
  return `${VOICES_HUB_PATH}/${slug}`;
}
