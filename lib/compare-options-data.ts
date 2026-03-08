/**
 * Movemental vs Agency vs Course platforms vs Substack comparison data.
 * Used on /compare and in How It Works.
 * Sources: _docs/site-docs/compare-options-sources.md
 */

export type CompareRow = {
  category: string
  feature: string
  movemental: string | true
  agency: string | true | false
  coursePlatforms: string | true | false
  substack: string | true | false
  note?: string
}

export const COMPARE_OPTIONS_ROWS: CompareRow[] = [
  // ——— Cost & pricing ———
  {
    category: 'Cost & pricing',
    feature: 'Upfront cost',
    movemental: '$1,000',
    agency: '~$175,000',
    coursePlatforms: '$0',
    substack: '$0',
    note: 'Agency: typical custom platform $50K–$150K+ (Clutch, GoodFirms). Course SaaS: monthly only. Substack: free to publish.',
  },
  {
    category: 'Cost & pricing',
    feature: 'Ongoing cost',
    movemental: '10% of your content revenue',
    agency: '10–20% of build cost/year (maintenance)',
    coursePlatforms: '$39–$399/mo + 0–7.5% transaction fees',
    substack: '10% of paid subscriptions + Stripe fees',
    note: 'Teachable 7.5% on Starter; Thinkific 0% on paid plans. Substack: 10% + 2.9%+$0.30 per transaction.',
  },
  {
    category: 'Cost & pricing',
    feature: 'Revenue you keep',
    movemental: '90%',
    agency: '100% (after large upfront)',
    coursePlatforms: '~70–85% (after fees)',
    substack: '~85–87% (after fees)',
    note: 'Substack and Movemental both take 10%; Substack adds Stripe. Publishers ~10%.',
  },
  {
    category: 'Cost & pricing',
    feature: 'Time to launch',
    movemental: '3–4 weeks',
    agency: '6–12 months',
    coursePlatforms: 'Days (self-setup)',
    substack: 'Minutes',
    note: 'Agency: Clutch avg 9 months. Movemental: from fit to live.',
  },
  // ——— Digital playbook ———
  {
    category: 'Digital playbook',
    feature: 'Content pipeline (existing → evergreen → courses → circulation)',
    movemental: true,
    agency: false,
    coursePlatforms: false,
    substack: false,
  },
  {
    category: 'Digital playbook',
    feature: 'One home (single hub for you + work + network)',
    movemental: true,
    agency: 'Only if scoped',
    coursePlatforms: 'Subdomain or add-on domain',
    substack: 'Subdomain or custom domain',
    note: "Course SaaS and Substack: you're on their platform, not a true owned home.",
  },
  {
    category: 'Digital playbook',
    feature: 'Author legibility (E-E-A-T, who you are + who points to you)',
    movemental: true,
    agency: 'If included in scope',
    coursePlatforms: false,
    substack: false,
    note: 'Movemental is built for credibility amplification.',
  },
  {
    category: 'Digital playbook',
    feature: 'Content as nodes (findable, linked, structured)',
    movemental: true,
    agency: 'If SEO/strategy included',
    coursePlatforms: 'Courses only; no movement-wide graph',
    substack: 'Newsletter/articles only; no credibility graph',
    note: 'Course SaaS focuses on catalog; Substack on feed. Movemental builds a graph.',
  },
  {
    category: 'Digital playbook',
    feature: 'Voice-preserving AI (your body of work, not generic)',
    movemental: true,
    agency: false,
    coursePlatforms: 'Generic AI tools',
    substack: false,
    note: 'Movemental: AI amplifies your voice; others: generic assistants or none.',
  },
  // ——— Platform ———
  {
    category: 'Platform',
    feature: 'You own the platform',
    movemental: true,
    agency: true,
    coursePlatforms: false,
    substack: false,
    note: 'Agency: you own what they build. Course SaaS and Substack: you rent.',
  },
  {
    category: 'Platform',
    feature: 'Custom domain',
    movemental: true,
    agency: true,
    coursePlatforms: 'Often (sometimes extra)',
    substack: true,
    note: 'Thinkific/Teachable/Kajabi/Substack support custom domain.',
  },
  {
    category: 'Platform',
    feature: 'Books, articles, courses in one place',
    movemental: true,
    agency: 'If scoped',
    coursePlatforms: 'Courses + maybe blog',
    substack: 'Newsletter/articles only',
    note: 'Substack is newsletter-first; no courses or books as products.',
  },
  {
    category: 'Platform',
    feature: 'You own audience data',
    movemental: true,
    agency: true,
    coursePlatforms: false,
    substack: 'Can export emails',
    note: 'Course SaaS: platform controls list. Substack: you can export subscriber emails.',
  },
  {
    category: 'Platform',
    feature: 'No algorithm dependency (your site, your rules)',
    movemental: true,
    agency: true,
    coursePlatforms: false,
    substack: false,
    note: 'Substack: Recommendations and discovery are algorithm-driven.',
  },
  // ——— Network & scenius ———
  {
    category: 'Network & scenius',
    feature: 'Peer network of movement leaders',
    movemental: true,
    agency: false,
    coursePlatforms: false,
    substack: false,
  },
  {
    category: 'Network & scenius',
    feature: 'Cross-promotion & shared discovery',
    movemental: true,
    agency: false,
    coursePlatforms: false,
    substack: 'Recommendations (algorithm-driven)',
    note: "Course SaaS: you compete. Substack: discovery via their algorithm, not relational.",
  },
  {
    category: 'Network & scenius',
    feature: 'Credibility graph (who points to you, visible)',
    movemental: true,
    agency: false,
    coursePlatforms: false,
    substack: false,
  },
  {
    category: 'Network & scenius',
    feature: 'Scenius: Alan, Brad, and the people in it',
    movemental: true,
    agency: false,
    coursePlatforms: false,
    substack: false,
    note: "The most valuable part—only with Movemental.",
  },
  {
    category: 'Network & scenius',
    feature: 'Bounded ecology (curated, not a marketplace)',
    movemental: true,
    agency: false,
    coursePlatforms: false,
    substack: false,
    note: 'Movemental: ~100 leaders, mutual elevation. Others: open marketplace.',
  },
  // ——— Launch & support ———
  {
    category: 'Launch & support',
    feature: 'Phased onboarding (Discovery → Research → Build → Launch)',
    movemental: true,
    agency: 'Similar (project phases)',
    coursePlatforms: false,
    substack: false,
    note: 'Course SaaS and Substack: self-serve; no movement-specific process.',
  },
  {
    category: 'Launch & support',
    feature: 'Content migration from existing work',
    movemental: true,
    agency: 'If scoped',
    coursePlatforms: 'Manual / limited',
    substack: 'Manual / limited',
    note: 'Movemental: AI-assisted from your sermons, talks, writing.',
  },
  {
    category: 'Launch & support',
    feature: 'Launch with content live (not empty templates)',
    movemental: true,
    agency: 'If scoped',
    coursePlatforms: 'You fill it yourself',
    substack: 'You fill it yourself',
    note: 'Movemental: platform launches with your content.',
  },
  {
    category: 'Launch & support',
    feature: 'Network onboarding (meet the scenius)',
    movemental: true,
    agency: false,
    coursePlatforms: false,
    substack: false,
  },
]
