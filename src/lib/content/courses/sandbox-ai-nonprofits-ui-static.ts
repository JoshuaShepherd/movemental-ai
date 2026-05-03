/**
 * Static cohort + resources copy for the `sandbox-ai-nonprofits` course slug.
 * Wire into course hub / learn shell when `/courses/sandbox-ai-nonprofits/*` routes exist
 * (pattern: FORGOTTEN_WAYS_COHORT in alan-hirsch migration manifest).
 */
export const SANDBOX_AI_NONPROFITS_COHORT = {
  courseSlug: "sandbox-ai-nonprofits",
  meetingTitle: "Weekly sandbox working session",
  meetingDescription:
    "Ninety minutes, facilitator-led. Async work (~3 hours per participant) lands in the shared season document before session start.",
  joinCtaLabel: "Join live session",
  joinCtaHref: undefined as string | undefined,
  scheduleIntro:
    "Default cadence follows the Sandbox Season Playbook: twelve operational weeks. This LMS track compresses that arc into eight weeks—use this grid for live sessions or mirror the LMS prompts async.",
  weeks: [
    { week: 1, focus: "Kickoff — charter, roles, Safety Owner", artifact: "Season charter" },
    { week: 2, focus: "Eight-pattern scan", artifact: "Candidate list (12–30)" },
    { week: 3, focus: "Filter + experiment briefs", artifact: "3–5 briefs" },
    { week: 4, focus: "Run 1", artifact: "Run 1 results" },
    { week: 5, focus: "Review + scoring", artifact: "First scoring sheet" },
    { week: 6, focus: "Run 2 + cumulative score", artifact: "Cumulative scoring" },
    { week: 7, focus: "Ethical & relational flag", artifact: "Flag paragraphs + reroutes" },
    { week: 8, focus: "Portfolio draft", artifact: "Portfolio page v1" },
    { week: 9, focus: "Flag round 2 + reroute decisions", artifact: "Reroute notes" },
    { week: 10, focus: "Third experiments (optional)", artifact: "Final scoring" },
    { week: 11, focus: "Portfolio review", artifact: "Portfolio v1 + one-pagers" },
    { week: 12, focus: "Handoff to sponsor", artifact: "Board-ready governance memo" },
  ],
  discussionThreads: [
    {
      title: "Share your season charter (redact as needed)",
      prompt:
        "Post a link or paste the charter headings: Sponsor, Portfolio Owner, Safety Owner, in/out data classes, non-goals. One peer asks one sharpening question.",
    },
    {
      title: "Hardest kill in the eight-pattern scan",
      prompt: "Which plausible candidate did you kill on purpose, and what pattern taught you most?",
    },
  ],
  facilitatorBlurb:
    "Facilitation exists to resist momentum theater. If the room wants more ideas instead of sharper briefs, slow the clock and return to the playbook templates.",
} as const;

export const SANDBOX_AI_NONPROFITS_RESOURCES = {
  courseSlug: "sandbox-ai-nonprofits",
  intro:
    "Canonical references for participants and executives. Prefer inspectable sources over hype PDFs.",
  glossary: [
    {
      term: "Sandbox",
      definition:
        "A bounded place to generate disconfirmable evidence about AI value—legitimate and constrained—without shipping to vulnerable surfaces by default.",
    },
    {
      term: "Safety Owner",
      definition:
        "A named leader who writes the ethical and relational flag and owns stop authority for out-of-scope data and workflows.",
    },
    {
      term: "Portfolio Owner",
      definition:
        "Runs the weekly working session, enforces the shared document discipline, and guards run hygiene.",
    },
    {
      term: "Discovery engine",
      definition:
        "Posture: models as probes inside method—not oracles that replace judgment (see Discovery Engine article).",
    },
  ],
  bibliography: [
    {
      label: "Sandbox curriculum (articles)",
      href: "/articles/sandbox",
    },
    {
      label: "Sandbox Season Playbook",
      href: "/services/sandbox-season",
    },
  ],
  downloads: [
    {
      title: "Season charter (Template A)",
      description: "Included in Week 1 reading; copy into your shared doc.",
      href: "/articles/sandbox/the-three-layers-of-sandbox-work",
    },
  ],
} as const;
