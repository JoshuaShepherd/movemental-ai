/**
 * Team page profiles — full copy for Josh, Brad, and Alan.
 * Merged with AuthorRecord (avatar, socialLinks) at the page layer.
 * Use "Brad Brisco" consistently (not "Briscoe").
 */

export interface TeamProfileLink {
  label: string
  url: string
}

export interface TeamProfileLinks {
  primary: TeamProfileLink
  secondary?: TeamProfileLink[]
}

export interface TeamProfile {
  slug: string
  name: string
  role: string
  tagline: string
  bio: string
  focusAreas: string[]
  proof: string[]
  links: TeamProfileLinks
  /** For photo alt text: "[Name], [Role]" */
  photoAlt: string
}

const TEAM_PROFILES: TeamProfile[] = [
  {
    slug: 'josh-shepherd',
    name: 'Josh Shepherd',
    role: 'Founder, AI & Digital Strategy',
    tagline:
      'Helps mission-driven organizations turn AI, digital strategy, and narrative into real workflows and measurable outcomes.',
    photoAlt: 'Josh Shepherd, Founder, AI & Digital Strategy',
    bio: `Josh founded Movemental after a decade of community and formation leadership and several years leading digital strategy and AI enablement in mission and market contexts. He has led marketing and digital transformation at SpecChem (website rebuild, AI-powered content operations, traffic growth from ~50K to ~140K annual visitors, ~90% organic), co-led formation with about 100 young adults over 10 years at Mission House Network, and mentored 20 local directors across 12 international cities at QuadW Missional Outreach. At Movemental he builds the platform and the practices that support it: multi-tenant leader platforms, context-aware AI assistants, and content systems that preserve voice and credibility. He works at the boundary between strategy and implementation—shipping products and frameworks, not only advising—and focuses on helping non-technical teams adopt AI responsibly and practically.`,
    focusAreas: [
      'AI enablement and platform implementation for mission-driven organizations',
      'Multi-tenant leader-platform architecture and onboarding',
      'Context-aware AI assistants and voice-faithful experiences',
      'CMS/LMS/e-commerce and content operations (movemental.ai stack)',
      'Digital strategy, narrative design, and donor/communications systems',
    ],
    proof: [
      'Movemental platform: Built and documented multi-tenant leader-platform architecture (organization scoping, onboarding flows, tenant routing); first-production implementations for Alan Hirsch and Brad Brisco as tenant models.',
      'Alan Hirsch ecosystem: Structured long-form content, courses, and AI Lab–style assistant experiences; corpus- and voice-centered design; 100Movements/MLC context.',
      'SpecChem: Rebuilt WordPress from the ground up; led AI-first content marketing; ~50K→~140K annual traffic (~90% organic); shipped iOS/Android app in a two-week AI-accelerated cycle.',
      'MLC / 100 Movements: Consulting on digital and AI—deck redesign (21→10 slides), fundraising collateral, brand/IA across MLC, 100 Movements, 100M Publishing, mX Platform.',
      'Technical: Next.js/React, Tailwind, Supabase; OpenAI Assistants API, Custom GPTs, voice agents, Agents SDK–oriented orchestration; WordPress, GA4/GTM.',
    ],
    links: {
      primary: { label: 'Connect / movemental.ai', url: 'https://movemental.ai' },
      secondary: [
        { label: 'LinkedIn', url: 'https://linkedin.com/in/joshshepherd' },
      ],
    },
  },
  {
    slug: 'brad-brisco',
    name: 'Brad Brisco',
    role: 'Partner & First Tenant; Missional Church Strategist',
    tagline:
      'Equips leaders and churches for missional engagement, covocational planting, and church multiplication.',
    photoAlt:
      'Brad Brisco, Partner & First Tenant; Missional Church Strategist',
    bio: `Brad Brisco is a missional church strategist, author, and practitioner. He holds a doctorate in missional ecclesiology; his dissertation focused on helping existing congregations transition in a missional direction. He directs multiplication strategies for the Send Network at the North American Mission Board (NAMB) and directs strategies development for NAMB. He also serves on the national leadership team for Forge America Mission Training Network and has trained church planters in Kansas City and beyond. He has lived in Kansas City and now lives near Tampa. Brad is a first-class tenant on the Movemental platform, with a dedicated leader presence at brad-brisco.movemental.ai. His work with Movemental includes collaboration on theological education and formation resources for covocational church planters—including AI-assisted learning and research tools aligned with missional-incarnational frameworks. He is part of the credibility network that Movemental amplifies: verified voices in mission and movement.`,
    focusAreas: [
      'Covocational and bivocational church planting',
      'Missional church transition and multiplication strategies',
      'Church planting movements and multiplication mindset',
      'Theological foundations for missional engagement',
      'Leadership development and training for planters and existing churches',
    ],
    proof: [
      'NAMB / Send Network: Director of Multiplication Strategies; directs strategies development for the North American Mission Board.',
      'Forge America: National leadership team; mission training network for church planters and missional leaders.',
      'Author: Co-author of Missional Essentials (12-week small group study), The Missional Quest: Becoming a Church of the Long Run, Next Door As It Is In Heaven, Covocational Church Planting: Aligning Your Marketplace Calling & the Mission of God, and Rethink: 12 Missiological Principles for Church Multiplication.',
      'Movemental: First-class tenant; dedicated organization slug brad-brisco and subdomain brad-brisco.movemental.ai; documented onboarding and network integration in platform architecture.',
      'New Churches / Missio Alliance: Contributor and author; podcast and resource presence (e.g. New Churches Podcast with Ed Stetzer, Missio Alliance).',
    ],
    links: {
      primary: {
        label: "Visit Brad's platform",
        url: 'https://brad-brisco.movemental.ai',
      },
      secondary: [
        {
          label: 'New Churches (NAMB)',
          url: 'https://www.newchurches.com/contributor/brad-brisco/',
        },
        {
          label: 'Missio Alliance',
          url: 'https://www.missioalliance.org/author/brad-brisco/',
        },
        {
          label: 'Goodreads',
          url: 'https://www.goodreads.com/author/show/6908617.Brad_Brisco',
        },
      ],
    },
  },
  {
    slug: 'alan-hirsch',
    name: 'Alan Hirsch',
    role: 'Founding Thought Leader & Partner; 100Movements',
    tagline:
      'Pioneer of mDNA and APEST; founder of 100Movements, committed to reanimating transformative missional movements.',
    photoAlt:
      'Alan Hirsch, Founding Thought Leader & Partner; 100Movements',
    bio: `Alan Hirsch is the founder of 100Movements, Forge Mission Training Network, and Future Travelers. He is widely considered a thought leader and key mission strategist for churches across the Western world. His centerpiece work, The Forgotten Ways, introduced the framework of mDNA (movement DNA)—six elements that activate apostolic movement—and his development of the APEST framework (from Ephesians 4) has shaped how countless leaders understand fivefold ministry and movement capacity. Through 100Movements and the 5Q Collective, Alan focuses on reanimating authentic transformative missional movements and developing fivefold imagination throughout the Body of Christ. He is co-founder and associate faculty for the M.A. in Missional Church Movements at Wheaton College and teaches at Asbury, Fuller, George Fox, and elsewhere. Alan's platform on Movemental—structured books, modular courses, AI Lab–style assistant experiences, and unified dashboard—was the first production build on the leader-platform architecture and remains a cornerstone of the credibility and scenius narrative.`,
    focusAreas: [
      'mDNA and apostolic movement dynamics',
      'APEST / fivefold ministry and 5Q Collective',
      'Missional church transition and movement multiplication',
      '100Movements, MLC, and movement leadership development',
      'Formation-over-information; knowledge spine and voice preservation',
    ],
    proof: [
      '100Movements: Founder; organization committed to reanimating transformative missional movements around the six elements of mDNA.',
      'Author: The Forgotten Ways; 5Q: Reactivating the Original Intelligence and Capacity of the Body of Christ; co-author of The Shaping of Things to Come, ReJesus, Untamed, Right Here, Right Now, On the Verge, The Permanent Revolution (with Tim Catchim), and others.',
      '5Q Collective / Forge: Founder of 5Q Collective; founder of Forge Mission Training Network; resident coach and consultant.',
      'Academia: Co-founder and associate faculty, M.A. in Missional Church Movements, Wheaton College; adjunct at Asbury, Fuller, George Fox; series editor (Baker Shapevine, IVP Forge); associate editor, Leadership Journal.',
      'Movemental: First production leader-platform build; structured long-form content, courses, AI Lab and voice-faithful assistant capabilities, dashboard model; alan-hirsch PWA; 100Movements Publishing and MLC ecosystem integration.',
    ],
    links: {
      primary: { label: 'Visit 100Movements', url: 'https://www.100movements.org/' },
      secondary: [
        { label: 'alanhirsch.org', url: 'https://www.alanhirsch.org/' },
        {
          label: '5Q Central',
          url: 'https://www.theforgottenways.org/alan-hirsch.aspx',
        },
      ],
    },
  },
]

/** Order for display: Josh → Brad → Alan */
export function getTeamProfiles(): TeamProfile[] {
  return TEAM_PROFILES
}

export function getTeamProfileBySlug(slug: string): TeamProfile | null {
  return TEAM_PROFILES.find((p) => p.slug === slug) ?? null
}
