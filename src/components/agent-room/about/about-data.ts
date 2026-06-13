/**
 * Copy for `/agent/about` — adapted from movemental-the-talk.md and
 * movemental-kb-phase-3.md (four layers). Naming canon: Safety · Sandbox ·
 * Training · Technology; founding year 2026. No internal strategy framing.
 */

export const ABOUT_NAV = [
  { id: "who-we-are", label: "Who we are" },
  { id: "why-we-exist", label: "Why we exist" },
  { id: "what-we-believe", label: "What we believe" },
  { id: "what-movemental-is", label: "What Movemental is" },
  { id: "what-we-refuse", label: "What we refuse" },
  { id: "formation-stakes", label: "Formation stakes" },
] as const;

export const ABOUT_SPY_SECTIONS = [
  { id: "who-we-are", navIndex: 0 },
  { id: "why-we-exist", navIndex: 1 },
  { id: "what-we-believe", navIndex: 2 },
  { id: "what-movemental-is", navIndex: 3 },
  { id: "what-we-refuse", navIndex: 4 },
  { id: "formation-stakes", navIndex: 5 },
] as const;

/** Matches the in-room `whatIs` scene chip set. */
export const ABOUT_DOCK = {
  voiceLine:
    "Three founders, a two-year conversation, and a question about whether anyone still stands behind the words.",
  highlightChipLabel: "See the whole path",
  chips: [
    { label: "See the whole path", action: "agent" as const, agentAsk: "See the whole path" },
    {
      label: "Map where we actually stand",
      action: "agent" as const,
      agentAsk: "Map where we actually stand",
    },
    { label: "What does it cost?", action: "agent" as const, agentAsk: "What does it cost?" },
    { label: "Get in touch", action: "agent" as const, agentAsk: "Get in touch" },
  ],
};

export const BABEL_PENTECOST = [
  {
    term: "Babel",
    body: "A people who said, let us make a name for ourselves. One coherent tower on their own terms. Coherence aimed at replacing God. Noise is not the only danger. Coherence pointed the wrong way rebuilds Babel with better materials.",
  },
  {
    term: "Pentecost",
    body: "The scattering reversed. Not by making everyone speak one language, but by making everyone understood in their own. Babel flattens difference and points at itself. Pentecost honors difference and points away from itself. Both are forms of coherence. Only one heals.",
  },
] as const;
