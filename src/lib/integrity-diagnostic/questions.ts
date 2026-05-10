/**
 * Integrity Diagnostic — canonical question bank for `/api/assess` + sections-mock form.
 * Twenty-two ordered answers (each index 0–3) are stored in Postgres (`answers` jsonb).
 */

export const INTEGRITY_DIAGNOSTIC_VERSION = "2026-05-02" as const;

export const DIMENSIONS = [
  {
    id: "sequence-integrity",
    num: "01",
    title: "Path integrity",
    description:
      "Are we building solutions before we have established safety?",
  },
  {
    id: "posture-clarity",
    num: "02",
    title: "Posture clarity",
    description:
      "Do our people know what we believe about AI, or just what tools we bought?",
  },
  {
    id: "refusal-capacity",
    num: "03",
    title: "Refusal capacity",
    description: "Do we have criteria for saying no?",
  },
  {
    id: "sandbox-truth",
    num: "04",
    title: "Sandbox truth",
    description:
      "Are we experimenting in contained spaces, or risking real data?",
  },
  {
    id: "formation-not-training",
    num: "05",
    title: "Formation, not training",
    description:
      "Are we forming our people to use AI, or just teaching them prompts?",
  },
  {
    id: "solution-restraint",
    num: "06",
    title: "Solution restraint",
    description:
      "Are we trying to solve every problem with AI, or only the right ones?",
  },
] as const;

export type DimensionId = (typeof DIMENSIONS)[number]["id"];

const O = {
  safetyMaturity: [
    "Yes, fully implemented",
    "In draft form",
    "Under discussion",
    "Not yet considered",
  ],
  visibility: [
    "Yes, we have full visibility",
    "We know about official tools, not shadow IT",
    "We assume they all do",
    "We do not know",
  ],
  consistency: [
    "Yes, consistently",
    "Some could",
    "Only senior leadership",
    "No",
  ],
  strategyDistinct: [
    "Yes, it has its own framework",
    "It is a subset of IT",
    "They are one and the same",
    "We have neither",
  ],
  noDecision: [
    "Yes, multiple times",
    "Yes, once or twice",
    "We are open to anything that helps",
    "We haven't evaluated enough to say no",
  ],
  missionFilter: [
    "Yes, as a primary filter",
    "Yes, as a secondary consideration",
    "We focus mainly on utility",
    "No",
  ],
  sandboxUse: [
    "Yes, across the organization",
    "In specific departments",
    "Informally",
    "No, we test in production",
  ],
  formationDepth: [
    "Yes, deeply integrated",
    "We address it somewhat",
    "Mostly focused on prompt engineering",
    "We don't do AI training yet",
  ],
  mappingRigor: [
    "Rigorous mapping",
    "Rough alignment",
    "Adopting available features",
    "Reactive adoption",
  ],
  scale: ["Strongly yes", "Somewhat", "Rarely", "No"],
} as const;

export const QUESTIONS_BY_DIMENSION: Record<
  DimensionId,
  { id: string; prompt: string; options: string[] }[]
> = {
  "sequence-integrity": [
    {
      id: "q1",
      prompt:
        "Has your organization established an internal AI safety policy?",
      options: [...O.safetyMaturity],
    },
    {
      id: "q2",
      prompt:
        "Do you know which third-party tools may train on your organizational data?",
      options: [...O.visibility],
    },
    {
      id: "q3",
      prompt:
        "Before scaling an AI pilot, do you require explicit approval tied to documented safety readiness?",
      options: [...O.scale],
    },
    {
      id: "q4",
      prompt:
        "Do you maintain a written record of workflows where AI use is categorically disallowed?",
      options: [...O.scale],
    },
  ],
  "posture-clarity": [
    {
      id: "q5",
      prompt:
        "If asked, could most staff articulate your organization's ethical or theological stance on AI?",
      options: [...O.consistency],
    },
    {
      id: "q6",
      prompt: "Is your AI approach documented separately from general IT strategy?",
      options: [...O.strategyDistinct],
    },
    {
      id: "q7",
      prompt:
        "Is there a single narrative leaders use when explaining AI posture to boards, donors, or members?",
      options: [...O.scale],
    },
    {
      id: "q8",
      prompt:
        "Do volunteers and contractors receive practical guidance aligned with staff AI posture?",
      options: [...O.scale],
    },
  ],
  "refusal-capacity": [
    {
      id: "q9",
      prompt:
        "Have you explicitly decided not to use AI for at least one sensitive operational or ministerial task?",
      options: [...O.noDecision],
    },
    {
      id: "q10",
      prompt:
        "Does your tool evaluation include theological or missional constraints, not only utility?",
      options: [...O.missionFilter],
    },
    {
      id: "q11",
      prompt:
        "Is there a documented path for staff to challenge or pause an AI deployment they believe is unsafe?",
      options: [...O.scale],
    },
    {
      id: "q12",
      prompt:
        "Do you review vendor claims about AI features with the same skepticism you apply to security claims?",
      options: [...O.scale],
    },
  ],
  "sandbox-truth": [
    {
      id: "q13",
      prompt:
        "Are you using isolated environments (sandboxes) to test AI tools before production use?",
      options: [...O.sandboxUse],
    },
    {
      id: "q14",
      prompt:
        "Before copying production-like data into a sandbox, do you review de-identification or synthetic substitutes?",
      options: [...O.scale],
    },
    {
      id: "q15",
      prompt:
        "Do sandbox experiments have named owners and time-boxed sunset dates?",
      options: [...O.scale],
    },
    {
      id: "q16",
      prompt:
        "After a sandbox sprint, do you archive or delete artifacts according to policy?",
      options: [...O.scale],
    },
  ],
  "formation-not-training": [
    {
      id: "q17",
      prompt:
        "Does AI-related learning emphasize formation, discernment, and critical thinking—not only prompts?",
      options: [...O.formationDepth],
    },
    {
      id: "q18",
      prompt:
        "Do managers coach teams on situations where reaching for AI first would be unwise?",
      options: [...O.scale],
    },
    {
      id: "q19",
      prompt:
        "When misuse occurs, do you treat it as a formation conversation—not only a policy strike?",
      options: [...O.scale],
    },
  ],
  "solution-restraint": [
    {
      id: "q20",
      prompt:
        "Are AI initiatives mapped to documented organizational bottlenecks—not tool catalogs alone?",
      options: [...O.mappingRigor],
    },
    {
      id: "q21",
      prompt:
        "Do you limit concurrent AI experiments so operational attention and governance keep pace?",
      options: [...O.scale],
    },
    {
      id: "q22",
      prompt:
        "At least annually, do you review AI initiatives against measurable mission outcomes?",
      options: [...O.scale],
    },
  ],
};

export const QUESTIONS = DIMENSIONS.flatMap((d) => QUESTIONS_BY_DIMENSION[d.id]);

export const TOTAL_QUESTIONS = QUESTIONS.length;
