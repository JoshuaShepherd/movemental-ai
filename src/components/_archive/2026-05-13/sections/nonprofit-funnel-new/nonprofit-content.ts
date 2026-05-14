/**
 * Shared nonprofit audience copy — consumed by `/nonprofits` and assessment scaffolds.
 */

export type StageId =
  | "integration"
  | "activation"
  | "formation"
  | "multiplication"
  | "movement";

export type FragmentationField = "informational" | "relational";

export type FragmentationPoint = {
  field: FragmentationField;
  title: string;
  points: string[];
};

export type StageTranslation = {
  id: StageId;
  label: string;
  eyebrow: string;
  headline: string;
  description: string;
  bullets: string[];
};

export const FRAGMENTATION_URL = "/fragmentation";

export const nonprofitHero = {
  eyebrow: "For nonprofits",
  headline: "Your nonprofit’s intelligence is fragmented.",
  subhead:
    "Content lives in one tool. Donor knowledge lives in another. Program outcomes live in a third. None of it composes into a single picture — so staff rebuild the same argument every quarter and donors hear four versions of one mission.",
  ctaLabel: "See the fragmentation story",
  ctaHref: FRAGMENTATION_URL,
  supportLabel: "Skip to the six stages",
  supportHref: "#stages",
} as const;

export const nonprofitProblems: FragmentationPoint[] = [
  {
    field: "informational",
    title: "Informational fragmentation",
    points: [
      "Reports, decks, grant narratives, and web copy drift apart over time.",
      "Program data sits in spreadsheets that no one can confidently cite.",
      "AI tools hallucinate because nothing is grounded in one canonical corpus.",
      "Messaging to donors, boards, and partners reads like three different organizations.",
    ],
  },
  {
    field: "relational",
    title: "Relational fragmentation",
    points: [
      "Donor history lives in a CRM that does not talk to your content system.",
      "Staff hold stakeholder context in their heads — and it leaves when they leave.",
      "Board, funder, and program relationships are tracked in parallel silos.",
      "No one can answer “what does this partner already know about us?” in under a minute.",
    ],
  },
];

export const nonprofitCta = {
  headline: "You’re not missing effort. You’re missing a system.",
  body:
    "The fragmentation page walks through what actually broke — and shows the six stages that re-compose a nonprofit’s knowledge and relationships into one working graph.",
  primary: {
    label: "Walk the fragmentation story",
    href: FRAGMENTATION_URL,
  },
} as const;

export const nonprofitNextHero = {
  eyebrow: "After the fragmentation story",
  headline: "What the six stages mean for a nonprofit.",
  subhead:
    "The same arc — Integration through Movement — translated into the operating reality of a nonprofit: fundraising, programs, staff, partners.",
} as const;

export const nonprofitStageTranslations: StageTranslation[] = [
  {
    id: "integration",
    label: "Integration",
    eyebrow: "Stage 01",
    headline: "Unify content and donor data into one canonical graph.",
    description:
      "Grant narratives, program evaluations, blog posts, annual reports, and donor records become one addressable library — cited, tagged, and versioned.",
    bullets: [
      "A single source of truth for mission language and program outcomes.",
      "Donor, board, and partner records linked to the content they have seen.",
      "Taxonomies that hold across teams — not per-person spreadsheets.",
    ],
  },
  {
    id: "activation",
    label: "Activation",
    eyebrow: "Stage 02",
    headline: "CRM, content, and AI become one usable surface.",
    description:
      "Staff query the corpus instead of searching Drive. AI answers are grounded in your actual programs and donors, with citations staff can verify.",
    bullets: [
      "Grounded retrieval across proposals, reports, and donor history.",
      "AI drafts that cite internal evidence, not invented figures.",
      "Lightweight agents that prep donor meetings and grant renewals.",
    ],
  },
  {
    id: "formation",
    label: "Formation",
    eyebrow: "Stage 03",
    headline: "Donors become participants. Staff become aligned.",
    description:
      "Pathways replace one-off appeals: donors move from awareness to partnership, and staff share a common rhythm, language, and dashboard.",
    bullets: [
      "Donor journeys designed as pathways, not campaigns.",
      "Staff onboarding that installs the organization’s thinking, not just tasks.",
      "Board and partner cohorts with a shared sense of what is true.",
    ],
  },
  {
    id: "multiplication",
    label: "Multiplication",
    eyebrow: "Stage 04",
    headline: "Fundraising improves, reach expands, partnerships compound.",
    description:
      "Because the system is integrated, every piece of work multiplies: one research insight lands in a grant, an article, a donor briefing, and a program update without being rewritten four times.",
    bullets: [
      "Grant win rates improve because evidence is already assembled.",
      "Search, SEO, and translation surface your work to the right allies.",
      "Partner organizations can interoperate with your library, not just receive PDFs.",
    ],
  },
  {
    id: "movement",
    label: "Movement",
    eyebrow: "Stage 05",
    headline: "A connected ecosystem of organizations.",
    description:
      "Your nonprofit becomes one node in a field of aligned organizations — sharing infrastructure, language, and evidence without losing identity.",
    bullets: [
      "Shared infrastructure across allied nonprofits and funders.",
      "Field-level evidence that no single organization could assemble alone.",
      "A durable network that outlasts individual staff transitions.",
    ],
  },
];

export const nonprofitNextCta = {
  headline: "Choose the next step that fits your team.",
  paths: [
    {
      id: "assessment",
      label: "Take the AI Stewardship Sequence integrity diagnostic",
      description:
        "The AI Stewardship Sequence — Safety, Sandbox, Skills, Solutions — where you actually are, which stage is weakest, and what to fix in the next ninety days.",
      href: "/assess",
      cta: "Start the assessment",
    },
    {
      id: "contact",
      label: "Talk with the team",
      description:
        "Bring a specific constraint — a capital campaign, a merger, a new program — and we will map it against the stages.",
      href: "/contact",
      cta: "Start a conversation",
    },
    {
      id: "articles",
      label: "Read articles on formation systems",
      description:
        "Essays on fragmentation, AI credibility, and how intelligence compounds when structure matches the work.",
      href: "/articles",
      cta: "Browse articles",
    },
  ],
} as const;

export const assessmentEntry = {
  eyebrow: "Assessment",
  headline: "Locate your organization on the Trust Staircase.",
  subhead:
    "Eighteen scored statements across Safety, Sandbox, Skills, and Solutions — the same operational backbone Movemental uses for workshops and product. You get stage integrity, top weaknesses, illusion flags, and a ninety-day focus.",
  bullets: [
    "Honest location: where you are in the sequence — and where you may have skipped a tread.",
    "Stage integrity: which of Safety, Sandbox, Skills, or Solutions is thinnest right now.",
    "Actionable output: likely illusion pattern plus next ninety days focus and one explicit stop-doing.",
  ],
  ctaLabel: "Begin the diagnostic",
  ctaNote: "About 10–15 minutes. Progress saves in this browser.",
} as const;
