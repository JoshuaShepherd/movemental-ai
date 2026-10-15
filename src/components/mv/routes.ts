/**
 * Link targets for the `-new` pages. Every internal href here must resolve to a live route
 * today (`pnpm link:check` scans src/). As each `-new` page lands, repoint its entry here
 * in one place. TODO markers carry the slice tag of the page that will replace them.
 */
export const MV_ROUTES = {
  home: "/home-page-new",
  resolve: "/resolve-new",
  /** My Resolution (5.2). Cutover: /resolve/document/[id]. */
  resolveDocument: "/resolve-new/document",
  /** How others resolved (5.6). Cutover: /resolve/others. */
  resolveOthers: "/resolve-new/others",
  /** Your people (5.4). Cutover: /me/people. */
  resolvePeople: "/resolve-new/people",
  /** The board's one sample shared link. Cutover: /r/[token]. */
  resolveSharedSample: "/resolve-new/r/k7p2qx",
  /**
   * TODO(back-end merge): "Begin your organization's response" (R3-Respond) needs an organization
   * space. Until then it lands on Your people, where inviting people is the first move.
   */
  respondBegin: "/resolve-new/people",
  map: "/map-new",
  churches: "/churches-new",
  nonprofits: "/nonprofits-new",
  institutions: "/institutions-new",
  assessment: "/assessment-new",
  /** Leaders predict. Cutover: /assessment/predict. */
  assessmentPredict: "/assessment-new/predict",
  /** What your people see. Cutover: /a/[link]. */
  assessmentAnswer: "/assessment-new/answer",
  /** The gap, with the board's sample results. Cutover: /assessment/results. */
  assessmentResults: "/assessment-new/results",
  guidebook: "/guidebook-new",
  leaders: "/leaders-new",
  about: "/about-new",
  /** Our story, the long-form page. Cutover: /story. */
  story: "/story-new",
  /** Kept as is until it is restyled after launch. */
  howWeUseAi: "/how-we-use-ai",
  discuss: "/work-with-us-new/inquire",
  work: "/work-with-us-new",
  proof: "/home-page-new#proof",
  sources: "/sources",
  signIn: "/login",
} as const;

/** One chapter of the guidebook. Cutover: /guidebook/[chapter]. */
export const guidebookChapterHref = (slug: string, edition?: string) =>
  `/guidebook-new/${slug}${edition ? `?edition=${edition}` : ""}`;

/** One movement leader's profile. Cutover: /leaders/[slug]. */
export const leaderHref = (slug: string) => `/leaders-new/${slug}`;

/** One stage of the Map. Cutover: /map/[stage]. */
export const mapStageHref = (slug: string) => `/map-new/${slug}`;

/** Public leader platforms featured in the proof section. Hosts verified in v_tenant_hosts. */
export const MV_PROOF_SITES = {
  alanHirsch: "https://alanhirsch.com",
  bradBrisco: "https://bradbrisco.org",
  michaelCooper: "https://drmichaelcooper.com",
} as const;
