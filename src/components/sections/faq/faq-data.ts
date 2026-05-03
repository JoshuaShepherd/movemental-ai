/**
 * FAQ copy + structure. Answers use segment arrays so inline links stay type-safe
 * without HTML strings. Each item has a stable `slug` for deep links (`#slug`).
 */

export type FaqSegment =
  | { kind: "text"; text: string }
  | { kind: "link"; text: string; href: string };

export type FaqRelatedLink = { label: string; href: string };

export type FaqItem = {
  slug: string;
  q: string;
  segments: readonly FaqSegment[];
  relatedLinks?: readonly FaqRelatedLink[];
};

export type FaqSectionData = {
  num: string;
  title: string;
  items: readonly FaqItem[];
};

const t = (text: string): FaqSegment => ({ kind: "text", text });
const l = (text: string, href: string): FaqSegment => ({ kind: "link", text, href });

const plain = (text: string): readonly FaqSegment[] => [t(text)] as const;

export const faqToc = [
  { href: "#faq-01", label: "General" },
  { href: "#faq-02", label: "Who it's for" },
  { href: "#faq-03", label: "Product & platform" },
  { href: "#faq-04", label: "AI & ethics" },
  { href: "#faq-05", label: "Implementation" },
  { href: "#faq-06", label: "Pricing" },
  { href: "#faq-07", label: "Ownership" },
] as const;

export const faqSections: readonly FaqSectionData[] = [
  {
    num: "01",
    title: "General",
    items: [
      {
        slug: "what-is-movemental",
        q: "What is Movemental?",
        segments: [
          t("Movemental is "),
          l("infrastructure", "/platform"),
          t(
            " for people and organizations responsible for formation. It takes your existing body of work — teaching, content, relationships, community — and turns it into a connected system that can sustain and scale what you've already built. The structural ceiling most teams hit is ",
          ),
          l("integration", "/fragmentation"),
          t(
            ": bringing informational and relational intelligence into one foundation so speed doesn't outrun judgment. It's not a website builder. It's not a course marketplace. It's the system layer underneath — content, community, learning pathways, revenue, and AI grounded in your corpus. Serious adoption follows ",
          ),
          t("the AI Stewardship Sequence — Safety, Sandbox, Skills, Solutions"),
          t(", in that order."),
        ],
        relatedLinks: [
          { label: "Safety (before speed)", href: "/articles/safety-before-speed" },
          { label: "Sandbox (discovery)", href: "/articles/sandbox-discovery" },
          { label: "Skills (judgment)", href: "/articles/the-skill-of-ai" },
          { label: "Solutions (deployment)", href: "/articles/solutions-deployment" },
          { label: "Book — From Fragmentation to Movement", href: "/book" },
          {
            label: "AI Stewardship Sequence — field guide for organizational leaders",
            href: "/articles/ssss-field-guide-for-organizational-leaders",
          },
        ],
      },
      {
        slug: "how-different-from-website",
        q: "How is this different from a website or course platform?",
        segments: [
          t("A website publishes. A course platform delivers lessons. Movemental does both, but the real difference is that everything is connected — the "),
          l("how it works", "/services"),
          t(
            " narrative is one system, not bolted-on tools. Your articles link to your courses. Your courses link to community. Your community surfaces what people need next. Revenue, learning, and engagement work together instead of living in separate products.",
          ),
        ],
      },
      {
        slug: "tool-or-service",
        q: "Is this a tool or a service?",
        segments: plain(
          "Both, depending on the phase. Getting started involves a sprint where we work alongside you to capture, structure, and connect your existing work. Once launched, Movemental becomes your ongoing system — a platform you operate with continued support available as needed. Think of it as: service to build, platform to run.",
        ),
        relatedLinks: [{ label: "Services & Sandbox Season", href: "/services/sandbox-season" }],
      },
      {
        slug: "why-exists-now",
        q: "Why does this exist now?",
        segments: [
          t("Three pressures land together for formation-weighted leaders: fragmented tooling that underserves churches, nonprofits, and networks; AI that can assist a bounded corpus when grounding and governance are serious; and room for aligned economics (90% to you / 10% platform share after pass-through payment processing on qualifying movement-leader platforms). That is product timing and mission — not unrelated historical forces converging in an academic sense."),
        ],
        relatedLinks: [{ label: "Pricing & economics", href: "/pricing" }],
      },
    ],
  },
  {
    num: "02",
    title: "Who It's For",
    items: [
      {
        slug: "who-is-for",
        q: "Who is Movemental for?",
        segments: plain(
          "People and organizations responsible for forming others. That includes movement leaders, teachers, authors, pastors, nonprofit directors, and network builders. The common thread isn't industry — it's responsibility.",
        ),
        relatedLinks: [{ label: "Who it's for (overview)", href: "/who-its-for" }],
      },
      {
        slug: "only-movement-leaders",
        q: "Is this only for movement leaders?",
        segments: plain(
          "No. \"Movement leader\" is one archetype, but the infrastructure pattern is the same for churches, nonprofits, schools, networks, and institutions. If you have a body of work, a community to serve, and a mission that depends on ongoing formation — you share the same underlying problem.",
        ),
      },
      {
        slug: "churches",
        q: "Can churches use this?",
        segments: plain(
          "Yes. Churches are one of the core audiences. A church typically has teaching content, discipleship pathways, community needs, and a desire to form people over time — but all of those things live in separate tools or don't exist digitally at all. Movemental connects them into one system.",
        ),
        relatedLinks: [{ label: "Churches", href: "/churches" }],
      },
      {
        slug: "nonprofits",
        q: "Can nonprofits use this?",
        segments: plain(
          "Absolutely. Nonprofits with a formation component — training programs, supporter education, community development — benefit from the same connected infrastructure. Where the 90/10 movement-leader model applies, Movemental's incentives stay aligned with yours.",
        ),
        relatedLinks: [{ label: "Nonprofits", href: "/nonprofits" }],
      },
      {
        slug: "qualify",
        q: "What if I don't know if I qualify?",
        segments: [
          t("Start a "),
          l("conversation", "/contact"),
          t(
            ". We'll help you figure out whether Movemental is the right fit. The key indicators: you have a meaningful body of work, you're responsible for forming people, and your current tools don't connect the things that matter. For diagnostics, start at the ",
          ),
          l("AI Stewardship Sequence integrity diagnostic", "/assess"),
          t(
            " — one diagnostic for the AI Stewardship Sequence (Safety, Sandbox, Skills, Solutions), with stage scores, illusion flags, and a ninety-day focus. The full item bank lives in the ",
          ),
          l("operational backbone article", "/articles/the-ssss-journey-assessment-checklist"),
          t("."),
        ],
      },
    ],
  },
  {
    num: "03",
    title: "Product & Platform",
    items: [
      {
        slug: "platform-includes",
        q: "What does the platform actually include?",
        segments: plain(
          "Content publishing, courses and learning pathways, community integration, revenue tools, AI assistance grounded in your specific body of work, and analytics. All running on shared infrastructure — but your platform is yours: your domain, your brand, your content.",
        ),
        relatedLinks: [{ label: "Services overview", href: "/services" }],
      },
      {
        slug: "content-types",
        q: "What kinds of content can it handle?",
        segments: plain(
          "Written content (articles, books, curricula), audio (sermons, podcasts, lectures), video, and structured learning materials. The system is designed to ingest a wide range of source formats and make them structured, searchable, and interconnected.",
        ),
      },
      {
        slug: "replacing-tools",
        q: "Is this replacing my existing tools?",
        segments: [
          t("In many cases, yes — by design. If you're running a website, a course platform, and a community app as separate systems, Movemental replaces that fragmentation with a single connected platform. Modular organization sprints are cataloged under "),
          l("Sandbox Season", "/services/sandbox-season"),
          t("."),
        ],
      },
      {
        slug: "move-everything-at-once",
        q: "Do I need to move everything at once?",
        segments: plain(
          "No. The sprint focuses on capturing and connecting what matters most. Migration happens in phases. The goal is a working system quickly — not a months-long migration project before anything is live.",
        ),
      },
    ],
  },
  {
    num: "04",
    title: "AI & Ethics",
    items: [
      {
        slug: "how-ai-works",
        q: "How does AI work in Movemental?",
        segments: plain(
          "AI in Movemental is contextual, multi-system, and grounded in your actual work. It reads your corpus — your books, articles, teachings, frameworks — and operates within those boundaries. It can help people navigate your content, answer questions using your language, recommend pathways, and assist with content creation — all within guardrails you define.",
        ),
        relatedLinks: [
          { label: "Methodology (patterns)", href: "/methodology" },
          { label: "Eight patterns", href: "/methodology/eight-patterns" },
        ],
      },
      {
        slug: "just-chatbot",
        q: "Is this just a chatbot?",
        segments: plain(
          "No. The AI operates across multiple systems: content recommendations, pathway suggestions, search, content assistance, and community insights. It's infrastructure-level intelligence, not a widget.",
        ),
      },
      {
        slug: "replace-voice",
        q: "Will AI replace my voice?",
        segments: plain(
          "No — and this is a non-negotiable. AI in Movemental is designed to amplify your voice, not substitute for it. Everything the AI produces is grounded in what you've already said and written. Human oversight is always part of the system.",
        ),
      },
      {
        slug: "theological-accuracy",
        q: "What about theological accuracy?",
        segments: plain(
          "When AI draws from a generic training set, theological accuracy is unpredictable. In Movemental, the AI is grounded in your specific corpus — your books, your frameworks, your language. Where retrieval and citation are configured, outputs can point to that material; human oversight stays in the loop.",
        ),
      },
    ],
  },
  {
    num: "05",
    title: "Implementation & Process",
    items: [
      {
        slug: "get-started",
        q: "How do I get started?",
        segments: [
          t("Start a "),
          l("conversation", "/contact"),
          t(
            ". We'll learn about your work, your goals, and your current situation. If there's a fit, we move into a structured sprint to capture your content, design your platform, and get a working system live.",
          ),
        ],
      },
      {
        slug: "what-in-sprint",
        q: "What happens in a sprint?",
        segments: plain(
          "We work alongside you to ingest and structure your existing content, design your platform architecture and pathways, configure AI grounding against your corpus, set up community, commerce, and analytics, and launch a working platform.",
        ),
        relatedLinks: [{ label: "Sandbox Season (twelve weeks)", href: "/services/sandbox-season" }],
      },
      {
        slug: "how-long",
        q: "How long does it take?",
        segments: plain(
          "Sprints are measured in weeks, not months. The exact timeline depends on the size and complexity of your existing body of work. We don't believe in six-month build cycles that deliver a brochure site.",
        ),
      },
      {
        slug: "technical-team",
        q: "Do I need a technical team?",
        segments: plain(
          "No. Movemental handles the technical infrastructure. You bring the content, the vision, and the relationships. Once live, the platform is designed to be operated by non-technical teams.",
        ),
      },
    ],
  },
  {
    num: "06",
    title: "Pricing & Economics",
    items: [
      {
        slug: "how-pricing-works",
        q: "How does pricing work?",
        segments: [
          t(
            "Two tracks. For qualifying movement-leader platforms: a 90/10 revenue share after payment-processor fees, no monthly SaaS fee for the platform itself, and no upfront build fee before the platform earns revenue. For organizations: Sandbox Season is a twelve-week, fixed-fee engagement priced by published scope zones (Small through Enterprise) with milestone-weighted payments — see ",
          ),
          l("the pricing page", "/pricing"),
          t(". Modular organization builds are listed under "),
          l("Sandbox Season", "/services/sandbox-season"),
          t(". Scope, data volume, or on-site work can change figures; the first conversation names what fits your stage."),
        ],
      },
      {
        slug: "what-is-9010",
        q: "What is the 90/10 model?",
        segments: plain(
          "On qualifying movement-leader platforms, you keep 90% of revenue generated through the platform — course sales, memberships, donations, whatever you offer — after payment rails take their fees. Movemental takes 10% as a platform fee. That covers infrastructure, AI, support, and ongoing development.",
        ),
        relatedLinks: [{ label: "Pricing", href: "/pricing" }],
      },
      {
        slug: "subscriptions",
        q: "Are there subscriptions?",
        segments: plain(
          "No monthly platform subscription for you as the operator on the movement-leader model described above. You may choose to offer subscriptions or memberships to your audience — that's a revenue tool you control.",
        ),
      },
      {
        slug: "why-not-upfront",
        q: "Why not charge upfront?",
        segments: plain(
          "Because a large upfront build fee misaligns incentives: the builder can walk away paid while you carry adoption risk. A revenue-aligned model means Movemental is invested in your platform's long-term success — alongside the fixed-fee options organizations use when a scoped season is the right container.",
        ),
        relatedLinks: [{ label: "Pricing", href: "/pricing" }],
      },
    ],
  },
  {
    num: "07",
    title: "Content & Ownership",
    items: [
      {
        slug: "who-owns-content",
        q: "Who owns the content?",
        segments: plain(
          "You do — fully and always. Your content, your intellectual property, your data. Movemental provides the infrastructure; you own everything that runs on it. Ownership is policy we treat as structural, not a promotional line.",
        ),
      },
      {
        slug: "if-i-leave",
        q: "What happens if I leave?",
        segments: plain(
          "You take everything with you. All your content, data, user information, and analytics are exportable. We don't hold your work hostage.",
        ),
      },
      {
        slug: "export-data",
        q: "Can I export my data?",
        segments: plain(
          "Yes. Full data export is available at any time. Content, user data, analytics, course materials — everything you put in, you can take out. No lock-in, no export fees.",
        ),
      },
      {
        slug: "platform-mine",
        q: "Is my platform truly mine?",
        segments: plain(
          "Yes. Your platform runs on your domain, under your brand. The infrastructure is shared, but the experience is entirely yours.",
        ),
      },
    ],
  },
];
