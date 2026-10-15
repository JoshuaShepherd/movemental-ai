/**
 * The five stages of the Map, verbatim from the canvas board Map-Stage
 * (docs/handoff/map-new/source/Map-Stage.dc.html). Riverbend is the boards' fictional sample.
 */

export type StageSlug = "decide" | "gather" | "practice" | "build" | "review";

export interface MapStage {
  slug: StageSlug;
  n: number;
  name: string;
  produces: string;
  lead: string;
  how: readonly string[];
  who: string;
  inFrom: string;
  outTo: string;
  help: string;
}

export const MAP_STAGES: readonly MapStage[] = [
  {
    slug: "decide",
    n: 1,
    name: "Decide what you will stand for",
    produces: "the charter",
    lead: "A charter tells everyone what your organization believes about AI, what people may and may not do, and what happens when something goes wrong. Your people’s Resolutions are its first draft.",
    how: [
      "Start from what your people resolved. Strong agreement gives the working group language worth considering. Real differences become its agenda.",
      "Draft the five parts with the agent. Every line it drafts shows where it came from, and anything that needs a person is left open.",
      "Settle what the working group can, and bring the rest to the people who decide.",
      "Adopt and ratify. Leaders with authority sign it, and the board or equivalent body ratifies it where that is how you decide things.",
      "Set a review date. Formation, what you build and each review will bring things back to it.",
    ],
    who: "The working group drafts. Your leaders sign. Your board ratifies where that is how you decide things.",
    inFrom: "your people’s Resolutions and the Reality Assessment.",
    outTo: "the limits on what you gather in stage two, and the test every later decision must pass.",
    help: "Facilitation of the charter, from first draft to ratification.",
  },
  {
    slug: "gather",
    n: 2,
    name: "Gather what should ground the work",
    produces: "the organization’s context",
    lead: "AI is only as useful as what it knows about you. This stage gathers what your organization knows, how its work actually happens and who it depends on, within the limits your charter sets.",
    how: [
      "Gather what you know: documents, archives, policies, curriculum and source material.",
      "Map how the work actually happens, mostly through interviews with the people who do it.",
      "Map who the work depends on: the relationships and networks around it.",
      "Keep out what the charter keeps out. The Map shows every exclusion and the charter decision behind it.",
      "Keep it current. The context is reviewed as your work changes.",
    ],
    who: "The working group leads. The people who do the work are interviewed. Anyone in the Map can see what was kept out and why.",
    inFrom: "the charter’s limits.",
    outTo: "what your people practice on in stage three, and everything any tool may know about you.",
    help: "Interviews, agent-led gathering, and gathering and repairing scattered material at scale.",
  },
  {
    slug: "practice",
    n: 3,
    name: "Practice the judgment your people will need",
    produces: "formed people",
    lead: "Your people practice the judgment AI asks of them, on your real work, together. Someone inside your organization is formed to lead it and keep it going.",
    how: [
      "Name an ambassador: the person inside your organization formed to carry this work.",
      "Your ambassador takes AI for Organizational Leadership, twelve weeks in a cohort across organizations, then a practicum leading the team course at home.",
      "Your team takes the course for your kind of organization: eight weeks, 30 to 40 minutes alone and a 90-minute session together each week.",
      "Each week produces something from your real work, and the questions it raises are kept.",
      "What formation finds goes back into the charter, the context and the possible uses in stage four.",
    ],
    who: "Your ambassador leads. Your whole team practices. Your leaders sponsor it and take part.",
    inFrom: "the charter and the context, so practice happens on real work within real limits.",
    outTo: "findings for the charter’s next review, and people able to supervise what you build.",
    help: "A seat for your ambassador in the leadership cohort, the team course for your kind of organization, or a team course led by Movemental.",
  },
  {
    slug: "build",
    n: 4,
    name: "Build only what belongs",
    produces: "decisions, and the tools that follow",
    lead: "For each possible use of AI, you weigh the good it does, what it might cost in trust, whether the charter allows it and whether you are ready. Then you decide, and build only what you decided.",
    how: [
      "List the possible uses, from your people, your context and what formation surfaced.",
      "Weigh each one for mission value, human and trust cost, charter fit, context readiness and capability readiness.",
      "Name what it requires, from a feature you already have to a custom application.",
      "Decide: pursue, pursue carefully, solve simply, defer or refuse. Refusals are written into the charter.",
      "Build what you decided to pursue, with its sources, its limits and the person who answers for it written down before it runs.",
    ],
    who: "The working group weighs each use. The people who decide decide. Whoever builds works from that decision.",
    inFrom: "all three stages before it.",
    outTo: "the charter’s refusals, the tools your people use, and the next review.",
    help: "Implementation, custom platforms and agents grounded in your own material, and ongoing stewardship, only when a decision you made calls for them.",
  },
  {
    slug: "review",
    n: 5,
    name: "Review what changes",
    produces: "a review record",
    lead: "The technology changes, and so does your organization. Every part of the Map has a review date, and each review records what you looked at, what changed and what you decided, so you can see why your decisions held or changed.",
    how: [
      "Gather the evidence: how each tool has been used, what formation found, and a fresh Reality Assessment when one is due.",
      "Bring the working group and the people who decide together, and note who was there.",
      "Name what changed: in the technology, in your circumstances, and anything that went wrong.",
      "Affirm or revise each decision, and record why.",
      "Assign what follows and set the next review date.",
    ],
    who: "The working group prepares it. The people who decide affirm or revise. Your people see what changed.",
    inFrom: "everything the Map holds: the charter, the context, formation and every tool.",
    outTo: "the next version of the charter, and back around to stage one.",
    help: "Facilitated reviews, and stewardship of anything we built with you.",
  },
];

export function stageBySlug(slug: string): MapStage | undefined {
  return MAP_STAGES.find((s) => s.slug === slug);
}

/* Sample artifacts (Riverbend Youth & Family, fictional) */

export const CHARTER_PARTS = [
  ["Statement", "What we believe", "We believe the families we serve deserve to know when a person is attending to them, and we will keep the moments of care human.", "From our people’s Resolutions · 7 of 9"],
  ["Policy", "What people may and may not do", "4. No one may enter a young person’s case notes, health information or anything told in confidence into any AI tool.", "Decided by the working group, October 30"],
  ["Context", "What is true here now", "Staff use four AI tools at work today. Two are approved. Two are personal accounts, and this charter gives them until January to move or stop.", "Sourced fact · Reality Assessment, October"],
  ["Rules", "How systems, information and people work together", "Every approved tool has one person who answers for it, named in the appendix.", "Guidebook recommendation · Charter, section 3"],
  ["Response plans", "What happens when something goes wrong", "If confidential information reaches an AI tool, tell the program director the same day. The family is told within three days.", "Decided by the leadership team, November 4"],
] as const;

export const CONTEXT_AREAS = [
  {
    title: "What we know",
    sub: "Documents, archives, policies, curriculum",
    items: [
      ["Program curriculum, 2019 to now", "Gathered · 214 documents", false],
      ["Staff handbook and policies", "Gathered", false],
      ["Annual reports, 2015 to now", "Gathered", false],
      ["Young people’s case notes", "Kept out by charter clause 4", true],
    ],
  },
  {
    title: "How the work happens",
    sub: "Workflow and wisdom maps, from interviews",
    items: [
      ["Grant reporting", "Mapped from 3 interviews", false],
      ["Family intake", "Mapped from 2 interviews", false],
      ["Mentor matching", "Interviews scheduled", false],
      ["Crisis response", "Kept out until the charter covers it", true],
    ],
  },
  {
    title: "Who the work depends on",
    sub: "Relationships and networks",
    items: [
      ["Partner schools and counselors", "Mapped", false],
      ["Funders and their reporting needs", "Mapped", false],
      ["Volunteers and mentors", "In progress", false],
      ["Donor giving history", "Kept out until the charter covers donor data", true],
    ],
  },
] as const;

export const FORMATION_FINDINGS = [
  ["Volunteers draft parent emails in personal chatbots.", "Sent to the charter’s next review"],
  ["The intake form asks for the same details three times.", "Sent to stage four as a possible use"],
  ["No one is sure who may approve a new tool.", "Unresolved question"],
] as const;

export const DECISIONS = [
  ["Draft grant report narratives", "High: frees program staff for families", "Low if a person signs every report", "Allowed, with review", "Context ready · staff in week 3", "A workflow and an agent", "Pursue carefully", "A named person signs each report"],
  ["Summarize program survey responses", "Medium", "Low", "Allowed", "Ready", "A feature we already have", "Solve simply", "No new tool needed"],
  ["Draft donor thank-you notes", "Medium", "Donors may feel less known", "Not yet covered", "Donor data kept out", "A configuration", "Defer", "Until the charter covers donor data"],
  ["Answer parent questions automatically after hours", "Some: faster answers", "High: families may believe a person answered", "Conflicts with our Statement", "Not assessed", "An agent", "Refuse", "Written into the charter as a refusal"],
] as const;

export const TOOLS = [
  ["Grant report drafting assistant", "Program curriculum, the grant reporting map, past reports", "Draft narratives for a person to edit and sign. Never sends.", "Program director", "First review March 2027"],
  ["Survey summaries", "The survey tool you already use", "Summarize responses for internal use", "Evaluation lead", "With each survey"],
] as const;

export const REVIEW_RECORD = [
  ["Period", "November 2026 to February 2027"],
  ["Who was there", "James Okafor, Dana Reyes, the working group and two volunteer mentors"],
  ["Evidence", "Two reporting cycles of drafted grant narratives, a staff check-in, and what the team course found"],
  ["What changed", "Our grant system added its own AI drafting feature in January."],
  ["What went wrong", "One draft carried a young person’s first name. It was caught before signing."],
  ["Affirmed", "Grant narratives: pursue carefully. Answering parents automatically after hours: still refused."],
  ["Revised", "Policy 4 now names the grant system’s drafting feature."],
  ["What follows", "The program director walks the team through the change by March 15. Next review in June."],
] as const;

export const REVIEW_DUE = [
  ["Charter", "The whole charter", "March 2027"],
  ["Context", "Family intake map", "April 2027"],
  ["Formation", "Team course findings", "After each cohort"],
  ["Tool", "Grant report drafting assistant", "March 2027"],
  ["Refusal", "Answering parents automatically after hours", "November 2027"],
] as const;
