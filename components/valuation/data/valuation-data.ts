// Valuation page data - all numbers are hardcoded per requirements

export const pricingCohorts = [
  { range: '1–25', leaders: '1–25 leaders', fee: 1000, feeDisplay: '$1,000', revShare: '10%', status: 'current' as const },
  { range: '26–50', leaders: '26–50 leaders', fee: 2000, feeDisplay: '$2,000', revShare: '10%', status: 'future' as const },
  { range: '51–75', leaders: '51–75 leaders', fee: 3000, feeDisplay: '$3,000', revShare: '10%', status: 'future' as const },
  { range: '76–100', leaders: '76–100 leaders', fee: 4000, feeDisplay: '$4,000', revShare: '10%', status: 'future' as const },
]

export const languageRevenueEstimates = [
  { language: 'English', revenue: 50000, included: true, note: 'Primary market' },
  { language: 'Spanish (Latin America)', revenue: 20000, included: true, note: 'Launch language' },
  { language: 'Portuguese (Brazil)', revenue: 15000, included: true, note: 'Launch language' },
  { language: 'German', revenue: 15000, included: false, note: 'Expansion' },
  { language: 'French', revenue: 10000, included: false, note: 'Expansion' },
]

export const alanLaunchConfig = {
  name: 'Alan Hirsch',
  role: 'Flagship Creator',
  assets: [
    { type: 'Books', description: 'All books as digital e-reader versions' },
    { type: 'AI Companion', description: 'Chatbots with access to entire corpus' },
    { type: 'Articles', description: '100 core articles (new)' },
    { type: 'Courses', description: '5 digital courses' },
  ],
  languages: ['English', 'Latin American Spanish', 'Brazilian Portuguese'],
  includes: ['Full dashboard', 'Platform stack', 'Analytics'],
}

export const bradLaunchConfig = {
  name: 'Brad Brisco',
  role: 'Second Creator',
  assets: [
    { type: 'Books', description: 'Digital e-reader versions' },
    { type: 'AI Companion', description: 'Chatbot with corpus access' },
    { type: 'Articles', description: 'Core articles library' },
    { type: 'Courses', description: 'Digital courses' },
  ],
  languages: ['English', 'Spanish', 'Portuguese'],
  includes: ['Full dashboard', 'Platform stack', 'Analytics'],
}

export const yearOneProjection = {
  // Cohort fees (25 leaders × $1,000 + some at higher tiers)
  platformFees: {
    value: 50000,
    label: 'Platform Fees (Non-Recurring)',
    breakdown: '25 leaders at $1k–$4k tiers',
    isRecurring: false,
  },
  // Revenue share from creator earnings
  revenueShare: {
    value: 750000,
    label: 'Revenue Share (Recurring)',
    breakdown: '10% of ~$7.5M creator revenue',
    isRecurring: true,
  },
  // Total ARR (only recurring portion)
  totalARR: {
    value: 800000,
    label: 'Year One ARR Target',
    note: 'Base case, aggressive but realistic',
  },
}

export const valuationMultiples = {
  low: 6,
  mid: 9,
  high: 12,
  basis: 'Early-stage SaaS with network effects',
}

export const milestones = [
  {
    id: 'now',
    label: 'Now',
    quarter: 'Q1 2026',
    description: 'Pre-launch, platforms almost ready',
    users: 0,
    arrLow: 0,
    arrHigh: 0,
    valuationLow: 2000000,
    valuationHigh: 5000000,
    confidence: 'Medium' as const,
    keyPoints: ['Platform built', 'Alan & Brad digitized', 'Ready to launch'],
  },
  {
    id: 'alan-live',
    label: 'Alan Live',
    quarter: 'Q2 2026',
    description: 'Flagship creator launches',
    users: 1,
    arrLow: 50000,
    arrHigh: 100000,
    valuationLow: 3000000,
    valuationHigh: 6000000,
    confidence: 'Medium' as const,
    keyPoints: ['First revenue', '3-language launch', 'Proof of concept'],
  },
  {
    id: 'brad-live',
    label: 'Brad Live',
    quarter: 'Q2 2026',
    description: 'Second creator validates model',
    users: 2,
    arrLow: 100000,
    arrHigh: 180000,
    valuationLow: 4000000,
    valuationHigh: 8000000,
    confidence: 'Medium-High' as const,
    keyPoints: ['Model replicated', 'Two revenue streams', 'Process refined'],
  },
  {
    id: '25-leaders',
    label: '25 Leaders',
    quarter: 'Q4 2026',
    description: 'First cohort complete',
    users: 25,
    arrLow: 400000,
    arrHigh: 600000,
    valuationLow: 6000000,
    valuationHigh: 12000000,
    confidence: 'High' as const,
    keyPoints: ['Network effects begin', 'Cohort 1 locked', 'Pricing escalates'],
  },
  {
    id: '100-leaders',
    label: '100 Leaders',
    quarter: 'Q4 2027',
    description: 'Program closes to new enrollment',
    users: 100,
    arrLow: 750000,
    arrHigh: 900000,
    valuationLow: 9000000,
    valuationHigh: 18000000,
    confidence: 'High' as const,
    keyPoints: ['Full network effects', 'Program closed', 'Premium position'],
  },
]

export const whyThisHoldsPoints = [
  {
    icon: 'Users' as const,
    title: 'Clear ICP',
    description: 'Movement leaders with existing content and audiences',
  },
  {
    icon: 'Share2' as const,
    title: 'Trust-Based Distribution',
    description: 'Direct outreach and referrals, not paid acquisition',
  },
  {
    icon: 'Network' as const,
    title: 'Network Amplification',
    description: 'Scenius linking multiplies reach across the network',
  },
  {
    icon: 'Shield' as const,
    title: 'High-Touch at Low Scale',
    description: 'Max 100 leaders ensures quality service',
  },
  {
    icon: 'Globe' as const,
    title: 'Language Leverage',
    description: 'Each leader expands into 3–5 language markets',
  },
  {
    icon: 'Lock' as const,
    title: 'Scarcity by Design',
    description: 'Closed enrollment protects network integrity',
  },
]

export const arrComponents = {
  recurring: [
    { name: '10% Revenue Share', description: 'Ongoing percentage of creator platform revenue', isARR: true },
  ],
  nonRecurring: [
    { name: 'Platform Fees', description: 'One-time setup fee per leader ($1k–$4k)', isARR: false },
  ],
}

// Helper to format currency
export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}k`
  }
  return `$${value.toLocaleString()}`
}

// Helper to format valuation range
export function formatValuationRange(low: number, high: number): string {
  return `${formatCurrency(low)} – ${formatCurrency(high)}`
}
