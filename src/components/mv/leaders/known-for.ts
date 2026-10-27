/**
 * What each movement leader is known for, one short line for the home page arc.
 * Written from docs/movement_leader_research (October 27, 2026). Not yet approved by the
 * leaders themselves; each should see theirs before launch. Leaders without a line show
 * their name only.
 * TODO(back-end merge): move to movement_leaders once leaders can edit it.
 */
export const KNOWN_FOR: Readonly<Record<string, string>> = {
  "alan-hirsch": "Author of The Forgotten Ways; created APEST",
  "brad-brisco": "Covocational church planting at Send Network",
  "jeremy-chambers": "The Art of Missional Spirituality; Forge America",
  "neil-cole": "Organic Church and the simple-church movement",
  "kate-coleman": "Next Leadership, mentoring leaders in church and society",
  "michael-cooper": "Ephesiology, the study of the Ephesus movement",
  "david-docusen": "Neighborliness and Center City Church",
  "dave-ferguson": "Exponential and Community Christian Church",
  "meghan-good": "Divine Gravity and The Bible Unwrapped",
  "hugh-halter": "The Tangible Kingdom and incarnational community",
  "deb-hirsch": "Redeeming Sex; co-founder of Forge",
  "andrew-jones": "Tall Skinny Kiwi, early voice of the emerging church",
  "peyton-jones": "Church Plantology and NewBreed Training",
  "dhati-lewis": "Among Wolves; Blueprint Church, Atlanta",
  "roy-moran": "Spent Matches and the Hybrid Church model",
  "lucas-pulley": "Leading the Underground microchurch network",
  "liz-rios": "Founder of Passion2Plant and the Púlpito Fellows",
  "brian-sanders": "Underground Church and the Tampa Underground",
  "rowland-smith": "Forge America and The Pando Collective",
  "tiffany-smith": "Missional Mayhem; Send Network strategist",
  "danielle-strickland": "Anti-trafficking work; the Right Side Up podcast",
  "rob-wegner": "The Starfish and the Spirit; Kansas City Underground",
  "jr-woodward": "Creating a Missional Culture; the V3 movement",
};

/** Leaders shown in the home page arc: every published leader except Movemental's own founder. */
export const ARC_EXCLUDE: ReadonlySet<string> = new Set(["josh-shepherd"]);
