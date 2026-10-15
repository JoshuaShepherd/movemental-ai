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
  /** TODO(S03-map-new): "Begin your organization's response" lands on the Map until its bridge screen exists. */
  respondBegin: "/home-page-new#respond",
  /** TODO(S03-map-new): repoint to /map-new once the public Map page migrates. */
  map: "/home-page-new#respond",
  assessment: "/assess",
  /** TODO(S04-guidebook-new): repoint to /guidebook-new. */
  guidebook: "/field-guide",
  /** TODO(S05-leaders-new): repoint to /leaders-new and /leaders-new/[slug]. */
  leaders: "/voices",
  about: "/home-page-new#about",
  /** TODO(S06-work-new): repoint to /work-with-us-new/inquire once the inquiry form exists. */
  discuss: "/enroll",
  work: "/home-page-new#work",
  proof: "/home-page-new#proof",
  sources: "/sources",
  signIn: "/login",
} as const;

/** Public leader platforms featured in the proof section. Hosts verified in v_tenant_hosts. */
export const MV_PROOF_SITES = {
  alanHirsch: "https://alanhirsch.com",
  bradBrisco: "https://bradbrisco.org",
  michaelCooper: "https://drmichaelcooper.com",
} as const;
