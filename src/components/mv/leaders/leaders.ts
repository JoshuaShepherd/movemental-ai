import { MEDIA_LIBRARY_BASE } from "../data/network";

/**
 * Movement leaders for /leaders and /leaders/[slug].
 *
 * Source: movement_leaders and v_tenant_hosts (Supabase vhaiiiykcukrlyvwlgip), October 15, 2026.
 * Natasha Nikkel and Jamie Roach are excluded for now. Order is by family name, as on the board.
 * Credentials are the short labels approved on the canvas board "Leaders"; where the board had
 * "[Credential]" there is none. Research bios in the table are not published: a profile shows
 * prose only where a curated profile exists (today, Brian Sanders: bio_long and personal_piece).
 * TODO(back-end merge): read this from the database, and publish bios only once endorsed
 * (reflected_understanding_endorsed_at).
 */

export interface Leader {
  slug: string;
  name: string;
  credential: string | null;
  photo: string;
  /** The leader's own site: a custom domain where one exists, else their movemental.ai host. */
  host: string;
  /** Curated profile content, only where it exists. */
  profile?: {
    place?: string;
    bio: readonly string[];
    quote?: string;
    works: readonly (readonly [title: string, kind: string, italic: boolean])[];
  };
}

const L = (
  slug: string,
  name: string,
  credential: string | null,
  photo: string,
  host: string,
  profile?: Leader["profile"],
): Leader => ({ slug, name, credential, photo: MEDIA_LIBRARY_BASE + photo, host, profile });

export const LEADERS: readonly Leader[] = [
  L("daniel-bravo", "Daniel Bravo", null, "daniel-bravo/headshots/daniel-bravo.webp", "daniel-bravo.movemental.ai"),
  L("brad-brisco", "Brad Brisco", "Director of Multiplication Strategies, Send Network", "brad-brisco/headshots/brad-brisco-primary-3x4.webp", "bradbrisco.org"),
  L("jeremy-chambers", "Jeremy & Monica Chambers", "Church planters and urban missionaries", "jeremy-chambers/headshots/jeremy-chambers.webp", "jeremy-chambers.movemental.ai"),
  L("neil-cole", "Neil Cole", "Church-multiplication author", "neil-cole/headshots/neil-cole.webp", "neil-cole.movemental.ai"),
  L("kate-coleman", "Kate Coleman & Cham Kaur-Mann", "Next Leadership", "kate-coleman/headshots/kate-coleman-2026-10-1x1.webp", "kate-coleman.movemental.ai"),
  L("michael-cooper", "Michael Cooper", "Missiologist and theologian", "michael-cooper/headshots/michael-cooper-primary.webp", "drmichaelcooper.com"),
  L("david-docusen", "David Docusen", null, "david-docusen/headshots/david-docusen-primary.webp", "david-docusen.movemental.ai"),
  L("dave-ferguson", "Dave Ferguson", "Church planter and author", "dave-ferguson/headshots/dave-ferguson.webp", "dave-ferguson.movemental.ai"),
  L("meghan-good", "Meghan Larissa Good", "Pastor, theologian and author", "meghan-good/headshots/meghan-good.webp", "meghan-good.movemental.ai"),
  L("hugh-halter", "Hugh Halter", "Missional church leader and author", "hugh-halter/headshots/hugh-halter.webp", "hugh-halter.movemental.ai"),
  L("alan-hirsch", "Alan Hirsch", "Missional theologian and author", "alan-hirsch/headshots/alan-hero-4x5.webp", "alanhirsch.com"),
  L("deb-hirsch", "Debra Hirsch", null, "deb-hirsch/headshots/deb-hirsch.webp", "deb-hirsch.movemental.ai"),
  L("andrew-jones", "Andrew Jones", "Missionary and church developer", "andrew-jones/headshots/andrew-jones.webp", "andrew-jones.movemental.ai"),
  L("peyton-jones", "Peyton Jones", "Church planter and trainer", "peyton-jones/headshots/peyton-jones.webp", "peyton-jones.movemental.ai"),
  L("dhati-lewis", "Dhati Lewis", "Founding pastor, Blueprint Church", "dhati-lewis/headshots/dhati-lewis.webp", "dhati-lewis.movemental.ai"),
  L("bree-mills", "Bree Mills", null, "bree-mills/headshots/bree-mills.webp", "bree-mills.movemental.ai"),
  L("roy-moran", "Roy Moran", "Disciple-making movement practitioner", "roy-moran/headshots/roy-moran-primary.webp", "roy-moran.movemental.ai"),
  L("lucas-pulley", "Lucas Pulley", "Microchurch network leader", "lucas-pulley/headshots/lucas-pulley.webp", "lucas-pulley.movemental.ai"),
  L("liz-rios", "Liz Rios", "Theologian, leader and author", "liz-rios/headshots/liz-rios-primary.webp", "liz-rios.movemental.ai", {
    place: "Central Florida & Puerto Rico",
    bio: [
      "Liz Rios has carried thirty-five years of ministry across pastoring, planting, teaching, and consulting, and into infrastructure. She founded Passion2Plant, the only national BIPOC-woman-led church planting network in the United States, and directs Púlpito Fellows, a three-year, bilingual preaching fellowship funded by the Lilly Endowment.",
      "Her work runs simultaneously across denominational, academic, and movement spaces: ordained Disciples of Christ; adjunct faculty at Fuller; board member at Sojourners; senior consultant with Freedom Road; consulting editor at Outreach Magazine.",
      "She writes from a mujerista frame, distinct in tone and theological voice, and brings a live cohort operator’s discipline to what a leader’s platform actually has to carry.",
    ],
    works: [
      ["Don’t Buy The Lie", "Book", true],
      ["Passion2Plant", "National BIPOC-woman-led planting network", false],
      ["Púlpito Fellows", "Bilingual preaching fellowship", false],
      ["Mujerista in Motion", "Substack", true],
    ],
  }),
  L("brian-sanders", "Brian Sanders", "Founder, Underground Network", "brian-sanders/headshots/brian-sanders.webp", "brian-sanders.movemental.ai", {
    place: "Tampa",
    bio: [
      "Brian Sanders is a social entrepreneur and author who founded the Underground Network, a decentralized network of microchurches built for mission rather than weekly programs.",
      "For more than two decades he has lived in intentional community in Tampa’s poorest urban neighborhood, cultivating a model of church streamlined for outward movement.",
    ],
    quote:
      "I didn’t set out to invent a new kind of church. We simply asked what it would look like to organize our life together around the callings already stirring in our people, and the Underground grew from that question.",
    works: [
      ["The Underground Church", "Book", true],
      ["Microchurches", "Book", true],
      ["The 6 Seasons of Calling", "Book", true],
      ["The Underground Network", "Network of microchurches, Tampa", false],
    ],
  }),
  L("josh-shepherd", "Josh Shepherd", "Founder, Movemental", "josh-shepherd/headshots/josh-shepherd.webp", "josh-shepherd.movemental.ai"),
  L("rowland-smith", "Rowland Smith", "Pastor, missional practitioner and author", "rowland-smith/headshots/rowland-smith.webp", "rowland-smith.movemental.ai", {
    place: "Colorado Springs, Colorado",
    bio: [
      "Rowland Smith carries the National Director role at Forge America while founding and directing The Pando Collective, a Front-Range micro-church network, and pastoring missional culture at The Church at Pulpit Rock in Colorado Springs.",
      "He authored Life Out Loud: Joining Jesus Outside the Walls of the Church and curated and edited Red Skies: 10 Essential Conversations Exploring Our Future as the Church, a multi-author conversation exploring missional leadership.",
      "He teaches as adjunct faculty at Fuller, Denver Seminary, and Grand Canyon University, holding an MA in Global Leadership and a DMiss from Fuller.",
    ],
    works: [
      ["Life Out Loud", "Book", true],
      ["Red Skies", "Edited volume", true],
      ["Forge America", "Mission training network", false],
      ["The Pando Collective", "Front-Range micro-church network", false],
    ],
  }),
  L("tiffany-smith", "Tiffany Smith", "Missiologist and strategist", "tiffany-smith/headshots/tiffany-smith.webp", "tiffany-smith.movemental.ai"),
  L("danielle-strickland", "Danielle Strickland", "Communicator, author and justice advocate", "danielle-strickland/headshots/danielle-strickland.webp", "danielle-strickland.movemental.ai"),
  L("rob-wegner", "Rob Wegner", "Network co-founder", "rob-wegner/headshots/rob-wegner.webp", "rob-wegner.movemental.ai"),
  L("jr-woodward", "JR Woodward", "Church planter and missiologist", "jr-woodward/headshots/jr-woodward.webp", "jr-woodward.movemental.ai", {
    place: "United States",
    bio: [
      "JR Woodward has spent three decades planting churches that hold tight community, life-forming discipleship, locally rooted presence, and boundary-crossing mission together. He leads the V3 Church Planting Movement nationally and trains church planters across North America.",
      "His written corpus runs from Creating a Missional Culture through The Church as Movement (with Dan White Jr.) to The Scandal of Leadership, the trade book based on his Manchester Ph.D. on the powers of domination in the church.",
      "He co-founded Missio Alliance and the Praxis Gathering, teaches as adjunct faculty at Fuller, Central, and Missio Seminary, and serves on the boards of Reliant Mission and Movement Leaders Collective.",
    ],
    works: [
      ["Creating a Missional Culture", "Book", true],
      ["The Church as Movement", "Book", true],
      ["The Scandal of Leadership", "Book", true],
      ["V3 Church Planting Movement", "National church planting movement", false],
    ],
  }),
];

export function leaderBySlug(slug: string) {
  return LEADERS.find((l) => l.slug === slug);
}

/** First name for "Visit Brian’s site"; pairs keep their full name. */
export function siteLabel(l: Leader) {
  return l.name.includes("&") ? `Visit ${l.name}’s site` : `Visit ${l.name.split(" ")[0]}’s site`;
}
