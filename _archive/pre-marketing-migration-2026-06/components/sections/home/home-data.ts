/**
 * Pure-data module for the home page.
 *
 * All copy, stage definitions, entry points, and proof rows live here.
 * Section components read from this module — no string literals in JSX.
 *
 * Architecture rule (docs/architecture/TYPE_SAFETY.md): the home page is
 * pure Layer 6 — no Layer 1–5 imports. This file has no runtime
 * fetching, no schemas, no services.
 */

import { IMG as FRAGMENTATION_IMG } from "@/components/sections/fragmentation-story/fragmentation-story-content";

/** Fragmentation book · Ch 1 (shipped spine) — inspectable opening diagnosis. */
export const BOOK_READ_INSPECTABLE_DIAGNOSIS = "/book/read/the-invisible-tax" as const;

/* -------------------------------------------------------------------------- */
/*                    §1–2 narrative copy (funnel + IA plan)                  */
/* -------------------------------------------------------------------------- */

/** Hero body: promise / resolution path — locked Display headline stays in `home-hero.tsx`. */
export const homeHeroSupportingParagraph =
  "Movemental helps churches, nonprofits, and institutions compose scattered corpus and relationships into one navigable system—so the same intelligence can compound in public, in rooms, and in the tools people already use. What follows compresses the argument; the canonical walkthrough is one click away.";

/** Problem band: explicit two-intelligences frame (legible after hero “felt” beat). */
export const homeProblemIntro =
  "Two intelligences carry your work: what you know (corpus) and who you know (relationships). When both live in disconnected tools and channels, diagnosis is slow—and every surface inherits the scatter.";

export const homeProblemFragmentColumns: readonly { label: string; items: readonly string[] }[] = [
  {
    label: "Informational fragmentation",
    items: [
      "Books, essays, courses, and decks living in different homes",
      "No single corpus surface search and teaching can trust end-to-end",
      "New channels duplicate fragments instead of compounding",
    ],
  },
  {
    label: "Relational fragmentation",
    items: [
      "Partners and participants scattered across inboxes and apps",
      "No durable map of who knows whom—and why it matters",
      "Institutional memory walks out when roles turn over",
    ],
  },
] as const;

/** Short bridges so each section earns the next (IA plan §7). */
export const homeNarrativeBridges = {
  turnToSystem: "That system has a name—and six ordered stages.",
  systemAnswerLabel: "Stage 02 · Integration",
  systemToIntegration: "Stage 02 · Integration — one public layer for what fragmentation split apart.",
  integrationToActivation: "Stage 03 · Activation — when the layer stops being storage and becomes use.",
  activationToFormation: "Stage 04 · Formation — where information and relationships do their forming work together.",
  formationToMultiplication: "Stage 05 · Multiplication — the rails that carry scale without duplicating noise.",
  multiplicationToMovement: "Stage 06 · Movement — the network shape the arc pointed toward all along.",
} as const;

/** §1b · Audience applications (after universal spine on home): same system, different contexts. */
export const homeAudienceExamplesNewCopy = {
  eyebrow: "Applications, not separate products",
  display: "Same system — different contexts",
  intro:
    "The stage model and foundation are shared. What changes is emphasis: formation and care for churches, mission operations for nonprofits, research and curriculum for institutions. Each audience page is the long-form application of that one system—not a separate product line.",
  previewCaption: "Canonical audience pages",
  exploreLabel: "Open the full application",
  systemNote:
    "One platform family: shared narrative logic, shared system DNA, shared CTA spine. Examples and modules shift with stewardship.",
} as const;

/* -------------------------------------------------------------------------- */
/*                              SECTION 5 · system                            */
/* -------------------------------------------------------------------------- */

export type HomeStageId =
  | "fragmentation"
  | "integration"
  | "activation"
  | "formation"
  | "multiplication"
  | "movement";

export type HomeStage = {
  id: HomeStageId;
  index: 1 | 2 | 3 | 4 | 5 | 6;
  label: string;
  oneLiner: string;
  href: `/fragmentation#${string}` | "/fragmentation";
};

export const homeStages: readonly HomeStage[] = [
  {
    id: "fragmentation",
    index: 1,
    label: "Fragmentation",
    oneLiner: "Scattered artifacts, disconnected relationships, nothing compounding.",
    href: "/fragmentation#stage-fragmentation",
  },
  {
    id: "integration",
    index: 2,
    label: "Integration",
    oneLiner: "One public home for everything you know and everyone you serve.",
    href: "/fragmentation#stage-integration",
  },
  {
    id: "activation",
    index: 3,
    label: "Activation",
    oneLiner: "The system becomes searchable, grounded, and actionable.",
    href: "/fragmentation#stage-activation",
  },
  {
    id: "formation",
    index: 4,
    label: "Formation",
    oneLiner: "Information informs. Relationships form. Together, they transform.",
    href: "/fragmentation#stage-formation",
  },
  {
    id: "multiplication",
    index: 5,
    label: "Multiplication",
    oneLiner: "Infrastructure carries the work — not more content.",
    href: "/fragmentation#stage-multiplication",
  },
  {
    id: "movement",
    index: 6,
    label: "Movement",
    oneLiner: "Platforms connect. Leaders amplify each other. Networks carry trust.",
    href: "/fragmentation#stage-movement",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                         SECTION 6 · integration layers                     */
/* -------------------------------------------------------------------------- */

export type IntegrationLayer = {
  id: "informational" | "relational";
  label: string;
  items: readonly string[];
};

export const integrationLayers: readonly IntegrationLayer[] = [
  {
    id: "informational",
    label: "Informational layer",
    items: [
      "Books, chapters, essays",
      "Frameworks and assessments",
      "Courses and pathways",
      "Talks, podcasts, recordings",
    ],
  },
  {
    id: "relational",
    label: "Relational layer",
    items: [
      "People and roles",
      "Organizations and networks",
      "Stakeholders and donors",
      "Shared memory across time",
    ],
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                         SECTION 7 · activation capabilities                */
/* -------------------------------------------------------------------------- */

export type ActivationCapability = {
  id: "search" | "ai" | "unified";
  label: string;
  body: string;
};

export const activationCapabilities: readonly ActivationCapability[] = [
  {
    id: "search",
    label: "Accessible",
    body: "Search and browse the whole corpus — books, courses, frameworks, conversations — from one surface.",
  },
  {
    id: "ai",
    label: "Searchable",
    body: "AI grounded in your actual work, with citations back to source. Not a generic model with a wrapper.",
  },
  {
    id: "unified",
    label: "Actionable",
    body: "CRM, CMS, and knowledge stop being three systems. They act on the same intelligence.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                         SECTION 8 · formation columns                      */
/* -------------------------------------------------------------------------- */

export type FormationColumn = {
  id: "informational" | "relational";
  label: string;
  stops: readonly string[];
};

export const formationColumns: readonly FormationColumn[] = [
  {
    id: "informational",
    label: "Informational",
    stops: ["Dissonance", "Action", "Reflection", "Community", "Local embodied practice"],
  },
  {
    id: "relational",
    label: "Relational",
    stops: ["Recognition", "Belonging", "Alignment", "Accountability", "Imitation"],
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                         SECTION 9 · multiplication infra                   */
/* -------------------------------------------------------------------------- */

export type InfraTrack = {
  id: "informational" | "relational";
  label: string;
  items: readonly { title: string; body: string }[];
};

export const infraTracks: readonly InfraTrack[] = [
  {
    id: "informational",
    label: "Informational infrastructure",
    items: [
      { title: "SEO", body: "Discoverable where serious readers already look." },
      { title: "AI", body: "Grounded retrieval across your corpus, with citations." },
      { title: "Translation", body: "Same intelligence, many languages." },
      { title: "Content distribution", body: "Reach that compounds, not output that evaporates." },
    ],
  },
  {
    id: "relational",
    label: "Relational infrastructure",
    items: [
      { title: "CRM memory", body: "The system remembers who you know and how you know them." },
      { title: "Communication", body: "Email, threads, and outreach that stay tied to the work." },
      { title: "Network awareness", body: "See the graph — peers, partners, sending networks." },
      { title: "Participation", body: "Cohorts, communities, and shared practice at scale." },
    ],
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                         SECTION 10 · movement platforms                    */
/* -------------------------------------------------------------------------- */

export type PlatformNode = {
  id: string;
  leader: string;
  platform: string;
  cx: number;
  cy: number;
};

export const platformNodes: readonly PlatformNode[] = [
  { id: "hirsch", leader: "Alan Hirsch", platform: "The Forgotten Ways", cx: 50, cy: 50 },
  { id: "brisco", leader: "Brad Brisco", platform: "Forge · Sentralized", cx: 20, cy: 28 },
  { id: "woodward", leader: "JR Woodward", platform: "The V3 Movement", cx: 80, cy: 30 },
  { id: "frost", leader: "Michael Frost", platform: "Surprise the World", cx: 24, cy: 74 },
  { id: "catchim", leader: "Tim Catchim", platform: "APEST Vocations", cx: 78, cy: 72 },
  { id: "cole", leader: "Neil Cole", platform: "Starling Initiatives", cx: 50, cy: 12 },
  { id: "addison", leader: "Steve Addison", platform: "Movements", cx: 50, cy: 88 },
] as const;

export const platformEdges: readonly (readonly [string, string])[] = [
  ["hirsch", "brisco"],
  ["hirsch", "woodward"],
  ["hirsch", "frost"],
  ["hirsch", "catchim"],
  ["hirsch", "cole"],
  ["hirsch", "addison"],
  ["brisco", "woodward"],
  ["frost", "catchim"],
  ["cole", "brisco"],
  ["woodward", "catchim"],
] as const;

/* -------------------------------------------------------------------------- */
/*                         SECTION 11 · proof rows                            */
/* -------------------------------------------------------------------------- */

export type ProofRow = {
  name: string;
  role: string;
  blurb: string;
  href?: `/${string}`;
};

export const proofRows: readonly ProofRow[] = [
  {
    name: "Alan Hirsch",
    role: "Missional theologian · 20 books · 150,000+ APEST assessments",
    blurb: "The Forgotten Ways as a living system — not a back catalog.",
  },
  {
    name: "Brad Brisco",
    role: "Forge · Sentralized · 18 years teaching missional practice",
    blurb: "Five books and two decades of cohorts, held as one coherent corpus.",
  },
  {
    name: "JR Woodward",
    role: "V3 Movement · church-planting networks",
    blurb: "Formation pathways wired to the relational network that carries them.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                         SECTION 12 · entry points                          */
/* -------------------------------------------------------------------------- */

export type EntryPoint = {
  id: "nonprofits" | "churches" | "institutions";
  label: string;
  eyebrow: string;
  blurb: string;
  href: `/${string}`;
};

export const entryPoints: readonly EntryPoint[] = [
  {
    id: "churches",
    label: "Churches",
    eyebrow: "Formation · Care · Memory",
    blurb:
      "Formation pathways, pastoral care, and institutional memory — held together so leaders and congregations see one coherent intelligence.",
    href: "/churches",
  },
  {
    id: "nonprofits",
    label: "Nonprofits",
    eyebrow: "Mission · Money · Memory",
    blurb:
      "Your donor base, content library, and program data should act on the same intelligence. Build one system instead of stitching three.",
    href: "/nonprofits",
  },
  {
    id: "institutions",
    label: "Institutions",
    eyebrow: "Entities · Generations · Accreditors",
    blurb:
      "Research, curriculum, and collaboration across campuses and regions — mapped so coherence survives turnover and disruption.",
    href: "/institutions",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                         Shared artifact vocabulary                         */
/* -------------------------------------------------------------------------- */

/**
 * Re-export the fragmentation image library so home-section files reference
 * a single path. Mirrors the "reuse, don't reinvent" rule from the prompt.
 */
export const IMG = FRAGMENTATION_IMG;
