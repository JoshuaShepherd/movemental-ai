// ---------------------------------------------------------------------------
// Linking Visualizations — Mock Data
// ---------------------------------------------------------------------------

import type {
  Leader,
  Article,
  LinkSuggestion,
  CalendarEvent,
  LinkingAction,
  Nudge,
  DigestItem,
  TopicContent,
} from './types'

// ---------------------------------------------------------------------------
// Leaders — Real names from the scenius network
// ---------------------------------------------------------------------------

export const LEADERS: Leader[] = [
  {
    id: 'alan-hirsch',
    name: 'Alan Hirsch',
    role: 'Missional Strategist',
    org: 'Forge International',
    initials: 'AH',
    color: '#6e916e', // sage
  },
  {
    id: 'brad-brisco',
    name: 'Brad Brisco',
    role: 'Multiplication Strategist',
    org: 'Send Network',
    initials: 'BB',
    color: '#cb3437', // scarlet rush
  },
  {
    id: 'michael-frost',
    name: 'Michael Frost',
    role: 'Theologian & Missiologist',
    org: 'Morling College',
    initials: 'MF',
    color: '#8c50af', // velvet orchid
  },
  {
    id: 'tim-catchim',
    name: 'Tim Catchim',
    role: 'APEST Practitioner',
    org: '5Q',
    initials: 'TC',
    color: '#4a7a8c', // teal accent
  },
  {
    id: 'jr-woodward',
    name: 'JR Woodward',
    role: 'National Director',
    org: 'V3 Movement',
    initials: 'JW',
    color: '#b8860b', // gold accent
  },
  {
    id: 'lance-ford',
    name: 'Lance Ford',
    role: 'Author & Consultant',
    org: 'Shapevine',
    initials: 'LF',
    color: '#8b6e5a', // warm brown
  },
]

export const getLeader = (id: string): Leader =>
  LEADERS.find((l) => l.id === id) ?? LEADERS[0]

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Understanding mDNA: The Genetic Code of Movements',
    leaderId: 'alan-hirsch',
    theme: 'mDNA',
    excerpt:
      'Every significant movement in history carries a core set of ideas — a missional DNA — that defines its identity and drives its growth.',
    date: '2025-01-15',
  },
  {
    id: 'art-2',
    title: 'Multiplication Through Missional Engagement',
    leaderId: 'brad-brisco',
    theme: 'multiplication',
    excerpt:
      'Church multiplication is not a strategy but a natural overflow of missional engagement in neighborhoods and networks.',
    date: '2025-01-18',
  },
  {
    id: 'art-3',
    title: 'Incarnational Presence in Post-Christendom',
    leaderId: 'michael-frost',
    theme: 'incarnational',
    excerpt:
      'The shift from attractional to incarnational models demands we rethink how leaders show up in their communities.',
    date: '2025-01-20',
  },
  {
    id: 'art-4',
    title: 'The Apostolic Function in the 21st Century',
    leaderId: 'tim-catchim',
    theme: 'APEST',
    excerpt:
      'Reclaiming the apostolic function means moving beyond institutional roles into movement-generating capacities.',
    date: '2025-01-22',
  },
  {
    id: 'art-5',
    title: 'Polycentric Leadership for Network Churches',
    leaderId: 'jr-woodward',
    theme: 'leadership',
    excerpt:
      'Polycentric leadership distributes authority across a network of gifted individuals rather than centralizing it.',
    date: '2025-01-25',
  },
  {
    id: 'art-6',
    title: 'Organic Systems and Adaptive Movements',
    leaderId: 'lance-ford',
    theme: 'organic',
    excerpt:
      'Movements thrive on organic structures that adapt to context rather than rigid institutional frameworks.',
    date: '2025-01-28',
  },
  {
    id: 'art-7',
    title: 'Communitas: The Bond Forged in Mission',
    leaderId: 'alan-hirsch',
    theme: 'communitas',
    excerpt:
      'Communitas emerges when a group faces a shared challenge together — it is the deepest form of community.',
    date: '2025-02-01',
  },
  {
    id: 'art-8',
    title: 'From Christendom to Movement: A Paradigm Shift',
    leaderId: 'michael-frost',
    theme: 'mDNA',
    excerpt:
      'Transitioning from Christendom thinking to movement thinking requires a fundamental reorientation of ecclesiology.',
    date: '2025-02-03',
  },
  {
    id: 'art-9',
    title: 'The Five-Fold Ministry in Missional Context',
    leaderId: 'tim-catchim',
    theme: 'APEST',
    excerpt:
      'When APEST functions are activated in missional settings, the whole body develops capacity for adaptive challenge.',
    date: '2025-02-05',
  },
  {
    id: 'art-10',
    title: 'Planting Networks, Not Just Churches',
    leaderId: 'brad-brisco',
    theme: 'multiplication',
    excerpt:
      'The future of multiplication lies in planting interconnected networks that share resources and learning.',
    date: '2025-02-07',
  },
]

// ---------------------------------------------------------------------------
// Link Suggestions (for publish-time panel)
// ---------------------------------------------------------------------------

export const LINK_SUGGESTIONS: LinkSuggestion[] = [
  {
    id: 'sug-1',
    articleId: 'art-2',
    leaderId: 'brad-brisco',
    relevance: 92,
    reason:
      'Brad\'s "Multiplication Through Missional Engagement" directly addresses the mDNA framework you reference in paragraph 3.',
    type: 'auto-applied',
  },
  {
    id: 'sug-2',
    articleId: 'art-3',
    leaderId: 'michael-frost',
    relevance: 85,
    reason:
      'Frost\'s incarnational model provides the practical application layer for your theoretical framework.',
    type: 'auto-applied',
  },
  {
    id: 'sug-3',
    articleId: 'art-4',
    leaderId: 'tim-catchim',
    relevance: 78,
    reason:
      'Catchim\'s APEST work complements your mDNA concept — apostolic function is one of the six elements.',
    type: 'suggested',
  },
  {
    id: 'sug-4',
    articleId: 'art-5',
    leaderId: 'jr-woodward',
    relevance: 71,
    reason:
      'Woodward\'s polycentric leadership model illustrates how mDNA distributes through a movement network.',
    type: 'suggested',
  },
  {
    id: 'sug-5',
    articleId: 'art-6',
    leaderId: 'lance-ford',
    relevance: 65,
    reason:
      'Ford\'s organic systems thinking provides a structural parallel to your biological mDNA metaphor.',
    type: 'suggested',
  },
]

// ---------------------------------------------------------------------------
// Calendar Events (one month: February 2025)
// ---------------------------------------------------------------------------

export const EVENTS: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'mDNA Deep Dive Workshop',
    leaderId: 'alan-hirsch',
    date: '2025-02-03',
    type: 'workshop',
  },
  {
    id: 'evt-2',
    title: 'Multiplication Strategies Webinar',
    leaderId: 'brad-brisco',
    date: '2025-02-05',
    type: 'webinar',
  },
  {
    id: 'evt-3',
    title: 'Incarnational Mission Seminar',
    leaderId: 'michael-frost',
    date: '2025-02-05',
    type: 'workshop',
  },
  {
    id: 'evt-4',
    title: 'APEST Assessment Lab',
    leaderId: 'tim-catchim',
    date: '2025-02-08',
    type: 'workshop',
  },
  {
    id: 'evt-5',
    title: 'V3 Network Gathering',
    leaderId: 'jr-woodward',
    date: '2025-02-10',
    type: 'conference',
  },
  {
    id: 'evt-6',
    title: 'Organic Church Planting Webinar',
    leaderId: 'lance-ford',
    date: '2025-02-12',
    type: 'webinar',
  },
  {
    id: 'evt-7',
    title: 'Forge + 5Q Joint Session on Apostolic Ministry',
    leaderId: 'alan-hirsch',
    date: '2025-02-14',
    type: 'joint',
    jointLeaderId: 'tim-catchim',
  },
  {
    id: 'evt-8',
    title: 'Missional Ecclesiology Lecture',
    leaderId: 'michael-frost',
    date: '2025-02-17',
    type: 'webinar',
  },
  {
    id: 'evt-9',
    title: 'Network Multiplication Lab',
    leaderId: 'brad-brisco',
    date: '2025-02-19',
    type: 'workshop',
  },
  {
    id: 'evt-10',
    title: 'Communitas Formation Workshop',
    leaderId: 'alan-hirsch',
    date: '2025-02-19',
    type: 'workshop',
  },
  {
    id: 'evt-11',
    title: 'Polycentric Leadership Conference',
    leaderId: 'jr-woodward',
    date: '2025-02-22',
    type: 'conference',
  },
  {
    id: 'evt-12',
    title: 'Movement Architecture Review',
    leaderId: 'lance-ford',
    date: '2025-02-26',
    type: 'webinar',
  },
]

// ---------------------------------------------------------------------------
// Linking Actions (ranked by impact score)
// ---------------------------------------------------------------------------

export const LINKING_ACTIONS: LinkingAction[] = [
  { id: 'la-1', label: 'Cross-Tenant Citations', score: 87, rank: 1, category: 'content' },
  { id: 'la-2', label: 'Pillar-Cluster Topology', score: 84, rank: 2, category: 'seo' },
  { id: 'la-3', label: 'Publish-Time Suggestions', score: 82, rank: 3, category: 'content' },
  { id: 'la-4', label: 'Related from Network Widget', score: 79, rank: 4, category: 'content' },
  { id: 'la-5', label: 'Network Calendar Sync', score: 76, rank: 5, category: 'engagement' },
  { id: 'la-6', label: 'Co-Authorship Flow', score: 79, rank: 6, category: 'collaboration' },
  { id: 'la-7', label: 'Contextual Nudges', score: 73, rank: 7, category: 'engagement' },
  { id: 'la-8', label: 'Tag Aggregation Pages', score: 70, rank: 8, category: 'seo' },
  { id: 'la-9', label: 'Network Digest', score: 68, rank: 9, category: 'engagement' },
  { id: 'la-10', label: 'Impact Dashboard', score: 62, rank: 10, category: 'analytics' },
]

// ---------------------------------------------------------------------------
// Nudges
// ---------------------------------------------------------------------------

export const NUDGES: Nudge[] = [
  {
    id: 'nudge-1',
    icon: 'Bell',
    message: 'Brad published on this theme yesterday',
    action: 'View Article',
  },
  {
    id: 'nudge-2',
    icon: 'Link',
    message: '3 network articles align with this module',
    action: 'See Matches',
  },
  {
    id: 'nudge-3',
    icon: 'TrendingUp',
    message: 'mDNA trending across the network',
    action: 'Explore Trend',
  },
  {
    id: 'nudge-4',
    icon: 'UserPlus',
    message: 'Tim Catchim just published related content',
    action: 'Link Content',
  },
]

// ---------------------------------------------------------------------------
// Digest Items
// ---------------------------------------------------------------------------

export const DIGEST_ITEMS: DigestItem[] = [
  {
    id: 'dig-1',
    section: 'linked-by',
    title: 'Multiplication Through Missional Engagement',
    leaderId: 'brad-brisco',
    description: 'Brad cited your mDNA framework in his latest article',
  },
  {
    id: 'dig-2',
    section: 'linked-by',
    title: 'Incarnational Presence in Post-Christendom',
    leaderId: 'michael-frost',
    description: 'Frost referenced your communitas concept',
  },
  {
    id: 'dig-3',
    section: 'linked-by',
    title: 'The Five-Fold Ministry in Missional Context',
    leaderId: 'tim-catchim',
    description: 'Catchim linked to your APEST overview',
  },
  {
    id: 'dig-4',
    section: 'new-in-themes',
    title: 'Rethinking Church Planting Models',
    leaderId: 'lance-ford',
    description: 'New perspective on organic multiplication',
  },
  {
    id: 'dig-5',
    section: 'new-in-themes',
    title: 'Network Effects in Ministry',
    leaderId: 'jr-woodward',
    description: 'How V3 is leveraging network thinking',
  },
  {
    id: 'dig-6',
    section: 'new-in-themes',
    title: 'Beyond Attractional: A Missional Paradigm',
    leaderId: 'michael-frost',
    description: 'Fresh take on incarnational models',
  },
  {
    id: 'dig-7',
    section: 'suggested-collabs',
    title: 'Joint Article: APEST + mDNA',
    leaderId: 'tim-catchim',
    description: 'Explore the intersection of APEST functions and mDNA elements',
  },
  {
    id: 'dig-8',
    section: 'suggested-collabs',
    title: 'Co-authored Series: Movement Multiplication',
    leaderId: 'brad-brisco',
    description: 'Combine multiplication strategy with movement theory',
  },
]

// ---------------------------------------------------------------------------
// Topic/Tag Content (cross-tenant aggregation)
// ---------------------------------------------------------------------------

export const TOPIC_CONTENT: TopicContent[] = [
  {
    id: 'tc-1',
    title: 'Understanding mDNA: The Genetic Code of Movements',
    leaderId: 'alan-hirsch',
    theme: 'mDNA',
    type: 'article',
    excerpt: 'Every significant movement carries a missional DNA that defines its identity.',
  },
  {
    id: 'tc-2',
    title: 'From Christendom to Movement: A Paradigm Shift',
    leaderId: 'michael-frost',
    theme: 'mDNA',
    type: 'article',
    excerpt: 'Transitioning from Christendom thinking to movement thinking.',
  },
  {
    id: 'tc-3',
    title: 'mDNA in Practice: 5Q Application',
    leaderId: 'tim-catchim',
    theme: 'mDNA',
    type: 'video',
    excerpt: 'How the APEST framework activates mDNA in local contexts.',
  },
  {
    id: 'tc-4',
    title: 'Movement DNA and Network Multiplication',
    leaderId: 'brad-brisco',
    theme: 'mDNA',
    type: 'podcast',
    excerpt: 'Exploring how mDNA replicates through multiplication networks.',
  },
  {
    id: 'tc-5',
    title: 'Organic Expressions of mDNA',
    leaderId: 'lance-ford',
    theme: 'mDNA',
    type: 'article',
    excerpt: 'How organic church structures naturally express movement DNA.',
  },
  {
    id: 'tc-6',
    title: 'Polycentric mDNA Distribution',
    leaderId: 'jr-woodward',
    theme: 'mDNA',
    type: 'course',
    excerpt: 'A course on distributing mDNA through polycentric leadership.',
  },
]
