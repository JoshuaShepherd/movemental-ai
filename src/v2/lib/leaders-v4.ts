/**
 * Canonical 25 Movement Leaders roster for Movemental Home v4.
 * Names and headshots only (L-3).
 * Source: docs/handoff/designs/Movemental Home v4.dc.html
 */
export const MEDIA_LIBRARY_BASE =
  "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/";

export interface LeaderV4 {
  name: string;
  imagePath: string;
  fullImageUrl: string;
}

export const LEADERS_V4_DATA: readonly [string, string][] = [
  ["Alan Hirsch", "alan-hirsch/headshots/alan-hirsch.webp"],
  ["Andrew Jones", "andrew-jones/headshots/andrew-jones.webp"],
  ["Brad Brisco", "brad-brisco/headshots/brad-brisco.webp"],
  ["Bree Mills", "bree-mills/headshots/bree-mills.webp"],
  ["Brian Sanders", "brian-sanders/headshots/brian-sanders.webp"],
  ["Daniel Bravo", "daniel-bravo/headshots/daniel-bravo.webp"],
  ["Danielle Strickland", "danielle-strickland/headshots/danielle-strickland.webp"],
  ["Dave Ferguson", "dave-ferguson/headshots/dave-ferguson.webp"],
  ["David Docusen", "david-docusen/david-docusen-portrait.webp"],
  ["Debra Hirsch", "deb-hirsch/headshots/deb-hirsch.webp"],
  ["Dhati Lewis", "dhati-lewis/headshots/dhati-lewis.webp"],
  ["Hugh Halter", "hugh-halter/headshots/hugh-halter.webp"],
  ["Jeremy & Monica Chambers", "jeremy-chambers/headshots/jeremy-chambers.webp"],
  ["JR Woodward", "jr-woodward/headshots/jr-woodward.webp"],
  ["Kate Coleman & Cham Kaur-Mann", "kate-coleman/headshots/kate-coleman.webp"],
  ["Liz Rios", "movemental/voices/liz-rios.webp"],
  ["Lucas Pulley", "lucas-pulley/headshots/lucas-pulley.webp"],
  ["Meghan Larissa Good", "meghan-good/headshots/meghan-good.webp"],
  ["Michael Cooper", "michael-cooper/headshots/michael-cooper.jpg"],
  ["Neil Cole", "neil-cole/headshots/neil-cole.webp"],
  ["Peyton Jones", "peyton-jones/headshots/peyton-jones.webp"],
  ["Rob Wegner", "rob-wegner/headshots/rob-wegner.webp"],
  ["Rowland Smith", "rowland-smith/headshots/rowland-smith.webp"],
  ["Roy Moran", "roy-moran/headshots/roy-moran.jpg"],
  ["Tiffany Smith", "tiffany-smith/headshots/tiffany-smith.webp"],
];

export const LEADERS_V4: LeaderV4[] = LEADERS_V4_DATA.map(([name, path]) => ({
  name,
  imagePath: path,
  fullImageUrl: `${MEDIA_LIBRARY_BASE}${path}`,
}));
