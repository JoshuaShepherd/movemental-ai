/**
 * Copy for `/agent/movement-voices` — adapted from movemental-the-talk.md and
 * movemental-kb-phase-3.md (origin / scenius / invitation). No internal strategy
 * framing; naming canon: Safety · Sandbox · Training · Tech; founding year 2026.
 */

export const MOVEMENT_VOICES_NAV = [
  { id: "hero", label: "The break" },
  { id: "breaking", label: "What's breaking" },
  { id: "scenius", label: "The scenius" },
  { id: "four-layers", label: "Four layers" },
  { id: "the-hundred", label: "The hundred" },
  { id: "voices", label: "The Voices" },
  { id: "invitation", label: "Invitation" },
] as const;

export const MOVEMENT_VOICES_SPY_SECTIONS = [
  { id: "hero", navIndex: 0 },
  { id: "breaking", navIndex: 1 },
  { id: "scenius", navIndex: 2 },
  { id: "four-layers", navIndex: 3 },
  { id: "the-hundred", navIndex: 4 },
  { id: "voices", navIndex: 5 },
  { id: "invitation", navIndex: 6 },
] as const;

export const MOVEMENT_VOICES_DOCK = {
  voiceLine: "A reader who cannot tell whether anyone stands behind the words — that is where we begin.",
  highlightChipLabel: "Become a Movement Voice",
  chips: [
    { label: "Map where we actually stand", action: "agent" as const },
    { label: "What is the scenius?", action: "scroll" as const, target: "scenius" },
    { label: "Become a Movement Voice", action: "scroll" as const, target: "invitation" },
    { label: "See the leaders", action: "scroll" as const, target: "voices" },
  ],
};

export const FOUR_LAYERS = [
  {
    term: "The scenius",
    body: "The shared intelligence of the scene — the thing being served, not owned. You cannot manufacture it; you can only host it.",
  },
  {
    term: "The corpus",
    body: "The authors' own work — books, articles, sermons, talks — owned by them, gathered only with their consent.",
  },
  {
    term: "The platform",
    body: "The infrastructure that lets a distributed scene act like a scene: content, learning, cohorts, linking, translation.",
  },
  {
    term: "AI",
    body: "The interpretive mirror — the layer that can read scattered work alongside the corpus and reflect the network back to itself coherently, without inventing what was never said.",
  },
] as const;

export const TRANSLATION_LANGUAGES = [
  "Portuguese",
  "Spanish",
  "Mandarin",
  "Korean",
  "German",
  "French",
] as const;
