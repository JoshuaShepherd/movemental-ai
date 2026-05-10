/**
 * Movement Voices graph — single source for the credibility-band network.
 *
 * Static HTML preview: `docs/html/scenius-network-v2/` — run
 * `pnpm docs:sync-movement-voices-html` after changing voices or IDs.
 * IDs are stable slugs for layout and React Flow keys.
 *
 * Topology:
 *   - A square Movemental brand node is pinned at the canvas center.
 *   - Voice positions are force-settled (D3) into an irregular mesh, not a ring.
 *   - Every node connects to every other node (complete graph / all-channel mesh)
 *     with Bezier edges and optional flow animation in React Flow.
 *
 * The `appearOrder` field drives the stagger reveal in
 * `movement-voices-network.tsx` — lower numbers animate in first.
 */

export interface VoiceGraphVoice {
  id: string;
  name: string;
  title: string;
  initials: string;
  imageSrc: string;
  /**
   * 1-indexed reveal order. Voice with `appearOrder: 1` animates in first
   * after the center, voice with `appearOrder: 9` animates in last.
   */
  appearOrder: number;
}

/** ID for the synthetic center node (the Movemental square). */
export const CENTER_NODE_ID = "movemental";

/**
 * The center node is not a voice — it's the platform anchor. We model it
 * separately so the voices list stays clean and typed for avatar rendering.
 */
export const MOVEMENTAL_CENTER = {
  id: CENTER_NODE_ID,
  label: "Movemental",
} as const;

/**
 * Trusted voices in the graph. `appearOrder` matches the home-page reveal
 * sequence requested by product:
 *   1. Alan Hirsch
 *   2. Dr. Brad Brisco
 *   3. Joshua Shepherd
 *   4. Tim Catchim
 *   5. JR Woodward
 *   6. Rowland Smith
 *   7. Liz Rios
 *   8. Lucas Pulley   (kept in the ring; reveals after the named seven)
 *   9. Rob Wegner     (kept in the ring; reveals last)
 */
export const MOVEMENT_VOICES: readonly VoiceGraphVoice[] = [
  {
    id: "alan-hirsch",
    name: "Alan Hirsch",
    title: "Founder, 100Movements & Forge Mission Training Network",
    initials: "AH",
    imageSrc: "/images/voices/alan-hirsch.webp",
    appearOrder: 1,
  },
  {
    id: "brad-brisco",
    name: "Dr. Brad Brisco",
    title: "CEO & Co-founder, Movemental",
    initials: "BB",
    imageSrc: "/images/voices/brad-brisco.webp",
    appearOrder: 2,
  },
  {
    id: "josh-shepherd",
    name: "Joshua Shepherd",
    title: "CTO & Founder, Movemental",
    initials: "JS",
    imageSrc: "/images/voices/josh-shepherd.webp",
    appearOrder: 3,
  },
  {
    id: "tim-catchim",
    name: "Tim Catchim",
    title: "APE practitioner · Co-author, The Permanent Revolution",
    initials: "TC",
    imageSrc: "/images/voices/tim-catchim.webp",
    appearOrder: 4,
  },
  {
    id: "jr-woodward",
    name: "Dr. JR Woodward",
    title: "National Director, V3 Church Planting Movement",
    initials: "JW",
    imageSrc: "/images/voices/jr-woodward.webp",
    appearOrder: 5,
  },
  {
    id: "rowland-smith",
    name: "Dr. Rowland Smith",
    title: "National Director, Forge America · Founder, The Pando Collective",
    initials: "RS",
    imageSrc: "/images/voices/rowland-smith.webp",
    appearOrder: 6,
  },
  {
    id: "liz-rios",
    name: "Dr. Liz Rios",
    title: "Founder, Passion2Plant · Director, Púlpito Fellows",
    initials: "LR",
    imageSrc: "/images/voices/liz-rios.webp",
    appearOrder: 7,
  },
  {
    id: "lucas-pulley",
    name: "Lucas Pulley",
    title: "Movements Director, Underground Network",
    initials: "LP",
    imageSrc: "/images/voices/lucas-pulley.webp",
    appearOrder: 8,
  },
  {
    id: "rob-wegner",
    name: "Rob Wegner",
    title: "Founding Leader, Kansas City Underground",
    initials: "RW",
    imageSrc: "/images/voices/rob-wegner.webp",
    appearOrder: 9,
  },
];

/**
 * Total reveal steps for the stagger animation: one for the center, plus
 * one per voice. The component drives the reveal index from 0 → TOTAL_STEPS.
 */
export const TOTAL_REVEAL_STEPS = 1 + MOVEMENT_VOICES.length;
