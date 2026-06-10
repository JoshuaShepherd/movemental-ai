/**
 * Content for the Sandbox use-case portfolio companion (migrated from
 * docs-html sandbox-portfolio.html). Used by {@link SandboxPortfolioView}.
 */

export type SandboxPortfolioSkillCategory =
  | "fundraising"
  | "programs"
  | "research"
  | "comms"
  | "ops";

export type SandboxPortfolioTitlePart = string | { em: string };

export interface SandboxPortfolioSkill {
  id: string;
  /** Space-separated tag keys matching filter chips (fundraising, programs, …). */
  tags: string;
  /** Lowercased haystack for search + filter. */
  search: string;
  titleParts: SandboxPortfolioTitlePart[];
  dek: string;
  path: string;
  tierLabel: string;
  tier: string;
  packageFile: string;
  downloadLabel?: "Download" | "Download Skill Package";
  /** Tailwind grid column span utilities (sm / xl). */
  gridClass?: string;
}

export interface SandboxPortfolioSkillSection {
  category: SandboxPortfolioSkillCategory;
  heading: string;
  skills: SandboxPortfolioSkill[];
}

export const SANDBOX_PORTFOLIO_SKILL_SECTIONS: SandboxPortfolioSkillSection[] = [
  {
    category: "fundraising",
    heading: "Fundraising & revenue",
    skills: [
      {
        id: "nonprofit-pricing-research",
        tags: "fundraising ops",
        search:
          "nonprofit-pricing-research nonprofit pricing ai training sow proposal comps memo client workbook sensitivity",
        titleParts: ["Nonprofit AI training ", { em: "pricing" }, " research"],
        dek: "Scoping intake, market comps, and a client-ready memo with low/base/high ranges for AI literacy engagements — built for 501(c)(3) and mission-driven orgs (not legal or comp advice).",
        path: "my-skills/nonprofit-pricing-research",
        tierLabel: "Data tier",
        tier: "Tier 2 Internal — may include budget bands and unnamed peer quotes; no fabricated vendor pricing.",
        packageFile: "nonprofit-pricing-research.zip",
        downloadLabel: "Download Skill Package",
        gridClass: "sm:col-span-2 xl:col-span-2",
      },
      {
        id: "stakeholder-map",
        tags: "fundraising",
        search: "stakeholder-map stakeholder donor cultivation connection network linkedin research major gift",
        titleParts: ["Stakeholder ", { em: "connection" }, " mapping"],
        dek: "Deep-research workflow to map how leaders, board, and partners connect outward — useful for principal-gift strategy when adapted to your org’s registry (original skill references Youthfront-style donor cultivation).",
        path: "my-skills/stakeholder-map",
        tierLabel: "Data tier",
        tier: "Tier 3 Restricted — public + consented professional graph only; no shadow profiling.",
        packageFile: "stakeholder-map.zip",
        downloadLabel: "Download Skill Package",
      },
      {
        id: "stripe-setup",
        tags: "fundraising ops",
        search:
          "stripe-setup stripe payments subscriptions checkout webhooks donations online giving portal supabase",
        titleParts: ["Stripe ", { em: "giving" }, " stack setup"],
        dek: "Next.js / Vite patterns for subscriptions, one-time gifts, webhooks, customer portal, and billing sync — for digital fundraising rails when engineering capacity is thin.",
        path: "my-skills/stripe-setup",
        tierLabel: "Data tier",
        tier: "Tier 2 Internal — lives next to PII and payment tokens; follow PCI and finance sign-off.",
        packageFile: "stripe-setup.zip",
        downloadLabel: "Download Skill Package",
      },
    ],
  },
  {
    category: "programs",
    heading: "Programs & learning",
    skills: [
      {
        id: "transformative-learning-collaborator",
        tags: "programs comms",
        search:
          "transformative-learning-collaborator alan hirsch course pedagogy formation mdna apest learning design",
        titleParts: ["Transformative learning ", { em: "collaborator" }],
        dek: "Peer-style partner for course architecture, outcomes, and alignment between frameworks and formation experiences — ideal for seminary, residency, or cohort programs.",
        path: "my-skills/transformative-learning-collaborator",
        tierLabel: "Data tier",
        tier: "Tier 2 Internal — course drafts and participant stories stay in bounded workspaces.",
        packageFile: "transformative-learning-collaborator.zip",
      },
      {
        id: "week-author",
        tags: "programs",
        search: "week-author course week alan voice transformation loop sections authoring",
        titleParts: ["Course ", { em: "week" }, " author"],
        dek: "Single pass to draft a full week of transformation-loop sections in canonical voice — accelerates curriculum teams publishing multi-week institutes.",
        path: "my-skills/week-author",
        tierLabel: "Data tier",
        tier: "Tier 2 Internal — pulls corpus excerpts; respect copyright and partner embargoes.",
        packageFile: "week-author.zip",
      },
      {
        id: "validate-course",
        tags: "programs",
        search: "validate-course charter four necessities section types publish qa",
        titleParts: [{ em: "Validate" }, " course charter"],
        dek: "Pre-publish QA against structure, Four Necessities, section completeness, and exclusions — governance-friendly gate for any org running accredited-style online programs.",
        path: "my-skills/validate-course",
        tierLabel: "Data tier",
        tier: "Tier 2 Internal — reads full course content; no learner PII required.",
        packageFile: "validate-course.zip",
      },
      {
        id: "scaffold-course",
        tags: "programs ops",
        search: "scaffold-course new course slug database ingestion eight week",
        titleParts: [{ em: "Scaffold" }, " new course"],
        dek: "Creates rows, ingestion scripts, and markdown shells for an 8-week transformational course — jump-starts LMS or portal builds for training nonprofits.",
        path: "my-skills/scaffold-course",
        tierLabel: "Data tier",
        tier: "Tier 2 Internal — touches schema migrations; pair with engineering.",
        packageFile: "scaffold-course.zip",
      },
      {
        id: "course-ux",
        tags: "programs",
        search: "course-ux lms player progressive disclosure cohort pacing accessibility learn experience",
        titleParts: ["Course player ", { em: "UX" }, " audit"],
        dek: "Audits learn-surface layout, disclosure, progress psychology, cohort pacing, and AI touchpoints — for nonprofits investing in online certificates or staff academies.",
        path: "my-skills/course-ux",
        tierLabel: "Data tier",
        tier: "Tier 2 Internal — code + design tokens; optional learner analytics aggregates only.",
        packageFile: "course-ux.zip",
        gridClass: "sm:col-span-2",
      },
    ],
  },
  {
    category: "research",
    heading: "Research & evidence",
    skills: [
      {
        id: "poll-opinion-research",
        tags: "research comms",
        search: "poll-opinion-research pew gallup sentiment trends demographics policy brief",
        titleParts: ["Public ", { em: "opinion" }, " research"],
        dek: "Structured polling briefs (Pew, Gallup, Eurobarometer, etc.) with tables and attribution — for grant narratives, advocacy memos, and community listening reports.",
        path: "my-skills/poll-opinion-research",
        tierLabel: "Data tier",
        tier: "Tier 1 Public — cites published survey data only.",
        packageFile: "poll-opinion-research.zip",
      },
      {
        id: "academic-research",
        tags: "research programs",
        search: "academic-research semantic scholar openalex pubmed citations literature review evidence",
        titleParts: [{ em: "Academic" }, " evidence pulls"],
        dek: "Open-access literature passes with discipline filters and dated synthesis — for program design, white papers, or theory-of-change footnotes without paywalled guesswork.",
        path: "my-skills/academic-research",
        tierLabel: "Data tier",
        tier: "Tier 1–2 — abstracts are public; full text only when OA permits.",
        packageFile: "academic-research.zip",
      },
      {
        id: "youtube-transcript",
        tags: "research comms ops",
        search: "youtube-transcript transcript captions workshop keynote training video",
        titleParts: ["YouTube ", { em: "transcript" }, " extract"],
        dek: "Pulls timestamped or plain transcripts from talks, panels, and field interviews — foundation for impact reports, training libraries, and searchable archives.",
        path: "my-skills/youtube-transcript",
        tierLabel: "Data tier",
        tier: "Tier 1 Public when the video is public; watch speaker consent for redistribution.",
        packageFile: "youtube-transcript.zip",
      },
      {
        id: "summarize",
        tags: "ops comms",
        search: "summarize summarize.sh url pdf podcast transcript digest board brief cli",
        titleParts: ["Long-form ", { em: "summarize" }, " & digest"],
        dek: "CLI-backed condensation of URLs, PDFs, podcasts, and local files — nonprofit teams use it to prep board dockets, RFP reading, and field debriefs without pasting sensitive bodies into ad-hoc prompts.",
        path: "my-skills/summarize",
        tierLabel: "Data tier",
        tier: "Tier 2–3 depending on source — route restricted PDFs through approved export paths.",
        packageFile: "summarize.zip",
        gridClass: "sm:col-span-2",
      },
    ],
  },
  {
    category: "comms",
    heading: "Content & communications",
    skills: [
      {
        id: "data-storytelling",
        tags: "comms research",
        search: "data-storytelling visualization executive narrative analytics stakeholders",
        titleParts: [{ em: "Data" }, " storytelling"],
        dek: "Turns metrics into narrative arcs (setup → conflict → resolution) for executives, boards, and funders — pairs well with impact dashboards and annual reports.",
        path: "my-skills/strategy/data-storytelling.md",
        tierLabel: "Data tier",
        tier: "Tier 2 Internal — aggregate numbers only unless disclosure approved.",
        packageFile: "data-storytelling.zip",
      },
      {
        id: "visual-storytelling-audit",
        tags: "comms programs",
        search: "visual-storytelling-audit cards grids stats editorial design tokens narrative",
        titleParts: ["Visual storytelling ", { em: "audit" }],
        dek: "Editorial pass on cards, grids, stats, and section rhythm so every visual earns its keep — high leverage before a capital campaign site or annual review microsite ships.",
        path: "my-skills/visual-storytelling-audit",
        tierLabel: "Data tier",
        tier: "Tier 2 Internal — design repo + staging URLs.",
        packageFile: "visual-storytelling-audit.zip",
      },
      {
        id: "movemental-narrative-audit",
        tags: "comms",
        search: "movemental-narrative-audit messaging positioning copy qa model drift editorial",
        titleParts: ["Mission narrative ", { em: "alignment" }, " audit"],
        dek: "Stress-tests copy and mental models against a canonical movement story (adapt as your org’s “north star” memo). Useful when rebranding coalition websites or funder-facing product pages.",
        path: "my-skills/movemental-narrative-audit",
        tierLabel: "Data tier",
        tier: "Tier 2 Internal — marketing surfaces; not clinical or HR advice.",
        packageFile: "movemental-narrative-audit.zip",
      },
      {
        id: "prose-craft",
        tags: "comms programs",
        search: "prose-craft line edit voice pacing show dont tell annual report letter",
        titleParts: [{ em: "Prose" }, " craft & line edit"],
        dek: "Sentence-level revision for rhythm, clarity, and voice — for executive letters, case statements, and field stories before they hit donors or press.",
        path: "my-skills/prose-craft",
        tierLabel: "Data tier",
        tier: "Tier 2–3 — stories may include beneficiary details under consent rules.",
        packageFile: "prose-craft.zip",
      },
      {
        id: "translation-audit",
        tags: "programs comms",
        search: "translation-audit alan hirsch corpus portuguese spanish german mandarin linguistic qa localization",
        titleParts: ["Corpus ", { em: "translation" }, " QA"],
        dek: "Rubric-based linguistic audit across major languages — repurpose for nonprofit multilingual curricula, liturgical resources, or grant-required bilingual collateral.",
        path: "my-skills/translation-audit",
        tierLabel: "Data tier",
        tier: "Tier 2 Internal — parallel texts may include theology or program IP.",
        packageFile: "translation-audit.zip",
        gridClass: "sm:col-span-2",
      },
    ],
  },
  {
    category: "ops",
    heading: "Ops & knowledge systems",
    skills: [
      {
        id: "doc-organizer",
        tags: "ops",
        search: "doc-organizer markdown html inventory consolidate documentation knowledge base",
        titleParts: ["Cross-repo ", { em: "doc" }, " organizer"],
        dek: "Classifies markdown/HTML as repo-local vs centralizable, produces inventory, optional consolidation — tames the sprawl when every program team ships their own Notion export.",
        path: "my-skills/strategy/doc-organizer.md",
        tierLabel: "Data tier",
        tier: "Tier 2 Internal — scans dev repos; watch for secrets in docs.",
        packageFile: "doc-organizer.zip",
      },
      {
        id: "markitdown",
        tags: "ops",
        search: "markitdown pdf docx pptx xlsx ocr markdown ingest office conversion",
        titleParts: [{ em: "MarkItDown" }, " conversions"],
        dek: "Office + PDF → clean Markdown for LLM workflows — grants teams and evaluators can normalize attachments before RAG or adjudication queues.",
        path: "my-skills/markitdown",
        tierLabel: "Data tier",
        tier: "Tier 2–3 — documents may contain PII; strip before shared indices.",
        packageFile: "markitdown.zip",
      },
      {
        id: "content-ingest",
        tags: "ops programs",
        search: "content-ingest book chapters transcripts articles research notes canonical",
        titleParts: [{ em: "Content" }, " ingest pipeline"],
        dek: "Structures raw chapters, transcripts, and field notes into canonical repo formats — for evidence rooms, learning libraries, and grant-mandated knowledge products.",
        path: "my-skills/content-ingest",
        tierLabel: "Data tier",
        tier: "Tier 2 Internal — provenance and consent per source bundle.",
        packageFile: "content-ingest.zip",
      },
      {
        id: "write-instructions",
        tags: "ops programs",
        search: "write-instructions system prompt agent instructions layers identity theme mode style governance",
        titleParts: ["Agent ", { em: "instruction" }, " authoring"],
        dek: "Composes instruction layers (identity, theme, mode, style, dynamic context) for safer org-wide agents — essential when 270+ skills need consistent escalation, refusals, and data-class handling.",
        path: "my-skills/write-instructions",
        tierLabel: "Data tier",
        tier: "Tier 2 Internal — defines behavior across sensitive workflows; review with legal & IT.",
        packageFile: "write-instructions.zip",
        gridClass: "sm:col-span-2",
      },
    ],
  },
];

export const SANDBOX_PORTFOLIO_ETHICAL_TAGS = [
  "Privacy / Data",
  "Dignity / Care",
  "Disclosure / Integrity",
  "Voice / Flattening",
  "Workload / Treadmill",
  "Other",
] as const;

export type SandboxPortfolioEthicalTag = (typeof SANDBOX_PORTFOLIO_ETHICAL_TAGS)[number];

export type DiscernmentColumnId = "deploy" | "modify" | "refuse";

export interface SandboxPortfolioDiscernmentCase {
  id: string;
  column: DiscernmentColumnId;
  title: string;
  titleTone?: "destructive";
  description: string;
  hoursSaved: string;
  costAvoidance: string;
  owner: string;
  /** Shown in refuse column instead of owner block. */
  statusHeading?: string;
  statusText?: string;
  /** Pre-seeded flag counts (demo). */
  initialEthicalCounts?: Partial<Record<SandboxPortfolioEthicalTag, number>>;
}

export const SANDBOX_PORTFOLIO_DISCERNMENT_CASES: SandboxPortfolioDiscernmentCase[] = [
  {
    id: "sermon-corpus",
    column: "deploy",
    title: "Sermon Corpus Search",
    description:
      "Pastors and scholars search indexed transcripts with citations back to video timestamps — no generative paraphrase of scripture; retrieval only.",
    hoursSaved: "120",
    costAvoidance: "$4,200",
    owner: "Faith formation working group",
  },
  {
    id: "grant-boilerplate",
    column: "deploy",
    title: "Grant Boilerplate Library",
    description: "Reuses org-approved paragraphs with mandatory human sign-off on numbers and outcomes claims.",
    hoursSaved: "86",
    costAvoidance: "$12,400",
    owner: "Development operations",
  },
  {
    id: "donor-thankyou",
    column: "modify",
    title: "Donor Thank-You Drafter",
    description:
      "Saves time on stewardship notes, but requires template locks and ban-list for hyperbolic gratitude before wider rollout.",
    hoursSaved: "40",
    costAvoidance: "$2,500",
    owner: "Individual giving manager",
    initialEthicalCounts: { "Disclosure / Integrity": 2 },
  },
  {
    id: "event-runofshow",
    column: "modify",
    title: "Event Run-of-Show Builder",
    description:
      "Strong for logistics; weak on accessibility announcements — pending comms checklist integration.",
    hoursSaved: "22",
    costAvoidance: "$640",
    owner: "Community events lead",
  },
  {
    id: "case-notes",
    column: "refuse",
    title: "Case-Management Note Summarizer",
    titleTone: "destructive",
    description:
      "Even with redaction, model errors could misrepresent protective-service context; legal & clinical advisors recommend refusal for client-level notes.",
    hoursSaved: "0",
    costAvoidance: "$0",
    owner: "",
    statusHeading: "Status",
    statusText: "Archived — referral to human-only documentation policy",
  },
  {
    id: "eligibility",
    column: "refuse",
    title: "Automated Eligibility Denials",
    titleTone: "destructive",
    description: "Prohibited: any unattended decisioning on benefits access; pilot halted at week one.",
    hoursSaved: "0",
    costAvoidance: "$0",
    owner: "",
    statusHeading: "Status",
    statusText: "Governance memo on file",
  },
];

export const SANDBOX_PORTFOLIO_SKILL_FILTERS: {
  id: SandboxPortfolioSkillCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "fundraising", label: "Fundraising & revenue" },
  { id: "programs", label: "Programs & learning" },
  { id: "research", label: "Research & evidence" },
  { id: "comms", label: "Content & comms" },
  { id: "ops", label: "Ops & knowledge" },
];
