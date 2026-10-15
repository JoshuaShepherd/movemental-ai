/**
 * Link targets for the Paper pages (migrated from the `-new` routes, October 15, 2026). Every
 * internal href here must resolve to a live route (`pnpm link:check` scans src/). Change a
 * destination here, in one place. TODO markers carry the slice tag of the work that replaces them.
 */
export const MV_ROUTES = {
  home: "/",
  resolve: "/resolve",
  /** My Resolution (5.2). */
  resolveDocument: "/resolve/document",
  /** How others resolved (5.6). */
  resolveOthers: "/resolve/others",
  /** Your people (5.4). */
  resolvePeople: "/me/people",
  /** The board's one sample shared link. */
  resolveSharedSample: "/r/k7p2qx",
  /**
   * TODO(back-end merge): "Begin your organization's response" (R3-Respond) needs an organization
   * space. Until then it lands on Your people, where inviting people is the first move.
   */
  respondBegin: "/me/people",
  map: "/map",
  churches: "/churches",
  nonprofits: "/nonprofits",
  institutions: "/institutions",
  assessment: "/assessment",
  /** Leaders predict. */
  assessmentPredict: "/assessment/predict",
  /** What your people see. */
  assessmentAnswer: "/assessment/answer",
  /** The gap, with the board's sample results. */
  assessmentResults: "/assessment/results",
  guidebook: "/guidebook",
  leaders: "/leaders",
  about: "/about",
  /** Our story, the long-form page. */
  story: "/story",
  /** Kept pages, restyled on Paper in S16. */
  howWeUseAi: "/how-we-use-ai",
  articles: "/articles",
  research: "/research",
  researchFindings: "/research/findings",
  /** The flagship paper the findings page points to. */
  researchFlagship: "/research/ai-credibility-crisis",
  footnotes: "/footnotes",
  fieldGuide: "/field-guide",
  /** The agent room ("Ask your AI about this" on a paper). */
  agent: "/agent",
  privacy: "/privacy",
  terms: "/terms",
  cookies: "/cookies",
  signUp: "/signup",
  forgotPassword: "/forgot-password",
  discuss: "/work-with-us/inquire",
  work: "/work-with-us",
  proof: "/#proof",
  sources: "/sources",
  signIn: "/login",
} as const;

/** One chapter of the guidebook. */
export const guidebookChapterHref = (slug: string, edition?: string) =>
  `/guidebook/${slug}${edition ? `?edition=${edition}` : ""}`;

/** One article. */
export const articleHref = (slug: string) => `/articles/${slug}`;

/** One research paper. */
export const researchHref = (slug: string) => `/research/${slug}`;

/** One founder profile. */
export const founderHref = (slug: string) => `/about/${slug}`;

/** One movement leader's profile. */
export const leaderHref = (slug: string) => `/leaders/${slug}`;

/** One stage of the Map. */
export const mapStageHref = (slug: string) => `/map/${slug}`;

/** Public leader platforms featured in the proof section. Hosts verified in v_tenant_hosts. */
export const MV_PROOF_SITES = {
  alanHirsch: "https://alanhirsch.com",
  bradBrisco: "https://bradbrisco.org",
  michaelCooper: "https://drmichaelcooper.com",
  /** Brad's Neighborhood Intelligence Report, featured on the home page (S17). */
  bradBriscoNeighborhood: "https://bradbrisco.org/neighborhood-intelligence-report",
  /** Kate Coleman and Cham Kaur-Mann; their movemental.ai host in v_tenant_hosts (see leaders.ts). */
  kateColeman: "https://kate-coleman.movemental.ai",
} as const;
