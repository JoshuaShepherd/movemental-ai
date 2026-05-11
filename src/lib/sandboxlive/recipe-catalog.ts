/**
 * Seed catalog for the SandboxLive Recipe Library. Phase 02 ships this in-memory
 * so the library experience is testable end-to-end without a DB migration. The
 * eventual home is the `recipes` table — see schema additions in `db/schema.ts`.
 * When the table is populated, swap this catalog for a server query that returns
 * the same shape.
 */

export type RecipeFunction =
  | "writing"
  | "research"
  | "analysis"
  | "planning"
  | "communication"
  | "operations";

export type RecipeDataSensitivity = "public" | "internal" | "confidential";

export interface SandboxLiveRecipe {
  slug: string;
  title: string;
  function: RecipeFunction;
  workingTimeMinutes: number;
  dataSensitivity: RecipeDataSensitivity;
  /** One-line lede shown on the card. */
  description: string;
  /** Full markdown body. Rendered as plain text for now; HTML render pass is a follow-up. */
  recipeDocument: string;
  /** Optional video URL (loom, vimeo, youtube embed). */
  videoUrl?: string;
  /** Sanitized excerpt — first ~600 characters of the working transcript. */
  transcriptExcerpt?: string;
  /**
   * Optional path to a Stitch static thumbnail under `/templates/...`.
   * When set, the card renders the thumbnail above the metadata. Falls back
   * to a thumbnail-less card when omitted.
   */
  thumbnailPath?: string;
  /**
   * Optional path to a Stitch static HTML reference under `/templates/...`.
   * When set, the drawer surfaces a "Visual reference" link that opens the
   * authored layout in a new tab — useful while the React detail lift is
   * still pending.
   */
  stitchReferencePath?: string;
}

const FUNCTION_LABEL: Record<RecipeFunction, string> = {
  writing: "Writing",
  research: "Research",
  analysis: "Analysis",
  planning: "Planning",
  communication: "Communication",
  operations: "Operations",
};

export function recipeFunctionLabel(fn: RecipeFunction): string {
  return FUNCTION_LABEL[fn];
}

const SENSITIVITY_LABEL: Record<RecipeDataSensitivity, string> = {
  public: "Public",
  internal: "Internal",
  confidential: "Confidential",
};

export function recipeSensitivityLabel(s: RecipeDataSensitivity): string {
  return SENSITIVITY_LABEL[s];
}

// Stitch static asset paths. Each `/templates/<category>/<id>/index.html`
// is a full authored HTML page; `screen.png` is the matching thumbnail.
const STITCH_THUMB_MEMO =
  "/templates/sandbox/recipe_detail_strategic_memo_drafting/screen.png";
const STITCH_REF_MEMO =
  "/templates/sandbox/recipe_detail_strategic_memo_drafting/index.html";
const STITCH_THUMB_TRIAL =
  "/templates/sandbox/trial_setup_strategic_memo_drafting/screen.png";
const STITCH_REF_TRIAL =
  "/templates/sandbox/trial_setup_strategic_memo_drafting/index.html";
const STITCH_THUMB_VALUE =
  "/templates/sandbox/value_record_strategic_memo_drafting/screen.png";
const STITCH_REF_VALUE =
  "/templates/sandbox/value_record_strategic_memo_drafting/index.html";

export const RECIPE_CATALOG: readonly SandboxLiveRecipe[] = [
  {
    slug: "strategic-memo-drafting",
    title: "Drafting a strategic memo from raw notes",
    function: "writing",
    workingTimeMinutes: 25,
    dataSensitivity: "internal",
    description:
      "Turn a meeting&rsquo;s scattered notes into a memo your board can read in ten minutes.",
    recipeDocument:
      "Open a fresh Claude conversation. Paste your raw meeting notes. Ask: 'Draft a strategic memo for the board. Lead with the decision being asked, then the rationale, then the open questions.' Refine in two passes — the first for structure, the second for voice.",
    transcriptExcerpt:
      "The cohort tried this recipe with their April leadership notes. The first draft was structurally clean but read like consulting speak. The second pass — 'rewrite this in plain English a deacon could understand' — was the one we kept.",
    thumbnailPath: STITCH_THUMB_MEMO,
    stitchReferencePath: STITCH_REF_MEMO,
  },
  {
    slug: "donor-thank-you-pass",
    title: "Personalizing donor thank-you letters at scale",
    function: "communication",
    workingTimeMinutes: 40,
    dataSensitivity: "confidential",
    description:
      "Move from a template to genuinely personal letters without losing the signal.",
    recipeDocument:
      "Build a project with three pieces of context: your standard thank-you template, your donor CRM export (anonymized in non-production), and your organization&rsquo;s voice guide. For each donor, ask Claude to write a personal letter that references their giving history, your shared work, and one specific thing they care about. Read every letter before sending.",
    transcriptExcerpt:
      "Working with donor data needs a written boundary first. The cohort decided no real donor names go into a non-confidential workspace, and every letter is reviewed by a staff member before it leaves.",
    thumbnailPath: STITCH_THUMB_MEMO,
    stitchReferencePath: STITCH_REF_MEMO,
  },
  {
    slug: "policy-analysis-comparator",
    title: "Comparing two policy documents side by side",
    function: "analysis",
    workingTimeMinutes: 15,
    dataSensitivity: "internal",
    description:
      "Find what changed, what carried over, and what got quietly dropped between drafts.",
    recipeDocument:
      "Upload both versions of the policy. Ask Claude to produce a three-column table — old, new, change classification (kept, modified, removed, added). Have a second human verify each row before forwarding.",
    thumbnailPath: STITCH_THUMB_TRIAL,
    stitchReferencePath: STITCH_REF_TRIAL,
  },
  {
    slug: "annual-report-narrative",
    title: "Composing an annual-report narrative from program data",
    function: "writing",
    workingTimeMinutes: 90,
    dataSensitivity: "internal",
    description:
      "Build the running narrative for the year from program metrics and field stories.",
    recipeDocument:
      "Pull program metrics into a structured outline (quantitative anchors). Pull 3-5 field stories that match the metrics (qualitative anchors). Ask Claude to weave them into a narrative arc with a clear thesis. Human-edit for tone and theological register.",
    transcriptExcerpt:
      "The story-data ratio matters. Too many numbers and the report reads like a corporate AR. Too many stories and the board can&rsquo;t see the work. The cohort settled on one number, one story, repeated.",
    thumbnailPath: STITCH_THUMB_VALUE,
    stitchReferencePath: STITCH_REF_VALUE,
  },
  {
    slug: "research-literature-scan",
    title: "Quick literature scan on a specific intervention",
    function: "research",
    workingTimeMinutes: 30,
    dataSensitivity: "public",
    description:
      "Get oriented on a topic in 30 minutes without spending three days in a library.",
    recipeDocument:
      "Start with a Claude conversation framing the research question. Ask for a structured map: dominant frameworks, key sources, recent critiques, open debates. Then ask for three specific sources to read in full. Treat the output as a map, not a destination.",
    thumbnailPath: STITCH_THUMB_TRIAL,
    stitchReferencePath: STITCH_REF_TRIAL,
  },
  {
    slug: "board-pre-read-summary",
    title: "Summarizing a long pre-read into one board page",
    function: "communication",
    workingTimeMinutes: 20,
    dataSensitivity: "internal",
    description:
      "Compress a 30-page pre-read into the one page your board will actually read.",
    recipeDocument:
      "Paste the pre-read into Claude. Ask: 'Produce a one-page board summary. Lead with what we&rsquo;re being asked to approve, then the three most important pieces of context, then the open questions.' Refine for length and tone.",
    thumbnailPath: STITCH_THUMB_MEMO,
    stitchReferencePath: STITCH_REF_MEMO,
  },
  {
    slug: "fundraising-segmentation-plan",
    title: "Planning a fundraising segmentation campaign",
    function: "planning",
    workingTimeMinutes: 60,
    dataSensitivity: "confidential",
    description:
      "Map donor segments to messages and channels before you start writing copy.",
    recipeDocument:
      "Bring an anonymized list of donor segments and a draft campaign brief. Ask Claude to propose a message-channel-cadence plan per segment. Cross-check against your written ethics around donor communication before approving anything.",
    transcriptExcerpt:
      "Segmentation is where AI helps and where it can quietly misalign with mission. The cohort wrote a one-page guardrail document before any planning work: who we never segment, what data we never use, what kind of personalization is on/off the table.",
    thumbnailPath: STITCH_THUMB_TRIAL,
    stitchReferencePath: STITCH_REF_TRIAL,
  },
  {
    slug: "weekly-newsletter-cadence",
    title: "Reusing one week of work into a newsletter and three posts",
    function: "operations",
    workingTimeMinutes: 45,
    dataSensitivity: "public",
    description:
      "Stop writing each piece of comms from scratch. Repurpose with intent.",
    recipeDocument:
      "Pick one piece of writing from the week (sermon, blog, meeting notes). Ask Claude to derive: one newsletter intro, three short social posts in your voice, and one longer reflection essay. Edit each by hand — the AI gives you the scaffold, not the final piece.",
    thumbnailPath: STITCH_THUMB_MEMO,
    stitchReferencePath: STITCH_REF_MEMO,
  },
  {
    slug: "claude-project-staff-onboarding",
    title: "Setting up a Claude project for staff onboarding",
    function: "operations",
    workingTimeMinutes: 60,
    dataSensitivity: "internal",
    description:
      "Build a project so a new staff member can ask Claude about your org and get real answers.",
    recipeDocument:
      "Decide what context belongs in the project (handbook, org chart, mission documents, current priorities) and what doesn&rsquo;t (HR, financial, donor data). Upload only the in-scope material. Write the project's system prompt to anchor the voice and refuse questions outside the boundary. Hand it to a new staff member and watch what they actually ask — refine the project from there.",
    transcriptExcerpt:
      "The first version of every staff-onboarding project is too thin. The new hire asks questions you didn&rsquo;t anticipate and the answers come back generic. Iterate weekly until the boundary feels right.",
    thumbnailPath: STITCH_THUMB_TRIAL,
    stitchReferencePath: STITCH_REF_TRIAL,
  },
  {
    slug: "budget-scenario-comparator",
    title: "Comparing two budget scenarios side by side",
    function: "analysis",
    workingTimeMinutes: 35,
    dataSensitivity: "confidential",
    description:
      "Run Claude over two budget drafts and surface where they diverge — line by line.",
    recipeDocument:
      "Sanitize the budget data first — no live account numbers in a non-confidential workspace. Paste both scenarios in. Ask for a three-column table: line item, scenario A, scenario B, with a brief annotation per row on what the difference signals. Have a finance lead verify every number before circulating.",
    thumbnailPath: STITCH_THUMB_TRIAL,
    stitchReferencePath: STITCH_REF_TRIAL,
  },
  {
    slug: "foundation-funder-mapping",
    title: "Mapping foundation funders in your region",
    function: "research",
    workingTimeMinutes: 90,
    dataSensitivity: "public",
    description:
      "Find every foundation that funds work like yours within a defined geography.",
    recipeDocument:
      "Frame the research question precisely — region, sector, grant size range, focus area. Ask Claude to produce a structured map: foundation name, focus alignment, typical grant size, most recent fiscal year of public data, contact pathway. Treat every entry as a research lead; verify each with the foundation&rsquo;s 990 before contacting.",
    thumbnailPath: STITCH_THUMB_VALUE,
    stitchReferencePath: STITCH_REF_VALUE,
  },
  {
    slug: "sermon-series-outline",
    title: "Drafting a 12-week sermon series outline",
    function: "planning",
    workingTimeMinutes: 50,
    dataSensitivity: "public",
    description:
      "Compose a series outline that holds a thesis over twelve weeks without losing the line.",
    recipeDocument:
      "Bring the series thesis, the lectionary or text choices, and any prior series notes. Ask Claude for a 12-week outline that names each sermon&rsquo;s anchor text, working title, central image, and connection to the series thesis. Take the outline back to your preaching plan and edit by hand — the AI builds the scaffold, you build the sermon.",
    transcriptExcerpt:
      "The first AI-drafted series outlines all sound alike — generic preaching scaffolds. The good output comes when you bring your voice into the prompt: paste three previous sermons and ask Claude to keep that register.",
    thumbnailPath: STITCH_THUMB_MEMO,
    stitchReferencePath: STITCH_REF_MEMO,
  },
  {
    slug: "workshop-transcript-to-artifact",
    title: "Turning a workshop transcript into a teaching artifact",
    function: "writing",
    workingTimeMinutes: 35,
    dataSensitivity: "internal",
    description:
      "Lift the durable teaching out of a workshop&rsquo;s spoken transcript without losing the voice.",
    recipeDocument:
      "Upload the cleaned transcript. Ask Claude to produce a 1,500-word teaching artifact organized by the workshop&rsquo;s actual arc, preserving distinctive phrases from the facilitator. Then ask for a one-page handout version. The two outputs should read as a pair — the long form for asynchronous study, the short form for distribution.",
    thumbnailPath: STITCH_THUMB_MEMO,
    stitchReferencePath: STITCH_REF_MEMO,
  },
  {
    slug: "crisis-communication-drafting",
    title: "Crisis communication drafting in your organization&rsquo;s voice",
    function: "communication",
    workingTimeMinutes: 30,
    dataSensitivity: "internal",
    description:
      "Move fast when something has gone wrong, without saying something you&rsquo;ll regret.",
    recipeDocument:
      "Bring the facts of the incident, the audiences you need to address, and your written communications voice guide. Ask Claude for three drafts at different temperatures: most measured, most plain-spoken, most empathetic. Have a second human read each before sending. Save the final version to the response plans section of your Guidebook.",
    transcriptExcerpt:
      "The hardest part of a crisis draft is restraint — saying what is true without saying more than you know yet. Claude can hold that line if you tell it to in the prompt. It cannot hold it by default.",
    thumbnailPath: STITCH_THUMB_MEMO,
    stitchReferencePath: STITCH_REF_MEMO,
  },
];
