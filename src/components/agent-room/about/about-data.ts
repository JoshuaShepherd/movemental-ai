/**
 * Copy + structure for `/agent/about` — the public "About Movemental" document.
 * Ink Band surface. Faithful migration of the about-page mockup, adapted to the
 * Ink Band palette (the mockup's green verify/cited cues become ink-blue, the
 * canon accent for trust gestures). Founder portraits + the network grid pull
 * real people from `@/lib/agent-room/data/leaders` — no placeholders.
 *
 * Doctrine: movement leaders are an ecosystem / trusted-voice layer, not a
 * roster or funnel segment. The network section frames them as exactly that and
 * hands deeper detail to /agent/movement-voices. See
 * docs/build/strategy/movement-leaders-as-ecosystem-layer.md.
 */

export const ABOUT_NAV = [
  { id: "who-we-are", label: "Who we are" },
  { id: "why-we-exist", label: "Why we exist" },
  { id: "the-story", label: "The story" },
  { id: "how-we-use-ai", label: "How we use AI" },
  { id: "what-we-refuse", label: "What we refuse" },
  { id: "the-founders", label: "The founders" },
  { id: "the-network", label: "The network" },
  { id: "research", label: "Research" },
  { id: "talk-to-us", label: "Talk to us" },
] as const;

/** 1:1 with ABOUT_NAV — each section spies to its own nav entry. */
export const ABOUT_SPY_SECTIONS = ABOUT_NAV.map((entry, navIndex) => ({
  id: entry.id,
  navIndex,
}));

/** Agent dock — voice line + handoff chips (mirrors the mockup's agent band). */
export const ABOUT_DOCK = {
  voiceLine:
    "Ask me anything about Movemental — why it exists, who's behind it, and what we won't do.",
  highlightChipLabel: "Why does this exist?",
  chips: [
    {
      label: "Why does this exist?",
      action: "agent" as const,
      agentAsk: "Why does Movemental exist?",
    },
    {
      label: "Who are the founders?",
      action: "agent" as const,
      agentAsk: "Who are the founders of Movemental?",
    },
    {
      label: "What won't you do?",
      action: "agent" as const,
      agentAsk: "What will Movemental never do?",
    },
    {
      label: "Get in touch",
      action: "agent" as const,
      agentAsk: "I'd like to get in touch with Movemental.",
    },
  ],
};

/** Section 05 — the line we won't cross. */
export const ABOUT_REFUSALS = [
  {
    lead: "No urgency, no scarcity, no pressure.",
    rest: "We will never manufacture a deadline or a fear of missing out to move you.",
  },
  {
    lead: "We never fake authorship.",
    rest: "We help your people tell their own story. We never write under a human's name as if it were them.",
  },
  {
    lead: "We never replace the sacred.",
    rest: "AI does the gathering and the drafting. It never does the discernment, the shepherding, the relationships, or the care.",
  },
  {
    lead: "We claim only what is earned.",
    rest: "We do not promise outcomes the work has not produced yet.",
  },
  {
    lead: "We take extra care with the vulnerable.",
    rest: "When you serve minors or families, we are more cautious, not less.",
  },
] as const;

/**
 * Section 06 — founders, by index into `LEADERS`:
 * Alan Hirsch (0), Brad Brisco (1), Josh Shepherd (8). Portraits are the real
 * `LEADERS[i].img` files. `profileAsk` hands off to the concierge.
 */
export const ABOUT_FOUNDERS = [
  {
    leaderIndex: 0,
    role: "Movement thinker",
    bio: "One of the most influential voices on missional church and movements. His frameworks have shaped a generation of leaders. His own platform is the reference for everything we build for a Voice.",
    profileAsk: "Tell me about Alan Hirsch.",
    verify: "Author entity · sameAs linked",
  },
  {
    leaderIndex: 1,
    role: "Missional leader",
    bio: "A missional church leader and author focused on how ordinary churches and people live sent into their places. He keeps the work tethered to the ground it is meant to serve.",
    profileAsk: "Tell me about Brad Brisco.",
    verify: "Author entity · sameAs linked",
  },
  {
    leaderIndex: 8,
    role: "Technical co-founder",
    bio: "The one turning the thesis into software. He builds the platform, the agents, and the system underneath, so the ideas become something an organization can actually use.",
    profileAsk: "Tell me about Josh Shepherd.",
    verify: "Founder entity · sameAs linked",
  },
] as const;

/**
 * Section 07 — the network grid. Indices into `LEADERS`; the first is "lit"
 * (the anchor Voice). Real trusted voices already shown "Built with & backed by"
 * in the room — not a recruiting roster.
 */
export const ABOUT_NETWORK_LIT_INDEX = 0;
export const ABOUT_NETWORK_INDICES = [0, 1, 2, 3, 5, 10, 12] as const;

/**
 * Section 08 — research. Links resolve to real articles in the Research Library
 * (`src/lib/research/data.ts`), so the "Cited" cue is literally true.
 */
export const ABOUT_PAPERS = [
  {
    num: "01",
    slug: "the-cost-of-fragmentation",
    title: "The Cost of Fragmentation",
    sub: "Why scattered work is the real problem AI exposes.",
  },
  {
    num: "02",
    slug: "ai-credibility-crisis",
    title: "The AI Credibility Crisis",
    sub: "What is actually happening to whether anyone can be believed.",
  },
  {
    num: "03",
    slug: "credibility-thesis",
    title: "The Credibility Thesis",
    sub: "Why being believed is now the work.",
  },
  {
    num: "04",
    slug: "voice-preservation",
    title: "Can AI Actually Sound Like You?",
    sub: "What AI does to authorship, and why it matters.",
  },
  {
    num: "05",
    slug: "scenius-network-credibility",
    title: "Scenius as Credibility Mechanism",
    sub: "How a network makes each voice more believable.",
  },
] as const;
