/**
 * Agent Room — the portrait band (ported from `js/data/leaders.js`).
 *
 * The 17 leaders shown "Built with & backed by" on the home screen and opened
 * as `leader` profiles. Names/creds are byte-identical to the prototype; the
 * portraits, which the prototype inlined as ~264 KB of base64 data URIs, are
 * externalized to `public/agent-room/leaders/{i}.jpg` so they stay out of the
 * `/agent` JS bundle (a static image request, not a data fetch).
 */
export interface Leader {
  name: string;
  /** Short credential line under the name (prototype field `cred`). */
  cred: string;
  /** Public path to the portrait. */
  img: string;
}

export const LEADERS: readonly Leader[] = [
  { name: "Alan Hirsch", cred: "Missional theologian", img: "/agent-room/leaders/0.jpg" },
  { name: "Brad Brisco", cred: "Missional strategist", img: "/agent-room/leaders/1.jpg" },
  { name: "JR Woodward", cred: "Author, movement leader", img: "/agent-room/leaders/2.jpg" },
  { name: "Neil Cole", cred: "Church-multiplication author", img: "/agent-room/leaders/3.jpg" },
  { name: "Rowland Smith", cred: "Forge America, author", img: "/agent-room/leaders/4.jpg" },
  { name: "Rob Wegner", cred: "Network co-founder", img: "/agent-room/leaders/5.jpg" },
  { name: "Liz Rios", cred: "Leader, author", img: "/agent-room/leaders/6.jpg" },
  { name: "Lucas Pulley", cred: "Network leader", img: "/agent-room/leaders/7.jpg" },
  { name: "Josh Shepherd", cred: "Movemental, founder", img: "/agent-room/leaders/8.jpg" },
  { name: "Jeremy & Monica Chambers", cred: "Movement leaders", img: "/agent-room/leaders/9.jpg" },
  { name: "Dave Ferguson", cred: "Movement leader", img: "/agent-room/leaders/10.jpg" },
  { name: "Dhati Lewis", cred: "Movement leader", img: "/agent-room/leaders/11.jpg" },
  { name: "Hugh Halter", cred: "Movement leader", img: "/agent-room/leaders/12.jpg" },
  { name: "Michael Cooper", cred: "Movement leader", img: "/agent-room/leaders/13.jpg" },
  { name: "Roy Moran", cred: "Movement leader", img: "/agent-room/leaders/14.jpg" },
  { name: "Peyton Jones", cred: "Movement leader", img: "/agent-room/leaders/15.jpg" },
  { name: "Meghan Good", cred: "Movement leader", img: "/agent-room/leaders/16.jpg" },
];

/**
 * Band index → Supabase `movement_leader_corpus_data.corpus_slug` (INT-06). An
 * explicit map (not array position) is the stable key for corpus retrieval; a
 * `null` means there is no approved corpus row for that leader, so the seam
 * keeps the local curated `PROFILES` record (e.g. Josh Shepherd — founder, no
 * external corpus). Verified against the live table's slug set on 2026-06-10.
 */
export const LEADER_CORPUS_SLUGS: Record<number, string | null> = {
  0: "alan-hirsch",
  1: "brad-brisco",
  2: "jr-woodward",
  3: "neil-cole",
  4: "rowland-smith",
  5: "rob-wegner",
  6: "liz-rios",
  7: "lucas-pulley",
  8: null, // Josh Shepherd — no corpus row; local curated record stands
  9: "jeremy-chambers",
  10: "dave-ferguson",
  11: "dhati-lewis",
  12: "hugh-halter",
  13: "michael-cooper",
  14: "roy-moran",
  15: "peyton-jones",
  16: "meghan-good",
};
