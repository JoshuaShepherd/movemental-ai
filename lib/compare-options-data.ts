/**
 * Movemental vs Agency vs SaaS comparison data.
 * Used on /compare and in How It Works.
 * Sources: _docs/site-docs/compare-options-sources.md
 */

export type CompareRow = {
  category: string
  feature: string
  movemental: string | true
  agency: string | true | false
  saas: string | true | false
  note?: string
}

export const COMPARE_OPTIONS_ROWS: CompareRow[] = [
  // ——— Cost & pricing ———
  {
    category: 'Cost & pricing',
    feature: 'Upfront cost',
    movemental: '$1,000',
    agency: '~$175,000',
    saas: '$0',
    note: 'Agency: typical custom platform $50K–$150K+ (Clutch, GoodFirms). SaaS: monthly only.',
  },
  {
    category: 'Cost & pricing',
    feature: 'Ongoing cost',
    movemental: '10% of your content revenue',
    agency: '10–20% of build cost/year (maintenance)',
    saas: '$39–$399/mo + 0–7.5% transaction fees',
    note: 'Teachable 7.5% on Starter; Thinkific 0% on paid plans. Payment processing ~2.9%+$0.30 separate.',
  },
  {
    category: 'Cost & pricing',
    feature: 'Revenue you keep',
    movemental: '90%',
    agency: '100% (after large upfront)',
    saas: '~70–85% (after fees)',
    note: 'Publishers ~10%; platforms take fees + processing.',
  },
  {
    category: 'Cost & pricing',
    feature: 'Time to launch',
    movemental: '3–4 weeks',
    agency: '6–12 months',
    saas: 'Days (self-setup)',
    note: 'Agency: Clutch avg 9 months. Movemental: from fit to live.',
  },
  // ——— Digital playbook ———
  {
    category: 'Digital playbook',
    feature: 'Content pipeline (existing → evergreen → courses → circulation)',
    movemental: true,
    agency: false,
    saas: false,
  },
  {
    category: 'Digital playbook',
    feature: 'One home (single hub for you + work + network)',
    movemental: true,
    agency: 'Only if scoped',
    saas: 'Subdomain or add-on domain',
    note: "SaaS: you're on their platform, not a true owned home.",
  },
  {
    category: 'Digital playbook',
    feature: 'Author legibility (E-E-A-T, who you are + who points to you)',
    movemental: true,
    agency: 'If included in scope',
    saas: false,
    note: 'Movemental is built for credibility amplification.',
  },
  {
    category: 'Digital playbook',
    feature: 'Content as nodes (findable, linked, structured)',
    movemental: true,
    agency: 'If SEO/strategy included',
    saas: 'Courses only; no movement-wide graph',
    note: 'SaaS focuses on course catalog, not credibility graph.',
  },
  {
    category: 'Digital playbook',
    feature: 'Voice-preserving AI (your body of work, not generic)',
    movemental: true,
    agency: false,
    saas: 'Generic AI tools',
    note: 'Movemental: AI amplifies your voice; SaaS: generic assistants.',
  },
  // ——— Platform ———
  {
    category: 'Platform',
    feature: 'You own the platform',
    movemental: true,
    agency: true,
    saas: false,
    note: 'Agency: you own what they build. SaaS: you rent.',
  },
  {
    category: 'Platform',
    feature: 'Custom domain',
    movemental: true,
    agency: true,
    saas: 'Often (sometimes extra)',
    note: 'Thinkific/Teachable/Kajabi support custom domain.',
  },
  {
    category: 'Platform',
    feature: 'Books, articles, courses in one place',
    movemental: true,
    agency: 'If scoped',
    saas: 'Courses + maybe blog',
    note: 'SaaS is course-first; articles/blog vary by product.',
  },
  {
    category: 'Platform',
    feature: 'You own audience data',
    movemental: true,
    agency: true,
    saas: false,
    note: 'SaaS: platform controls list and behavior data.',
  },
  {
    category: 'Platform',
    feature: 'No algorithm dependency (your site, your rules)',
    movemental: true,
    agency: true,
    saas: false,
    note: 'SaaS: discovery and reach depend on platform algorithms.',
  },
  // ——— Network & scenius ———
  {
    category: 'Network & scenius',
    feature: 'Peer network of movement leaders',
    movemental: true,
    agency: false,
    saas: false,
  },
  {
    category: 'Network & scenius',
    feature: 'Cross-promotion & shared discovery',
    movemental: true,
    agency: false,
    saas: false,
    note: "SaaS: you compete with other creators on same platform.",
  },
  {
    category: 'Network & scenius',
    feature: 'Credibility graph (who points to you, visible)',
    movemental: true,
    agency: false,
    saas: false,
  },
  {
    category: 'Network & scenius',
    feature: 'Scenius: Alan, Brad, and the people in it',
    movemental: true,
    agency: false,
    saas: false,
    note: "The most valuable part—only with Movemental.",
  },
  {
    category: 'Network & scenius',
    feature: 'Bounded ecology (curated, not a marketplace)',
    movemental: true,
    agency: false,
    saas: false,
    note: 'Movemental: ~100 leaders, mutual elevation. SaaS: open marketplace.',
  },
  // ——— Launch & support ———
  {
    category: 'Launch & support',
    feature: 'Phased onboarding (Discovery → Research → Build → Launch)',
    movemental: true,
    agency: 'Similar (project phases)',
    saas: false,
    note: 'SaaS: self-serve setup; no movement-specific process.',
  },
  {
    category: 'Launch & support',
    feature: 'Content migration from existing work',
    movemental: true,
    agency: 'If scoped',
    saas: 'Manual / limited',
    note: 'Movemental: AI-assisted from your sermons, talks, writing.',
  },
  {
    category: 'Launch & support',
    feature: 'Launch with content live (not empty templates)',
    movemental: true,
    agency: 'If scoped',
    saas: 'You fill it yourself',
    note: 'Movemental: platform launches with your content.',
  },
  {
    category: 'Launch & support',
    feature: 'Network onboarding (meet the scenius)',
    movemental: true,
    agency: false,
    saas: false,
  },
]
