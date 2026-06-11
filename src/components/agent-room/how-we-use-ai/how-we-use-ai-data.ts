/**
 * Copy for `/agent/how-we-use-ai` — adapted from guide-ai-credibility-2026.md
 * (AI Credibility guide) and movemental-the-talk.md refusals. No internal
 * strategy framing; naming canon: Safety · Sandbox · Training · Technology.
 */

export const HOW_WE_USE_AI_NAV = [
  { id: "hero", label: "How we use AI" },
  { id: "what-we-refuse", label: "What we refuse" },
  { id: "traffic-lights", label: "Green / yellow / red" },
  { id: "you-are-the-node", label: "You stay in charge" },
  { id: "scenius-refusals", label: "Scenius refusals" },
] as const;

export const HOW_WE_USE_AI_SPY_SECTIONS = [
  { id: "hero", navIndex: 0 },
  { id: "what-we-refuse", navIndex: 1 },
  { id: "traffic-lights", navIndex: 2 },
  { id: "you-are-the-node", navIndex: 3 },
  { id: "scenius-refusals", navIndex: 4 },
] as const;

export const HOW_WE_USE_AI_DOCK = {
  voiceLine: "We use the tools we sell. On ourselves, first.",
  highlightChipLabel: "Map where we actually stand",
  chips: [
    {
      label: "Map where we actually stand",
      action: "agent" as const,
      agentAsk: "Map where we actually stand",
    },
    { label: "See the whole path", action: "agent" as const, agentAsk: "See the whole path" },
    { label: "Get in touch", action: "agent" as const, agentAsk: "Get in touch" },
  ],
};

/** Three refusals from the AI Credibility guide — essential, not decorative. */
export const NAMED_REFUSALS = [
  {
    term: "Replacement of relationship",
    body: "We do not use AI to simulate pastoral presence, mentoring, or care. Formation happens in relationship. AI can support the work around that relationship; it cannot be the relationship.",
  },
  {
    term: "Formation without presence",
    body: "We do not hand over the work that forms us. Preaching, teaching, and writing that carries our convictions go to the machine only with our full engagement. If it goes out under our name and is meant to form people, we have read it, weighed it, and owned it.",
  },
  {
    term: "Amplification without credibility",
    body: "We do not use AI to look bigger than the work and network actually warrant. Not more output, more polish, or more reach when we have not done the work or do not have the people to back it up. Looking more credible than you are fails when it outruns the credibility you actually have.",
  },
] as const;

export const TRAFFIC_LIGHTS = [
  {
    signal: "green" as const,
    label: "Green light",
    heading: "Clear human benefit, no meaningful negative consequence.",
    body: "Structure, findability, admin, and translation. These are tasks that do not require your voice or your judgment. First drafts you will edit and own before anything goes out under your name. AI handles the supporting work; you stay in the loop where the output represents you.",
    examples: [
      "Making existing work searchable",
      "Metadata, headings, internal linking",
      "Translating work you have already written",
      "Formatting and administrative repetition",
    ],
  },
  {
    signal: "yellow" as const,
    label: "Yellow light",
    heading: "Real benefit, but only with guardrails.",
    body: "Context-dependent. A quick internal summary is not the same as a public-facing piece. A first draft you will heavily edit is not the same as a post you publish with light changes. When in doubt, slow down. When the output will form people or represent you publicly, the human in the loop is you, reading, weighing, owning.",
    examples: [
      "Drafts you review before sending",
      "Research where citation and verification are required",
      "Facilitated conversations where AI never substitutes for participants",
    ],
  },
  {
    signal: "red" as const,
    label: "Red light",
    heading: "Harm, regardless of how carefully it is deployed.",
    body: "The lines we do not cross, and the lines we help organizations name in Safety. AI used to author content under a human's name without disclosure. AI impersonating humans in pastoral or counseling contexts. AI making eligibility decisions that affect people's access to services. We do not deploy these. We help the organizations we work with publicly commit to refusing them as well.",
    examples: [
      "Undisclosed authorship under a human name",
      "Pastoral or counseling impersonation",
      "Decisions about access to care or services",
    ],
  },
] as const;

export const SCENIUS_REFUSALS = [
  "No ranked leaderboards",
  "No vanity metrics",
  "No engagement-optimized feeds",
  "No parasocial substitutes where reading replaces relationship",
] as const;
