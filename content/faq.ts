/**
 * FAQ content derived from project documentation (_docs/).
 * Covers: ownership, billing, plans, roles, tenant/organization, platform, content, and support.
 */

export interface FaqItem {
  question: string;
  answer: string;
  /** Optional link text and href for "read more" (e.g. "here" -> /team) */
  link?: { text: string; href: string };
}

/** Categories for optional grouping on the FAQ page */
export const FAQ_CATEGORIES = [
  "Billing & plans",
  "Who owns what",
  "Partnership, payments & exits",
  "Roles & team",
  "Platform & content",
  "Getting started",
  "Support & legal",
] as const;

export type FaqCategory = (typeof FAQ_CATEGORIES)[number];

export const FAQ_ITEMS: { category: FaqCategory; items: FaqItem[] }[] = [
  {
    category: "Billing & plans",
    items: [
      {
        question: "How are additional editors or team members billed?",
        answer:
          "Billing is at the organization (workspace) level. Your plan and billing term (e.g. yearly or monthly) determine the rate. The account owner is not charged as an additional seat. Team members can be added from your team settings or invite panel. You can read more about roles and permissions here.",
        link: { text: "here", href: "/team" },
      },
      {
        question: "Can I trial Movemental before paying?",
        answer:
          "Yes. You can explore the platform and run a Fit Check with no commitment. The $1,000 platform build is due when you decide to launch. There are no monthly platform fees—only a 10% revenue share when you earn from your content.",
      },
      {
        question: "What payment methods do you offer?",
        answer:
          "We accept major credit cards, PayPal, and for larger or custom arrangements, wire transfer. Payment for the one-time platform build can be made by card or agreed terms.",
      },
      {
        question: "Can I cancel or change my plan at any time?",
        answer:
          "Yes. You can downgrade or change how you work with us at any time from your account or billing settings. Your platform, content, and audience data remain yours regardless.",
      },
      {
        question: "How can I manage my invoices and charges?",
        answer:
          "Visit your Billing page in account or team settings to view invoices, update payment methods, and see revenue-share and one-time charge history.",
      },
      {
        question: "What is your refund policy?",
        answer:
          "Refund terms for the one-time platform build are set out in our Terms of Service. Revenue share applies only to revenue you actually earn; there are no recurring platform fees to refund.",
      },
      {
        question: "What are Site plans vs. Organization (workspace) plans?",
        answer:
          "Movemental is organized by organization (tenant). Each organization has one account owner, its own data, and its own plan. Your 'site' is your public platform (books, articles, courses, etc.) under that organization. Billing and roles are at the organization level.",
      },
      {
        question: "Why is the upfront cost so low?",
        answer:
          "Our mission is to serve movement leaders who otherwise couldn't afford these tools. The $1,000 covers the platform build and deployment. We earn through the 10% revenue share when you succeed, which aligns our incentives and makes professional-grade platforms accessible.",
      },
      {
        question: "How does the 10% revenue share work?",
        answer:
          "You keep 90% of all revenue from your content—subscriptions, course sales, ebooks, consulting fees processed through your platform. We take 10% as our ongoing fee. The split happens automatically at the moment of each transaction; you never invoice us and we never manually take money. Revenue is distributed to you monthly with detailed reporting. There are no hidden costs, no monthly platform fees, and no per-transaction charges on top of the revenue share.",
      },
      {
        question: "How do payments and the 90/10 split work technically?",
        answer:
          "We use Stripe Connect so that revenue flows safely and transparently. When a customer pays you, the split happens automatically at the moment of payment: 90% goes to your account and 10% to Movemental. Payment goes directly to you—not through Movemental—and every transaction is visible and auditable in your dashboard.",
      },
      {
        question: "What if I don't generate revenue right away?",
        answer:
          "The revenue share only applies when you earn. If you're building your audience and not monetizing yet, you pay nothing beyond the initial $1,000. We're invested in your long-term success.",
      },
    ],
  },
  {
    category: "Who owns what",
    items: [
      {
        question: "Do I really own my platform, content, and audience?",
        answer:
          "Yes. You own your content, your name and brand, your audience (email lists, subscriber data, relationships), your custom domain, and 90% of revenue. Movemental never owns the copyright to your content, your voice, or your audience. You can use your content elsewhere subject to reasonable transition rules. We operate the platform with a non-exclusive license to host and display your content—you retain all rights.",
      },
      {
        question: "What does Movemental retain or own?",
        answer:
          "Movemental owns the platform infrastructure: the codebase, database and systems, AI agents and tools, design system, deployment and operations, and the Movemental brand and network. We also have the right to collect the 10% revenue share for operating and evolving the platform. You are not buying software you take with you—you are in a long-term publishing partnership with a managed platform.",
      },
      {
        question: "Who owns the content I publish?",
        answer:
          "You do. All original intellectual property—text, audio, video, courses, assessments—is yours. Movemental can operate the platform with your content (non-exclusive, operational license) but you keep full ownership and can reuse content elsewhere.",
      },
      {
        question: "Who owns audience and subscriber data?",
        answer:
          "You do. Audience and subscriber data are tied to your organization and are not shared across other tenants. You own and control this data; we don't sell it or use it for advertising.",
      },
      {
        question: "How is my data isolated from other organizations?",
        answer:
          "The platform is multi-tenant: each organization's data is strictly isolated. All data is scoped by organization, and access is enforced at the service layer. Your data is never mixed with another organization's.",
      },
    ],
  },
  {
    category: "Partnership, payments & exits",
    items: [
      {
        question: "Is this a partnership or am I buying software?",
        answer:
          "You're entering a long-term publishing partnership, not buying a product you take away. Movemental operates and evolves a shared platform; you own your content, audience, brand, and 90% of revenue. The value is in the partnership, the network, and the ecosystem—like working with a world-class publisher and product team, not buying Squarespace.",
      },
      {
        question: "Do I ever invoice Movemental, or do they pay me?",
        answer:
          "You never invoice Movemental. Revenue from your audience flows through the payment system; the 90/10 split happens automatically at the moment of each transaction. You receive your share directly (via Stripe Connect) and can see every transaction. Movemental doesn't manually take money from you.",
      },
      {
        question: "When do I get my revenue?",
        answer:
          "Revenue is distributed monthly with detailed reporting. You can see each transaction and the split in your dashboard. The split is automatic, transparent, and auditable.",
      },
      {
        question: "What happens if I leave or back out?",
        answer:
          "Your content is always yours. We offer content export (e.g. markdown/HTML), a redirect grace period (typically 3–6 months) so your audience isn't cut off, and optional paid transition support if you want help moving elsewhere. You do not receive the codebase, agent systems, or platform infrastructure—those stay with Movemental because this is a managed platform, not software you purchase. Exit paths are designed to be humane; we offer them because we're confident in the partnership value.",
      },
      {
        question: "What if Movemental shuts down?",
        answer:
          "Your content is yours. We would provide content export and reasonable transition support. We're building for long-term sustainability; the partnership and revenue-share model aligns us with your success over time.",
      },
      {
        question: "Can I use my content elsewhere?",
        answer:
          "Yes. You own your content. You may reuse it elsewhere subject to reasonable transition rules. The agreement includes a non-exclusive license so we can operate the platform with your content—we don't get ownership or exclusive rights.",
      },
      {
        question: "Why 10%? Why not less?",
        answer:
          "10% funds platform operation, development, and network stewardship. We keep it low on purpose: we want alignment over extraction. We succeed when you succeed. The percentage reflects that we're partners, not taking a cut the way traditional publishers or rental platforms do.",
      },
      {
        question: "Can I customize the design?",
        answer:
          "We have approved templates and patterns. You can choose templates, request adaptations within the system, or work with your designer in collaboration with us. Deep customization beyond the design system is possible but involves additional cost because it adds complexity to a shared platform. Most authors don't need it.",
      },
      {
        question: "What's in the agreement?",
        answer:
          "Conceptually: (1) Platform Participation—terms for being part of the Movemental network and quality expectations; (2) Revenue Share—90/10 split, payment processing, and reporting; (3) Content License—non-exclusive, so we can operate the platform with your content while you retain full ownership; (4) Data & Privacy—how data is used and protected. Full terms are in the legal documents.",
        link: { text: "Terms of Service", href: "/legal/terms" },
      },
      {
        question: "What do I control vs. what does Movemental control?",
        answer:
          "You control your content, structure, voice, pricing, publishing cadence, and how you use AI assistance. Movemental maintains the core platform architecture, design system, and UX patterns so the network stays coherent and high quality. That constraint is intentional—it keeps the experience consistent and builds credibility across the network. Think of it like working with a publisher and product team that keeps the infrastructure in shape while you focus on your movement.",
      },
    ],
  },
  {
    category: "Roles & team",
    items: [
      {
        question: "What is the account owner?",
        answer:
          "Each organization has one account owner (set in our system). The account owner is the billing and administrative contact and is not charged as an extra seat. They can invite editors and manage team settings.",
      },
      {
        question: "How do I add editors or team members?",
        answer:
          "You can add editors from the invite panel in your project or via your team/organization settings. Additional seats are billed according to your organization plan and billing term.",
      },
      {
        question: "Where do I read more about roles and permissions?",
        answer:
          "You can read more about roles, permissions, and how billing applies to your team here.",
        link: { text: "here", href: "/team" },
      },
    ],
  },
  {
    category: "Platform & content",
    items: [
      {
        question: "What's included in the $1,000 build?",
        answer:
          "Complete platform development (React/Next.js), AI agent integration and training, content migration and optimization, SEO setup and network integration, custom domain and DNS, payment processing configuration, and 90 days of implementation support plus training and onboarding. Timeline is typically 2–4 weeks from contract to launch.",
      },
      {
        question: "What content types does the platform support?",
        answer:
          "Books (with chapters), articles, videos, podcasts, courses (with modules), and assessments. Not every type has to be used; we enable what fits your movement and content strategy.",
      },
      {
        question: "How is this different from Substack, Kajabi, or Teachable?",
        answer:
          "Those platforms rent you access—you're on their land, under their rules, competing with others on their platform. With Movemental you own your platform. You keep 90% of revenue instead of 70–85%, and you get network amplification instead of competing in a feed.",
      },
      {
        question: "What is the 'content that moves' idea?",
        answer:
          "We believe the problem for many movement leaders isn't more content—it's that existing content doesn't move: it's not discoverable, connected, or compounding. Movemental helps make your content discoverable, linked to trusted peers, and usable by AI in a way that reflects your voice.",
      },
      {
        question: "Do I get a custom domain?",
        answer:
          "Yes. Custom domain setup is part of the platform build. Your brand, your domain, your platform.",
      },
    ],
  },
  {
    category: "Getting started",
    items: [
      {
        question: "How do I know if Movemental is right for me?",
        answer:
          "Start with the Fit Check—a short, reflective set of questions. It's a moment of recognition, not an application. No credit card or commitment required.",
      },
      {
        question: "How long does it take to launch?",
        answer:
          "Typically 3–4 weeks from fit to launch. The path includes discovery and vision, content research, platform architecture, and network and launch. Timeline can be discussed during onboarding.",
      },
      {
        question: "What are the main steps from signup to launch?",
        answer:
          "Fit Check → discovery and vision → content research → platform architecture → network and launch. You can see the full path and phases on the How It Works page.",
      },
      {
        question: "Where do I find the How It Works and Why Movemental pages?",
        answer:
          "Why Movemental explains the problem we address and who we're for. How It Works walks through the four phases to launch. Both are linked from the main navigation.",
      },
    ],
  },
  {
    category: "Support & legal",
    items: [
      {
        question: "Where can I get support?",
        answer:
          "Use the contact or support options in your account, or the contact form on the site. For billing and invoices, use the Billing section in your settings.",
      },
      {
        question: "Where is the Privacy Policy?",
        answer:
          "Our Privacy Policy is available at /legal/privacy. It describes how we collect, use, and protect your data.",
      },
      {
        question: "Where are the Terms of Service?",
        answer:
          "Our Terms of Service are available at /legal/terms. They cover use of the platform, billing, refunds, and the agreement model.",
      },
    ],
  },
];

/** Flat list of all FAQ items (for pages that don't group by category) */
export const FAQ_ITEMS_FLAT: FaqItem[] = FAQ_ITEMS.flatMap((c) => c.items);
