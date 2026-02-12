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
    avatarUrl: avatarUrl('Brad Brisco', 'brad-brisco'),
  },
  // Tier 2 — Core co-authors
  {
    id: 'michael-frost',
    name: 'Michael Frost',
    role: 'Theologian',
    organization: 'Morling College',
    bio: 'Missiologist and author exploring incarnational mission and the future of the church.',
    tags: ['theology', 'mission', 'author'],
    tier: 2,
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
    avatarUrl: avatarUrl('Lance Ford', 'lance-ford'),
  },
  {
    id: 'tim-keel',
    name: 'Tim Keel',
    role: 'Pastor & Author',
    bio: 'Pastor and thought leader on faith, culture, and spiritual formation.',
    tags: ['pastoral', 'formation', 'author'],
    tier: 3,
    avatarUrl: avatarUrl('Tim Keel', 'tim-keel'),
  },
  {
    id: 'dave-ferguson',
    name: 'Dave Ferguson',
    role: 'Speaker & Author',
    bio: 'Leadership coach and author on multiplication movements.',
    tags: ['leadership', 'multiplication', 'author'],
    tier: 3,
    avatarUrl: avatarUrl('Dave Ferguson', 'dave-ferguson'),
  },
  {
    id: 'hugh-halter',
    name: 'Hugh Halter',
    role: 'Trainer & Author',
    bio: 'Church planter, author, and trainer focused on incarnational community.',
    tags: ['training', 'church-planting', 'author'],
    tier: 3,
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
    avatarUrl: avatarUrl('Matt Smay', 'matt-smay'),
  },
  {
    id: 'jeff-vanderstelt',
    name: 'Jeff Vanderstelt',
    role: 'Pastor & Author',
    bio: 'Pastor and author focused on gospel-centered community and mission.',
    tags: ['pastoral', 'mission', 'author'],
    tier: 4,
    avatarUrl: avatarUrl('Jeff Vanderstelt', 'jeff-vanderstelt'),
  },
  {
    id: 'steve-addison',
    name: 'Steve Addison',
    role: 'Researcher & Author',
    bio: 'Researcher and author on movements and church multiplication.',
    tags: ['research', 'movements', 'author'],
    tier: 4,
    avatarUrl: avatarUrl('Steve Addison', 'steve-addison'),
  },
  {
    id: 'ori-brafman',
    name: 'Ori Brafman',
    role: 'Author',
    bio: 'Bestselling author on organizational dynamics and decentralized systems.',
    tags: ['leadership', 'author', 'organizations'],
    tier: 4,
    avatarUrl: avatarUrl('Ori Brafman', 'ori-brafman'),
  },
  {
    id: 'eddie-gibbs',
    name: 'Eddie Gibbs',
    role: 'Professor & Author',
    bio: 'Professor emeritus and author on church leadership and emerging churches.',
    tags: ['academic', 'leadership', 'author'],
    tier: 4,
    avatarUrl: avatarUrl('Eddie Gibbs', 'eddie-gibbs'),
  },
  {
    id: 'mindy-caliguire',
    name: 'Mindy Caliguire',
    role: 'Soul Care Expert',
    bio: 'Author and speaker on spiritual formation and soul care practices.',
    tags: ['soul-care', 'formation', 'author'],
    tier: 4,
    avatarUrl: avatarUrl('Mindy Caliguire', 'mindy-caliguire'),
  },
  {
    id: 'mandy-smith',
    name: 'Mandy Smith',
    role: 'Pastor & Author',
    bio: 'Pastor and author exploring the intersection of faith and everyday life.',
    tags: ['pastoral', 'author'],
    tier: 4,
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
    avatarUrl: avatarUrl('Josh Shepherd', 'josh-shepherd'),
  },
  {
    id: 'scott-shepherd',
    name: 'Scott Shepherd',
    role: 'Author',
    bio: 'Author and practitioner in the missional movement space.',
    tags: ['author', 'mission'],
    tier: 4,
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
// Mock Node Generation (tiers 5–12)
// ---------------------------------------------------------------------------

const MOCK_FIRST_NAMES = [
  'James', 'Maria', 'Chen', 'Priya', 'Samuel', 'Fatima', 'Erik', 'Yuki',
  'David', 'Amara', 'Carlos', 'Leah', 'Raj', 'Elena', 'Kwame', 'Sofia',
  'Thomas', 'Ayesha', 'Noah', 'Ingrid', 'Marcus', 'Lina', 'Daniel', 'Rosa',
  'Gabriel', 'Mei', 'Isaac', 'Zara', 'Patrick', 'Nadia', 'Oscar', 'Hana',
  'Victor', 'Thea', 'Adam', 'Freya', 'Simon', 'Kira', 'Leo', 'Anya',
  'Ethan', 'Clara', 'Ryan', 'Dina', 'Nathan', 'Vera', 'Colin', 'Iris',
  'Felix', 'Tara', 'Joel', 'Nora', 'Ian', 'Mila', 'Dylan', 'Sari',
  'Miles', 'Jana', 'Grant', 'Alma', 'Reed', 'Bea', 'Luke', 'Greta',
  'Blake', 'Ines', 'Chase', 'Dawn', 'Troy', 'Fern', 'Wade', 'June',
  'Dean', 'Pearl', 'Kent', 'Ruth', 'Vince', 'Claire', 'Brett', 'Ivy',
  'Drew', 'Joy', 'Keith', 'Hope', 'Glen',
]

const MOCK_LAST_NAMES = [
  'Rivera', 'Kim', 'Patel', 'Okafor', 'Larsen', 'Tanaka', 'Morales', 'Abbas',
  'Chen', 'Santos', 'Park', 'Singh', 'Osei', 'Berg', 'Nakamura', 'Costa',
  'Amir', 'Johansson', 'Gupta', 'Bello', 'Olsen', 'Haddad', 'Zheng', 'Diaz',
  'Raman', 'Yilmaz', 'Petrov', 'Nkosi', 'Haugen', 'Sato', 'Reyes', 'Chowdhury',
  'Bakker', 'Ito', 'Torres', 'Ansari', 'Lindberg', 'Takahashi', 'Mendez', 'Nair',
  'Hansen', 'Watanabe', 'Flores', 'Sharma', 'Mwangi', 'Lund', 'Yamamoto', 'Cruz',
  'Khan', 'Svenson', 'Fujita', 'Gomez', 'Obi', 'Holm', 'Sakai', 'Ortiz',
  'Biswas', 'Strand', 'Morita', 'Vargas', 'Nwosu', 'Dahl', 'Endo', 'Romero',
  'Kapoor', 'Nilsen', 'Ueda', 'Ruiz', 'Adekunle', 'Nyström', 'Ishii', 'Vega',
  'Bose', 'Aalto', 'Kaneko', 'Herrera', 'Eze', 'Falk', 'Mori', 'Castillo',
  'Reddy', 'Laine', 'Inoue', 'Navarro', 'Chukwu',
]

const MOCK_ROLES = [
  'Pastor', 'Researcher', 'Church Planter', 'Author', 'Educator',
  'Community Organizer', 'Missionary', 'Theologian', 'Nonprofit Director',
  'Trainer', 'Speaker', 'Consultant', 'Campus Minister', 'Youth Leader',
  'Worship Leader', 'Social Entrepreneur', 'Ministry Director',
]

const MOCK_ORGS = [
  'City Movement Church', 'Kingdom Networks', 'Soma Communities', 'Verge Network',
  'Missio Alliance', 'Fresh Expressions', 'V3 Movement', 'Redeemer Network',
  'Saturate', 'The Underground', 'Exponential', 'Upstream Collective',
  'Praxis Labs', 'Barna Group', 'Q Ideas', 'Gospel Coalition',
]

const MOCK_TAGS_POOL = [
  'mission', 'theology', 'leadership', 'church-planting', 'justice',
  'formation', 'community', 'multiplication', 'discipleship', 'culture',
  'urban', 'rural', 'global', 'digital', 'arts', 'education', 'youth',
]

/** Deterministic pseudo-random from seed for consistent layouts */
function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function generateMockNodes(): SceniusNode[] {
  const rand = seededRandom(42)
  const nodes: SceniusNode[] = []

  // Tiers 5-12, ~10 nodes per tier = 80 mock nodes
  // Distribute across 8 tiers
  const TIER_SIZES = [10, 10, 10, 10, 10, 10, 10, 13] // total = 83
  let nameIdx = 0

  for (let tierOffset = 0; tierOffset < TIER_SIZES.length; tierOffset++) {
    const tier = tierOffset + 5
    const count = TIER_SIZES[tierOffset]

    for (let i = 0; i < count; i++) {
      const first = MOCK_FIRST_NAMES[nameIdx % MOCK_FIRST_NAMES.length]
      const last = MOCK_LAST_NAMES[nameIdx % MOCK_LAST_NAMES.length]
      const id = `mock-${nameIdx}`
      const role = MOCK_ROLES[Math.floor(rand() * MOCK_ROLES.length)]
      const org = rand() > 0.4 ? MOCK_ORGS[Math.floor(rand() * MOCK_ORGS.length)] : undefined
      const tagCount = 1 + Math.floor(rand() * 3)
      const tags: string[] = []
      for (let t = 0; t < tagCount; t++) {
        const tag = MOCK_TAGS_POOL[Math.floor(rand() * MOCK_TAGS_POOL.length)]
        if (!tags.includes(tag)) tags.push(tag)
      }

      const fullName = `${first} ${last}`
      nodes.push({
        id,
        name: fullName,
        role,
        organization: org,
        bio: `${role} contributing to the missional movement network.`,
        tags,
        tier,
        avatarUrl: avatarUrl(fullName, id),
      })

      nameIdx++
    }
  }

  return nodes
}

function generateMockLinks(mockNodes: SceniusNode[], knownIds: string[]): SceniusLink[] {
  const rand = seededRandom(7777)
  const links: SceniusLink[] = []

  for (const node of mockNodes) {
    // Each mock node connects to 1-2 known authors
    const knownCount = 1 + Math.floor(rand() * 2)
    const usedKnown = new Set<string>()
    for (let k = 0; k < knownCount; k++) {
      const known = knownIds[Math.floor(rand() * knownIds.length)]
      if (!usedKnown.has(known)) {
        links.push({
          source: node.id,
          target: known,
          strength: 0.2 + rand() * 0.4,
        })
        usedKnown.add(known)
      }
    }

    // Each mock node connects to 1-2 other mock nodes in nearby tiers
    const peerCount = 1 + Math.floor(rand() * 2)
    const candidates = mockNodes.filter(
      (n) => n.id !== node.id && Math.abs(n.tier - node.tier) <= 1
    )
    for (let p = 0; p < Math.min(peerCount, candidates.length); p++) {
      const peer = candidates[Math.floor(rand() * candidates.length)]
      // Avoid duplicate links
      const exists = links.some(
        (l) =>
          (l.source === node.id && l.target === peer.id) ||
          (l.source === peer.id && l.target === node.id)
      )
      if (!exists) {
        links.push({
          source: node.id,
          target: peer.id,
          strength: 0.15 + rand() * 0.3,
        })
      }
    }
  }

  return links
}

// ---------------------------------------------------------------------------
// Assemble full dataset
// ---------------------------------------------------------------------------

const mockNodes = generateMockNodes()
const knownIds = KNOWN_NODES.map((n) => n.id)
const mockLinks = generateMockLinks(mockNodes, knownIds)

export const SCENIUS_DATA: SceniusData = {
  nodes: [...KNOWN_NODES, ...mockNodes],
  links: [...KNOWN_LINKS, ...mockLinks],
}

/** All tiers present in the data (sorted) */
export const TIERS = [...new Set(SCENIUS_DATA.nodes.map((n) => n.tier))].sort(
  (a, b) => a - b
)

/** Number of tiers */
export const TIER_COUNT = TIERS.length
