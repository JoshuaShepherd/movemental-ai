/**
 * Canonical eight-pattern catalog for `/methodology/eight-patterns`.
 * Condensed from docs/articles/sandbox/the-eight-patterns-where-value-hides.md — territory stays in the article.
 */

export type EightPattern = {
  num: number;
  name: string;
  shape: string;
  /** Three short domain examples for the expandable list. */
  domains: readonly [string, string, string];
  valueType:
    | "speed"
    | "scale"
    | "cognition"
    | "acceleration"
    | "quality"
    | "coherence"
    | "reasoning"
    | "relational-scaling";
  trap: string;
  /** Pattern 8 only — senior review before sandbox entry. */
  flagged?: true;
};

export const eightPatterns: readonly EightPattern[] = [
  {
    num: 1,
    name: "Repetition",
    shape: "Tasks your organization does over and over, largely similar each time, that consume real staff time.",
    domains: [
      "Donor thank-you sequences and stewardship touches",
      "Meeting recaps, weekly summaries, intake notes",
      "Event confirmations and volunteer onboarding mail",
    ],
    valueType: "speed",
    trap:
      "Speed applied carelessly erodes the relational signal repetition was carrying. The staff experiences repetition; the recipient does not. Pair repetition work with an explicit answer to what human signal must survive.",
  },
  {
    num: 2,
    name: "Translation",
    shape: "The same idea, moving to a different audience or a different format.",
    domains: [
      "Sermon to small-group guide; report to donor one-pager",
      "Internal memo to board brief; long article to social thread",
      "Policy to staff FAQ in a different register",
    ],
    valueType: "scale",
    trap:
      "Translation that sands the source into lowest-common-denominator prose. The nuance belonged to a specific audience; without a named owner for what must survive the trip, translation becomes generic polish.",
  },
  {
    num: 3,
    name: "Synthesis",
    shape: "Too much information needing clarity — multiple sources, one read.",
    domains: [
      "Strategic plan to executive brief",
      "Interview transcripts to theme map",
      "Board minutes survey for a new member",
    ],
    valueType: "cognition",
    trap:
      "Synthesis that smooths disagreement into a single confident story. Coherence is not honesty if the sources contested each other. Treat outputs as drafts of your synthesis, not the synthesis itself.",
  },
  {
    num: 4,
    name: "Generation",
    shape: "Blank-page problems — something must exist that does not yet.",
    domains: [
      "Grant outline, curriculum scaffold, job description first pass",
      "Campaign email sequence before the program exists",
      "Staff policy on a topic not yet written",
    ],
    valueType: "acceleration",
    trap:
      "The first draft becomes the whole draft because nobody is scoped for revision. Generation without a reviser and a written standard for revised produces generic final copy.",
  },
  {
    num: 5,
    name: "Transformation",
    shape: "Existing content improved or reshaped — tone, clarity, length, style normalization.",
    domains: [
      "Voice adjustment for a mismatched audience",
      "Compression of a structurally sound long report",
      "Clarity pass on a paragraph that says the right thing awkwardly",
    ],
    valueType: "quality",
    trap:
      "Transformation that irons out the distinctive edges that were load-bearing. Ask after any pass whether the piece reads more specifically you, or less. Less means the transformation was wrong.",
  },
  {
    num: 6,
    name: "Structuring",
    shape: "Unorganized thinking that must become structured output.",
    domains: [
      "Retreat whiteboard to strategy draft",
      "Spoken reasoning to framework or decision memo",
      "Rambling considerations to decision log",
    ],
    valueType: "coherence",
    trap:
      "Structure imposed before the thinking is real. Generators love bullets and matrices whether or not the thought has that shape. If the senior leader cannot explain the content without the frame, the frame is doing the thinking.",
  },
  {
    num: 7,
    name: "Decision support",
    shape: "Weighing options — scenarios, trade-offs, stress-tests around a real choice.",
    domains: [
      "Program shapes under constraints",
      "Partnership risk reads and staffing scenarios",
      "Naming or pricing where several plausible answers exist",
    ],
    valueType: "reasoning",
    trap:
      "The assistant's framing substitutes for the leader's judgment. Decision support becomes decision outsourcing. The instrument may structure considerations; it may not make the call.",
  },
  {
    num: 8,
    name: "Personalization",
    shape: "The same content, tailored to individuals — one message, many custom versions.",
    domains: [
      "Donor follow-ups referencing specific histories",
      "Coaching responses tuned to the individual",
      "Member outreach shaped to individual contexts",
    ],
    valueType: "relational-scaling",
    trap:
      "Personalization produces the feeling of care without the fact of care. Recipients learn the difference faster than producers learn to hide it. This pattern needs the ethical and relational flag before it enters the sandbox.",
    flagged: true,
  },
] as const;

export const valueTypeLabels: Record<EightPattern["valueType"], string> = {
  speed: "Speed",
  scale: "Scale",
  cognition: "Cognition",
  acceleration: "Acceleration",
  quality: "Quality",
  coherence: "Coherence",
  reasoning: "Reasoning",
  "relational-scaling": "Relational scaling",
};
