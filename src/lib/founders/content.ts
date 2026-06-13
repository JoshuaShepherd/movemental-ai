/**
 * Founder content SSOT — bios at every length, slugs, schema fields, and shared
 * narrative blocks for `/about`, `/about/[slug]`, the agent room, and JSON-LD.
 *
 * Personal anchors and ownership split stay out of this module (internal only).
 */

export const FOUNDER_SLUGS = ["alan-hirsch", "brad-brisco", "josh-shepherd"] as const;

export type FounderSlug = (typeof FOUNDER_SLUGS)[number];

/** Legacy slug alias — redirects to `josh-shepherd`. */
export const FOUNDER_SLUG_ALIASES: Record<string, FounderSlug> = {
  "joshua-shepherd": "josh-shepherd",
};

export type FounderArcEntry = {
  period: string;
  detail: string;
};

export type FounderWorkEntry = {
  title: string;
  detail: string;
};

export type FounderProfile = {
  slug: FounderSlug;
  /** Index into `LEADERS` / `PROFILES`. */
  leaderIndex: number;
  name: string;
  jobTitle: string;
  portrait: string;
  oneLine: string;
  shortBio: string;
  mediumBio: string;
  /** Body paragraphs for the full profile page. */
  fullBio: readonly string[];
  arc: readonly FounderArcEntry[];
  selectedWork: readonly FounderWorkEntry[];
  skills: readonly string[];
  /** Josh only — title and trust-seat decision, kept short on the profile page. */
  trustLine?: string;
  sameAs: readonly string[];
  knowsAbout: readonly string[];
};

/** Shared origin story for `/about` and agent knowledge. */
export const FOUNDING_STORY = {
  lead: "It started as a conversation.",
  paragraphs: [
    "For two years, Josh kept circling the same worry with Alan and Brad. AI was arriving in churches, nonprofits, and seminaries faster than anyone was deciding how to meet it. The people most exposed were the ones whose entire work rests on trust, and they had the least time to think it through.",
    "Josh did not want to add to the noise. He wanted to build the thing he wished existed: a way for a mission-driven organization to meet this moment in order, without faking its way through, and without losing the human core of the work. Alan and Brad joined, opened the authorship question together, and the conversation became a partnership. In 2026, it became Movemental.",
  ],
} as const;

/** Plain authorship and roles — `/about` and agent knowledge. */
export const FOUNDERS_AND_ROLES = {
  lead: "Who did what",
  body: [
    "Alan Hirsch is the movement thinker. Brad Brisco is the missional leader and CEO. Josh Shepherd is the technical founder who builds the platform, the agents, and the system underneath.",
    "Brad holds the CEO seat on purpose. Trust is the product, and he already carries that trust in the field. The org chart says the thesis: the person who builds hands the trust seat to the person who already holds it.",
  ],
} as const;

export const FOUNDER_PROFILES: Record<FounderSlug, FounderProfile> = {
  "alan-hirsch": {
    slug: "alan-hirsch",
    leaderIndex: 0,
    name: "Alan Hirsch",
    jobTitle: "Co-Founder & Chief Movement Officer",
    portrait: "/agent-room/leaders/0.jpg",
    oneLine:
      "Alan Hirsch is the missiologist behind The Forgotten Ways and the movement thinker who coined the term movemental.",
    shortBio:
      "One of the most influential voices on missional church and movements. His frameworks have shaped a generation of leaders. His own platform is the reference for everything we build for a Voice.",
    mediumBio:
      "Alan Hirsch is the missiologist who coined the term movemental, built the intellectual architecture much of the contemporary missional church runs on, and serves as Movemental's Chief Movement Officer. His magnum opus, The Forgotten Ways, introduced mDNA and Apostolic Genius; 5Q and The Permanent Revolution have made APEST one of the most widely adopted readings of Ephesians 4 in the Western church.",
    fullBio: [
      "Alan Hirsch is the missiologist who coined the term movemental, the namesake of this platform, and built the intellectual architecture much of the contemporary missional church now runs on. Born in Johannesburg in 1959, raised in apartheid-era South Africa, he emigrated to Australia in 1983 and pastored the South Melbourne Restoration Community for fifteen years among addicts, sex workers, and the chronically housed before turning that ministry's lessons into theory.",
      "His magnum opus, The Forgotten Ways (Brazos, 2006), introduced the mDNA framework and the concept of Apostolic Genius; 5Q (2017) and The Permanent Revolution (Jossey-Bass, 2012, with Tim Catchim) have made APEST one of the most widely adopted readings of Ephesians 4 in the Western church, with more than 150,000 assessments taken through his platforms. Across twenty books published with seven publishers, including The Shaping of Things to Come with Michael Frost, ReJesus, Untamed with Debra Hirsch, and Metanoia with Rob Kelly, he has built a coherent line from Christology through missiology to ecclesiology.",
      "He founded 100Movements, co-founded the Forge Mission Training Network and 5Q Collective, and co-founded the M.A. in Missional Church Movements at Wheaton College. He teaches as adjunct faculty at Fuller, George Fox, and Asbury, and works as embedded consultant for Redeemer City to City and movement mentor for NewThing International.",
    ],
    arc: [
      { period: "1983–1998", detail: "Pastored South Melbourne Restoration Community — fifteen years among addicts, sex workers, and the chronically housed." },
      { period: "2006", detail: "Published The Forgotten Ways — mDNA and Apostolic Genius enter the missional conversation." },
      { period: "2010s–2020s", detail: "Built 100Movements, Forge, 5Q Collective, and the Wheaton M.A. in Missional Church Movements." },
      { period: "2024–2026", detail: "The Alan Hirsch platform becomes Movemental's reference implementation for a Voice." },
      { period: "2026", detail: "Co-founded Movemental alongside Brad Brisco and Josh Shepherd." },
    ],
    selectedWork: [
      { title: "The Forgotten Ways", detail: "mDNA framework and Apostolic Genius — the intellectual spine of the movemental conversation." },
      { title: "5Q & The Permanent Revolution", detail: "APEST as widely adopted Ephesians 4 reading, with Tim Catchim." },
      { title: "100Movements & Forge", detail: "Training networks that shaped a generation of missional practitioners." },
      { title: "Alan Hirsch platform", detail: "Movemental's reference implementation — the first Voice platform built to this standard." },
    ],
    skills: [
      "Missiology & movement theory",
      "APEST / 5Q frameworks",
      "Movement training & publishing",
      "Embedded consulting (City to City, NewThing)",
    ],
    sameAs: [
      "https://www.alanhirsch.org",
      "https://en.wikipedia.org/wiki/Alan_Hirsch",
    ],
    knowsAbout: [
      "Missional church",
      "APEST",
      "Movement theory",
      "Ecclesiology",
    ],
  },
  "brad-brisco": {
    slug: "brad-brisco",
    leaderIndex: 1,
    name: "Brad Brisco",
    jobTitle: "Co-Founder & CEO",
    portrait: "/agent-room/leaders/1.jpg",
    oneLine:
      "Brad Brisco leads Movemental as CEO and translates missional theology into the planting language denominations actually use.",
    shortBio:
      "A missional church leader and author focused on how ordinary churches and people live sent into their places. He keeps the work tethered to the ground it is meant to serve.",
    mediumBio:
      "Brad Brisco is Movemental's CEO and the missional leader who works the seam between post-Christendom theology and denominational planting systems. As Director of Multiplication Strategies for Send Network at the North American Mission Board, he translates Newbigin, Bosch, Frost, and Hirsch into language a tradition that has not always reached for them can actually use.",
    fullBio: [
      "Brad Brisco works the seam most missional writers avoid: the seam between post-Christendom theology and a Southern Baptist denominational system. As Director of Multiplication Strategies for Send Network at the North American Mission Board, he translates Newbigin, Bosch, Frost, and Hirsch into the planting language of a tradition that has not always reached for them. He earned a D.Min. in Missional Ecclesiology with a dissertation on helping existing congregations transition toward mission, and he has carried that question into eighteen-plus years of college teaching across History of Christianity, Theology of Place, and Launching Apostolic Movements.",
      "His written corpus moves in stages alongside Lance Ford, from the small-group curriculum Missional Essentials, through The Missional Quest (InterVarsity Press) and Next Door As It Is In Heaven (NavPress, 2016), to ReThink and his solo synthesis Covocational Church Planting (Missional Press, 2021), released as a free bilingual ebook in English and Spanish. He co-founded Forge Kansas City and the Sentralized Conference, sits on the Forge America national leadership team, and writes regularly across New Churches, ChurchLeaders.com, and his own missionalchurchnetwork.com.",
      "At Movemental, Brad holds the CEO seat. Trust is the product, and he already carries that trust in the field — decades of denominational and network-level missional work, teaching, and writing alongside Alan Hirsch.",
    ],
    arc: [
      { period: "2000s–2010s", detail: "College teaching and Forge Kansas City — missional ecclesiology in the classroom and the neighborhood." },
      { period: "2016–2021", detail: "Next Door As It Is In Heaven and Covocational Church Planting — sentness and bivocational ministry in print." },
      { period: "NAMB / Send Network", detail: "Director of Multiplication Strategies — translating missional theology for denominational planting." },
      { period: "2024–2026", detail: "Two-year conversation with Alan and Josh about AI, trust, and mission-driven organizations." },
      { period: "2026", detail: "Co-founded Movemental as CEO." },
    ],
    selectedWork: [
      { title: "Covocational Church Planting", detail: "Solo synthesis on bivocational ministry — free bilingual ebook (Missional Press, 2021)." },
      { title: "Next Door As It Is In Heaven", detail: "With Lance Ford (NavPress, 2016) — neighborhood sentness in ordinary churches." },
      { title: "Send Network / NAMB", detail: "Multiplication strategies at denominational scale." },
      { title: "Forge Kansas City & Sentralized", detail: "Grassroots and institutional circles held together in one footprint." },
    ],
    skills: [
      "Missional ecclesiology",
      "Covocational & bivocational planting",
      "Denominational strategy (NAMB / Send Network)",
      "Teaching & network leadership (Forge America)",
    ],
    sameAs: [
      "https://www.missionalchurchnetwork.com",
    ],
    knowsAbout: [
      "Missional church planting",
      "Covocational ministry",
      "Denominational strategy",
      "Missional ecclesiology",
    ],
  },
  "josh-shepherd": {
    slug: "josh-shepherd",
    leaderIndex: 8,
    name: "Josh Shepherd",
    jobTitle: "Founder & CTO",
    portrait: "/agent-room/leaders/8.jpg",
    oneLine:
      "Josh Shepherd builds Movemental's platform, agents, and system underneath, at the seam between software and mission-driven organizations.",
    shortBio:
      "Josh Shepherd is a founder of Movemental, where he builds the platform, the agents, and the system underneath. He works at the seam between the technical world and the missional one. His conviction is simple: meet AI without losing the trust the work depends on.",
    mediumBio:
      "Josh Shepherd is a founder of Movemental and the person turning its thesis into working software. He is technical enough to design the platform, the agents, and the data model himself, and fluent enough in the missional and nonprofit world to know what the work is actually for. He builds for movement leaders and mission-driven organizations, and he holds the same line for both: meet AI without losing the trust the work depends on.",
    fullBio: [
      "Josh Shepherd is a founder of Movemental, LLC (movemental.ai), alongside Alan Hirsch and Brad Brisco. Movemental was founded in 2026, out of a two-year conversation among the three of them about what AI was doing to the institutions, and the trust, they care about.",
      "Within that trio, Josh is the technical founder. Alan is the movement thinker. Brad is the missional leader. Josh is the one who builds. He designs and writes the platform, the agents, and the system underneath, so the ideas become something an organization can actually use. He is based in Kansas City.",
      "Josh came to this work from inside it: years as a Methodist pastor, then founding a neomonastic, communal nonprofit where he and his wife lived alongside young adults in extended residency. From direct service through neighborhood ministry and into product work, he has built AI tools for real organizations serving real families — including bilingual youth work where the stakes are children and trust, not theory.",
      "Movemental helps churches, nonprofits, seminaries, institutions, and individual movement leaders meet AI without losing the trust their work depends on. Josh holds the whole vision, not just the engineering. The company is agent-first: the homepage is an agent, not a brochure. The path goes in order — Safety, Sandbox, Training, Technology — because building tools for people who have not decided their boundaries just automates the mess faster.",
      "He writes plainly, refuses hype, and is unusually scrupulous about claiming only what is true. He would rather show you a thing than describe it, and he would rather be early and honest than finished and false.",
    ],
    arc: [
      { period: "Pastoral roots", detail: "Methodist pastor — years in direct service before building for the field." },
      { period: "Communal nonprofit", detail: "Founded a neomonastic residence — lived alongside young adults in extended community." },
      { period: "Neighborhood ministry", detail: "Built AI tools and systems for Youthfront's work in the Argentine neighborhood of Kansas City, Kansas." },
      { period: "Product & platform", detail: "Full-stack builds for mission-driven organizations — from SpecChem's digital presence to the Alan Hirsch reference platform." },
      { period: "2024–2026", detail: "The conversation with Alan and Brad — AI, trust, and what mission-driven organizations need." },
      { period: "2026", detail: "Movemental — founder and CTO, architect of the platform." },
    ],
    selectedWork: [
      { title: "Alan Hirsch platform", detail: "Movemental's reference implementation — the first Voice platform built to this standard." },
      { title: "Movemental architecture", detail: "Multi-tenant platform, agents, corpus pipeline, and the four-stage path in working software." },
      { title: "Youthfront", detail: "First organization partner — AI tools for real neighborhood ministry with vulnerable families." },
      { title: "SpecChem build", detail: "Full digital platform for a specialty chemicals company — product system, SEO, and organic discoverability." },
    ],
    skills: [
      "Full-stack engineering (Next.js, React, Drizzle, Supabase)",
      "AI application engineering & agents",
      "SEO & GEO",
      "Bilingual product work",
      "Kansas Leadership Center formation",
    ],
    trustLine:
      "Josh is Founder and CTO and architect of the platform. He handed the CEO seat to Brad on purpose: trust is the product, and Brad already carries that trust in the field.",
    sameAs: [
      "https://github.com/joshshepherd",
    ],
    knowsAbout: [
      "AI application engineering",
      "RAG & agent systems",
      "SEO and GEO",
      "Missional leadership platforms",
      "Multi-tenant SaaS architecture",
    ],
  },
};

export function resolveFounderSlug(slug: string): FounderSlug | undefined {
  const normalized = FOUNDER_SLUG_ALIASES[slug] ?? slug;
  return FOUNDER_SLUGS.find((s) => s === normalized);
}

export function getFounderBySlug(slug: string): FounderProfile | undefined {
  const resolved = resolveFounderSlug(slug);
  if (!resolved) return undefined;
  return FOUNDER_PROFILES[resolved];
}

/** Card order on `/about`: Alan, Brad, Josh. */
export const ABOUT_FOUNDER_SLUGS: readonly FounderSlug[] = [
  "alan-hirsch",
  "brad-brisco",
  "josh-shepherd",
] as const;

export function founderProfilePath(slug: FounderSlug): string {
  return `/about/${slug}`;
}
