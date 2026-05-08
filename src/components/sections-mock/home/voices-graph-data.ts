/**
 * Movement Voices graph — single source for the credibility-band network.
 * IDs are stable slugs for layout and React Flow keys.
 *
 * Topology: Alan Hirsch sits at the center, all other voices in a ring around
 * him; every voice connects to every other voice (all-channel network).
 */

export interface VoiceGraphVoice {
  id: string;
  name: string;
  title: string;
  initials: string;
  imageSrc: string;
}

export const CENTER_VOICE_ID = "alan-hirsch";

export const MOVEMENT_VOICES: readonly VoiceGraphVoice[] = [
  {
    id: "alan-hirsch",
    name: "Alan Hirsch",
    title: "Founder, 100Movements & Forge Mission Training Network",
    initials: "AH",
    imageSrc: "/images/voices/alan-hirsch.webp",
  },
  {
    id: "brad-brisco",
    name: "Brad Brisco",
    title: "CEO & Co-founder, Movemental",
    initials: "BB",
    imageSrc: "/images/voices/brad-brisco.webp",
  },
  {
    id: "josh-shepherd",
    name: "Joshua Shepherd",
    title: "CTO & Founder, Movemental",
    initials: "JS",
    imageSrc: "/images/voices/josh-shepherd.webp",
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
