// ---------------------------------------------------------------------------
// Scenius Network — Data
// ---------------------------------------------------------------------------

export interface SceniusNode {
  id: string
  name: string
  role?: string
  organization?: string
  bio?: string
  avatarUrl?: string
  tags?: string[]
  /** Reveal tier: 0 = Alan (center), higher = revealed later */
  tier: number
  /** True = real leader in the network today; false = persona / who's next */
  inNetwork: boolean
  /** Number of other nodes this one is linked to (computed from links). Shown in card. */
  connectionCount?: number
  /** Optional: pieces in the network that cite/reference this voice (mock or real). */
  citedByCount?: number
  /** For persona nodes: one-line story shown in the card. */
  personaStory?: string
}

export interface SceniusLink {
  source: string
  target: string
  /** 0–1, affects link distance (1 = closest) */
  strength?: number
}

export interface SceniusData {
  nodes: SceniusNode[]
  links: SceniusLink[]
}

// ---------------------------------------------------------------------------
// Avatar helpers — use local images where available, else UI Avatars
// ---------------------------------------------------------------------------

function avatarUrl(name: string, id: string): string {
  if (id === 'brad-brisco') {
    return '/media-library/images/headshots/brad-brisco/brad-brisco-studio-backdrop-3x4.webp'
  }
  const encoded = encodeURIComponent(name.replace(/\s+/g, '+'))
  return `https://ui-avatars.com/api/?name=${encoded}&background=6e916e&color=fff&size=128`
}

// ---------------------------------------------------------------------------
// Known Authors (tiers 0–4) — sourced from author registry
// ---------------------------------------------------------------------------

/** Known authors (tiers 0–4). inNetwork: true; citedByCount is mock for now. */
const KNOWN_NODES: SceniusNode[] = [
  // Tier 0 — Anchor
  {
    id: 'alan-hirsch',
    name: 'Alan Hirsch',
    role: 'Missional Strategist & Movement Catalyst',
    organization: 'Forge International',
    bio: 'Thought leader on missional ecclesiology, organic systems, and apostolic movement. Founder of Forge Mission Training Network.',
    tags: ['theology', 'mission', 'movement'],
    tier: 0,
    inNetwork: true,
    citedByCount: 24,
    avatarUrl: avatarUrl('Alan Hirsch', 'alan-hirsch'),
  },
  // Tier 1 — Closest collaborator
  {
    id: 'brad-brisco',
    name: 'Brad Brisco',
    role: 'Director of Multiplication Strategies',
    organization: 'Send Network',
    bio: 'Missional church strategist and co-author with Alan Hirsch on The Permanent Revolution.',
    tags: ['strategy', 'multiplication', 'author'],
    tier: 1,
    inNetwork: true,
    citedByCount: 18,
    avatarUrl: avatarUrl('Brad Brisco', 'brad-brisco'),
  },
  // Tier 2 — Core co-authors (inNetwork: false = not yet in the network; shown as "who's next")
  {
    id: 'michael-frost',
    name: 'Michael Frost',
    role: 'Theologian',
    organization: 'Morling College',
    bio: 'Missiologist and author exploring incarnational mission and the future of the church.',
    tags: ['theology', 'mission', 'author'],
    tier: 2,
    inNetwork: false,
    citedByCount: 14,
    avatarUrl: avatarUrl('Michael Frost', 'michael-frost'),
  },
  {
    id: 'deb-hirsch',
    name: 'Deb Hirsch',
    role: 'Author',
    organization: 'Forge International',
    bio: 'Speaker and writer on spiritual formation and community practices.',
    tags: ['formation', 'author', 'speaker'],
    tier: 2,
    inNetwork: false,
    citedByCount: 12,
    avatarUrl: avatarUrl('Deb Hirsch', 'deb-hirsch'),
  },
  // Tier 3 — Inner circle
  {
    id: 'lance-ford',
    name: 'Lance Ford',
    role: 'Author & Consultant',
    bio: 'Author and consultant on missional leadership and church transformation.',
    tags: ['leadership', 'author', 'consulting'],
    tier: 3,
    inNetwork: false,
    citedByCount: 9,
    avatarUrl: avatarUrl('Lance Ford', 'lance-ford'),
  },
  {
    id: 'tim-keel',
    name: 'Tim Keel',
    role: 'Pastor & Author',
    bio: 'Pastor and thought leader on faith, culture, and spiritual formation.',
    tags: ['pastoral', 'formation', 'author'],
    tier: 3,
    inNetwork: false,
    citedByCount: 7,
    avatarUrl: avatarUrl('Tim Keel', 'tim-keel'),
  },
  {
    id: 'dave-ferguson',
    name: 'Dave Ferguson',
    role: 'Speaker & Author',
    bio: 'Leadership coach and author on multiplication movements.',
    tags: ['leadership', 'multiplication', 'author'],
    tier: 3,
    inNetwork: false,
    citedByCount: 8,
    avatarUrl: avatarUrl('Dave Ferguson', 'dave-ferguson'),
  },
  {
    id: 'hugh-halter',
    name: 'Hugh Halter',
    role: 'Trainer & Author',
    bio: 'Church planter, author, and trainer focused on incarnational community.',
    tags: ['training', 'church-planting', 'author'],
    tier: 3,
    inNetwork: false,
    citedByCount: 10,
    avatarUrl: avatarUrl('Hugh Halter', 'hugh-halter'),
  },
  // Tier 4 — Extended known authors
  {
    id: 'matt-smay',
    name: 'Matt Smay',
    role: 'Church Planter',
    bio: 'Church planter and co-author focused on missional community.',
    tags: ['church-planting', 'author'],
    tier: 4,
    inNetwork: false,
    citedByCount: 6,
    avatarUrl: avatarUrl('Matt Smay', 'matt-smay'),
  },
  {
    id: 'jeff-vanderstelt',
    name: 'Jeff Vanderstelt',
    role: 'Pastor & Author',
    bio: 'Pastor and author focused on gospel-centered community and mission.',
    tags: ['pastoral', 'mission', 'author'],
    tier: 4,
    inNetwork: false,
    citedByCount: 5,
    avatarUrl: avatarUrl('Jeff Vanderstelt', 'jeff-vanderstelt'),
  },
  {
    id: 'steve-addison',
    name: 'Steve Addison',
    role: 'Researcher & Author',
    bio: 'Researcher and author on movements and church multiplication.',
    tags: ['research', 'movements', 'author'],
    tier: 4,
    inNetwork: false,
    citedByCount: 6,
    avatarUrl: avatarUrl('Steve Addison', 'steve-addison'),
  },
  {
    id: 'ori-brafman',
    name: 'Ori Brafman',
    role: 'Author',
    bio: 'Bestselling author on organizational dynamics and decentralized systems.',
    tags: ['leadership', 'author', 'organizations'],
    tier: 4,
    inNetwork: false,
    citedByCount: 4,
    avatarUrl: avatarUrl('Ori Brafman', 'ori-brafman'),
  },
  {
    id: 'eddie-gibbs',
    name: 'Eddie Gibbs',
    role: 'Professor & Author',
    bio: 'Professor emeritus and author on church leadership and emerging churches.',
    tags: ['academic', 'leadership', 'author'],
    tier: 4,
    inNetwork: false,
    citedByCount: 5,
    avatarUrl: avatarUrl('Eddie Gibbs', 'eddie-gibbs'),
  },
  {
    id: 'mindy-caliguire',
    name: 'Mindy Caliguire',
    role: 'Soul Care Expert',
    bio: 'Author and speaker on spiritual formation and soul care practices.',
    tags: ['soul-care', 'formation', 'author'],
    tier: 4,
    inNetwork: false,
    citedByCount: 5,
    avatarUrl: avatarUrl('Mindy Caliguire', 'mindy-caliguire'),
  },
  {
    id: 'mandy-smith',
    name: 'Mandy Smith',
    role: 'Pastor & Author',
    bio: 'Pastor and author exploring the intersection of faith and everyday life.',
    tags: ['pastoral', 'author'],
    tier: 4,
    inNetwork: false,
    citedByCount: 4,
    avatarUrl: avatarUrl('Mandy Smith', 'mandy-smith'),
  },
  {
    id: 'josh-shepherd',
    name: 'Josh Shepherd',
    role: 'Platform Lead',
    organization: 'Movemental',
    bio: 'Builder and technologist working at the intersection of AI, publishing, and movement leadership.',
    tags: ['platform', 'steward', 'technology'],
    tier: 4,
    inNetwork: false,
    citedByCount: 6,
    avatarUrl: avatarUrl('Josh Shepherd', 'josh-shepherd'),
  },
  {
    id: 'scott-shepherd',
    name: 'Scott Shepherd',
    role: 'Author',
    bio: 'Author and practitioner in the missional movement space.',
    tags: ['author', 'mission'],
    tier: 4,
    inNetwork: false,
    citedByCount: 4,
    avatarUrl: avatarUrl('Scott Shepherd', 'scott-shepherd'),
  },
]

// ---------------------------------------------------------------------------
// Links among known authors
// ---------------------------------------------------------------------------

const KNOWN_LINKS: SceniusLink[] = [
  // Tier 0→1
  { source: 'alan-hirsch', target: 'brad-brisco', strength: 0.95 },
  // Tier 0→2
  { source: 'alan-hirsch', target: 'michael-frost', strength: 0.9 },
  { source: 'alan-hirsch', target: 'deb-hirsch', strength: 0.95 },
  // Tier 0→3
  { source: 'alan-hirsch', target: 'lance-ford', strength: 0.8 },
  { source: 'alan-hirsch', target: 'tim-keel', strength: 0.7 },
  { source: 'alan-hirsch', target: 'dave-ferguson', strength: 0.75 },
  { source: 'alan-hirsch', target: 'hugh-halter', strength: 0.7 },
  // Tier 0→4
  { source: 'alan-hirsch', target: 'matt-smay', strength: 0.6 },
  { source: 'alan-hirsch', target: 'jeff-vanderstelt', strength: 0.55 },
  { source: 'alan-hirsch', target: 'steve-addison', strength: 0.6 },
  { source: 'alan-hirsch', target: 'ori-brafman', strength: 0.5 },
  { source: 'alan-hirsch', target: 'eddie-gibbs', strength: 0.55 },
  { source: 'alan-hirsch', target: 'mindy-caliguire', strength: 0.5 },
  { source: 'alan-hirsch', target: 'mandy-smith', strength: 0.45 },
  { source: 'alan-hirsch', target: 'josh-shepherd', strength: 0.85 },
  // Cross-links among known
  { source: 'brad-brisco', target: 'lance-ford', strength: 0.7 },
  { source: 'brad-brisco', target: 'dave-ferguson', strength: 0.6 },
  { source: 'michael-frost', target: 'deb-hirsch', strength: 0.65 },
  { source: 'michael-frost', target: 'lance-ford', strength: 0.55 },
  { source: 'michael-frost', target: 'eddie-gibbs', strength: 0.5 },
  { source: 'hugh-halter', target: 'matt-smay', strength: 0.85 },
  { source: 'hugh-halter', target: 'lance-ford', strength: 0.5 },
  { source: 'dave-ferguson', target: 'steve-addison', strength: 0.55 },
  { source: 'jeff-vanderstelt', target: 'hugh-halter', strength: 0.45 },
  { source: 'josh-shepherd', target: 'brad-brisco', strength: 0.8 },
  { source: 'josh-shepherd', target: 'scott-shepherd', strength: 0.7 },
  { source: 'tim-keel', target: 'mandy-smith', strength: 0.45 },
  { source: 'mindy-caliguire', target: 'deb-hirsch', strength: 0.5 },
]

// ---------------------------------------------------------------------------
// Persona nodes (tiers 5–12) — "Who's next in the scenius"
// Target: ~100 total nodes (17 known + ~83 personas)
// ---------------------------------------------------------------------------

const PERSONA_ROLES: { name: string; role: string; story: string }[] = [
  {
    name: 'Church planter',
    role: 'Church planter',
    story:
      'Planting in a new context, with content and frameworks that need to travel. The kind of voice joining the scenius next—where credibility grows through connection to trusted peers.',
  },
  {
    name: 'Researcher',
    role: 'Researcher & Author',
    story:
      'Studying movements and multiplication; writing for practitioners and scholars. The kind of voice joining the scenius next—where ideas are cited and amplified across the network.',
  },
  {
    name: 'Trainer',
    role: 'Trainer & Formator',
    story:
      'Equipping leaders in the room and online. The kind of voice joining the scenius next—where training content becomes discoverable and linked to the movement.',
  },
  {
    name: 'Theologian',
    role: 'Theologian',
    story:
      'Working at the intersection of theology and mission. The kind of voice joining the scenius next—where credibility is distributed through the network, not follower count.',
  },
  {
    name: 'Pastor',
    role: 'Pastor & Author',
    story:
      'Leading a congregation and writing for the wider church. The kind of voice joining the scenius next—where your content moves through the people who already trust you.',
  },
  {
    name: 'Missionary',
    role: 'Missionary',
    story:
      'Sent across cultures; content and reporting that deserve a permanent, linked home. The kind of voice joining the scenius next.',
  },
  {
    name: 'Educator',
    role: 'Educator',
    story:
      'Teaching the next generation of movement leaders. The kind of voice joining the scenius next—where teaching becomes discoverable and part of the collective body of work.',
  },
  {
    name: 'Consultant',
    role: 'Consultant & Strategist',
    story:
      'Advising networks and denominations; thinking that should compound. The kind of voice joining the scenius next—where your expertise is amplified through the network.',
  },
  {
    name: 'Formator',
    role: 'Spiritual Formator',
    story:
      'Guiding others in formation practices. The kind of voice joining the scenius next—where wisdom is shared and linked across the network.',
  },
  {
    name: 'Author',
    role: 'Author & Speaker',
    story:
      'Writing and speaking for the movement. The kind of voice joining the scenius next—where your work is discoverable through trusted peers.',
  },
]

const TARGET_TOTAL_NODES = 100

/** Generate persona nodes to reach target count; spread across tiers 5–12. */
function generatePersonaNodes(): SceniusNode[] {
  const knownCount = KNOWN_NODES.length
  const count = Math.max(0, TARGET_TOTAL_NODES - knownCount)
  const nodes: SceniusNode[] = []
  const tiers = [5, 6, 7, 8, 9, 10, 11, 12]
  let idx = 0
  for (let i = 0; i < count; i++) {
    const tier = tiers[i % tiers.length]
    const roleDef = PERSONA_ROLES[i % PERSONA_ROLES.length]
    const label =
      count <= PERSONA_ROLES.length
        ? roleDef.name
        : `${roleDef.name} ${Math.floor(i / PERSONA_ROLES.length) + 1}`
    nodes.push({
      id: `persona-${idx}`,
      name: label,
      role: roleDef.role,
      tier,
      inNetwork: false,
      personaStory: roleDef.story,
    })
    idx++
  }
  return nodes
}

const PERSONA_NODES = generatePersonaNodes()

/** Links from each persona to 1–2 known nodes so the layout pulls them into the graph. */
function getPersonaLinks(personaNodes: SceniusNode[], knownIds: string[]): SceniusLink[] {
  const links: SceniusLink[] = []
  const anchorIds = knownIds.slice(0, 8) // Alan, Brad, Michael, Deb, Lance, Tim, Dave, Hugh
  personaNodes.forEach((p, i) => {
    const target1 = anchorIds[i % anchorIds.length]
    const target2 = anchorIds[(i + 2) % anchorIds.length]
    links.push({ source: p.id, target: target1, strength: 0.35 })
    if (target2 !== target1) {
      links.push({ source: p.id, target: target2, strength: 0.25 })
    }
  })
  return links
}

/** Compute connection count (degree) for each node from the full link list. */
function attachConnectionCounts(
  nodes: SceniusNode[],
  links: SceniusLink[]
): SceniusNode[] {
  const countById = new Map<string, number>()
  for (const n of nodes) countById.set(n.id, 0)
  for (const l of links) {
    countById.set(l.source, (countById.get(l.source) ?? 0) + 1)
    countById.set(l.target, (countById.get(l.target) ?? 0) + 1)
  }
  return nodes.map((n) => ({
    ...n,
    connectionCount: countById.get(n.id) ?? 0,
  }))
}

// ---------------------------------------------------------------------------
// Assemble full dataset
// ---------------------------------------------------------------------------

const knownIds = KNOWN_NODES.map((n) => n.id)
const personaLinks = getPersonaLinks(PERSONA_NODES, knownIds)
const allLinks = [...KNOWN_LINKS, ...personaLinks]
const allNodes = attachConnectionCounts(
  [...KNOWN_NODES, ...PERSONA_NODES],
  allLinks
)

export const SCENIUS_DATA: SceniusData = {
  nodes: allNodes,
  links: allLinks,
}

/** All tiers present in the data (sorted) */
export const TIERS = [...new Set(SCENIUS_DATA.nodes.map((n) => n.tier))].sort(
  (a, b) => a - b
)

/** Number of tiers */
export const TIER_COUNT = TIERS.length
