/**
 * Movement Voices graph — single source for the credibility-band network.
 * IDs are stable slugs for layout and React Flow keys.
 */

export interface VoiceGraphVoice {
  id: string;
  name: string;
  title: string;
  initials: string;
  imageSrc: string;
}

/** Abstract anchor nodes: shared field (formation, mission, place) — scenius backbone, not a roster. */
export interface VoiceThemeAnchor {
  id: string;
  label: string;
}

export const VOICE_THEME_ANCHORS: readonly VoiceThemeAnchor[] = [
  { id: "theme-formation", label: "Formation" },
  { id: "theme-mission", label: "Mission" },
  { id: "theme-place", label: "Place" },
];

export const MOVEMENT_VOICES: readonly VoiceGraphVoice[] = [
  {
    id: "alan-hirsch",
    name: "Alan Hirsch",
    title: "Founder, 100Movements & Forge Mission Training Network",
    initials: "AH",
    imageSrc: "/images/voices/alan-hirsch.webp",
  },
  {
    id: "liz-rios",
    name: "Dr. Liz Rios",
    title: "Founder, Passion2Plant · Director, Púlpito Fellows",
    initials: "LR",
    imageSrc: "/images/voices/liz-rios.webp",
  },
  {
    id: "rowland-smith",
    name: "Dr. Rowland Smith",
    title: "National Director, Forge America · Founder, The Pando Collective",
    initials: "RS",
    imageSrc: "/images/voices/rowland-smith.webp",
  },
  {
    id: "jr-woodward",
    name: "Dr. JR Woodward",
    title: "National Director, V3 Church Planting Movement",
    initials: "JW",
    imageSrc: "/images/voices/jr-woodward.webp",
  },
  {
    id: "lucas-pulley",
    name: "Lucas Pulley",
    title: "Movements Director, Underground Network",
    initials: "LP",
    imageSrc: "/images/voices/lucas-pulley.webp",
  },
  {
    id: "tim-catchim",
    name: "Tim Catchim",
    title: "APE practitioner · Co-author, The Permanent Revolution",
    initials: "TC",
    imageSrc: "/images/voices/tim-catchim.webp",
  },
  {
    id: "rob-wegner",
    name: "Rob Wegner",
    title: "Founding Leader, Kansas City Underground",
    initials: "RW",
    imageSrc: "/images/voices/rob-wegner.webp",
  },
];

/**
 * Curated voice↔theme edges (light hub). Adjust as the public story evolves.
 */
export const MOVEMENT_VOICE_THEME_LINKS: readonly { source: string; target: string }[] =
  [
    { source: "alan-hirsch", target: "theme-formation" },
    { source: "alan-hirsch", target: "theme-mission" },
    { source: "liz-rios", target: "theme-formation" },
    { source: "liz-rios", target: "theme-place" },
    { source: "rowland-smith", target: "theme-mission" },
    { source: "jr-woodward", target: "theme-mission" },
    { source: "jr-woodward", target: "theme-place" },
    { source: "lucas-pulley", target: "theme-mission" },
    { source: "lucas-pulley", target: "theme-place" },
    { source: "tim-catchim", target: "theme-formation" },
    { source: "rob-wegner", target: "theme-place" },
    { source: "rob-wegner", target: "theme-mission" },
  ];
