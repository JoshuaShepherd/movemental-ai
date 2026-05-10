/** Snapshot used only by {@link ../../components/studio/IntegrityDiagnosticForm.tsx}. */

export const DIMENSIONS = [
  {
    id: "sequence-integrity",
    num: "01",
    title: "Path integrity",
    body: "Are we building solutions before we have established safety?",
  },
  {
    id: "posture-clarity",
    num: "02",
    title: "Posture clarity",
    body: "Do our people know what we believe about AI, or just what tools we bought?",
  },
  {
    id: "refusal-capacity",
    num: "03",
    title: "Refusal capacity",
    body: "Do we have criteria for saying no?",
  },
  {
    id: "sandbox-truth",
    num: "04",
    title: "Sandbox truth",
    body: "Are we experimenting in contained spaces, or risking real data?",
  },
  {
    id: "formation-not-training",
    num: "05",
    title: "Formation, not training",
    body: "Are we forming our people to use AI, or just teaching them prompts?",
  },
  {
    id: "solution-restraint",
    num: "06",
    title: "Solution restraint",
    body: "Are we trying to solve every problem with AI, or only the right ones?",
  },
] as const;

export const QUESTIONS_BY_DIMENSION = {
  "sequence-integrity": [
    {
      id: "q1",
      prompt:
        "Has your organization established an internal AI safety policy?",
      options: [
        "Yes, fully implemented",
        "In draft form",
        "Under discussion",
        "Not yet considered",
      ],
    },
    {
      id: "q2",
      prompt:
        "Do you know which third-party tools are training on your data?",
      options: [
        "Yes, we have full visibility",
        "We know about official tools, not shadow IT",
        "We assume they all do",
        "We do not know",
      ],
    },
  ],
  "posture-clarity": [
    {
      id: "q3",
      prompt:
        "If asked, could your staff articulate the organization's theological or ethical stance on AI?",
      options: ["Yes, consistently", "Some could", "Only senior leadership", "No"],
    },
    {
      id: "q4",
      prompt: "Is your AI strategy distinct from your general IT strategy?",
      options: [
        "Yes, it has its own framework",
        "It is a subset of IT",
        "They are one and the same",
        "We have neither",
      ],
    },
  ],
  "refusal-capacity": [
    {
      id: "q5",
      prompt:
        "Have you explicitly decided NOT to use AI for a specific operational or ministerial task?",
      options: [
        "Yes, multiple times",
        "Yes, once or twice",
        "We are open to anything that helps",
        "We haven't evaluated enough to say no",
      ],
    },
    {
      id: "q6",
      prompt:
        "Does your evaluation process include theological or missional constraints?",
      options: [
        "Yes, as a primary filter",
        "Yes, as a secondary consideration",
        "We focus mainly on utility",
        "No",
      ],
    },
  ],
  "sandbox-truth": [
    {
      id: "q7",
      prompt:
        "Are you using isolated environments (sandboxes) to test AI tools?",
      options: [
        "Yes, across the organization",
        "In specific departments",
        "Informally",
        "No, we test in production",
      ],
    },
  ],
  "formation-not-training": [
    {
      id: "q8",
      prompt:
        "Does your AI training emphasize human formation and critical thinking?",
      options: [
        "Yes, deeply integrated",
        "We address it somewhat",
        "Mostly focused on prompt engineering",
        "We don't do AI training yet",
      ],
    },
  ],
  "solution-restraint": [
    {
      id: "q9",
      prompt:
        "Are you mapping AI solutions to actual organizational bottlenecks, or just adopting features?",
      options: [
        "Rigorous mapping",
        "Rough alignment",
        "Adopting available features",
        "Reactive adoption",
      ],
    },
  ],
} as const;

export const QUESTIONS = Object.values(QUESTIONS_BY_DIMENSION).flat();
export const TOTAL_QUESTIONS = QUESTIONS.length;
