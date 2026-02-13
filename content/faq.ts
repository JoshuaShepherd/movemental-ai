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
          "You keep 90% of all revenue from your content—subscriptions, course sales, ebooks, consulting fees processed through your platform. We take 10% as our ongoing fee. There are no hidden costs, no monthly fees, and no per-transaction charges on top of the revenue share.",
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
        question: "Do I really own the platform?",
        answer:
          "Yes. Your platform, your domain, your audience data, and your content are yours. If you ever leave, you take everything with you. We don't hold your content or audience hostage.",
      },
      {
        question: "Who owns the content I publish?",
        answer:
          "You do. Content you create and publish on your Movemental platform is yours. The platform is built so your work stays discoverable, connected, and under your control.",
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
      {
        question: "What happens to my data if I leave?",
        answer:
          "You retain ownership of your content and audience data. We'll work with you on export and transition so you can take your platform and data with you.",
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
          "Everything you need to launch: custom domain setup, content management, e-commerce integration, email tools, analytics, AI content assistance, and network features. We build your platform around your needs during the 3–4 week onboarding process.",
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
          "Our Privacy Policy is available at /privacy. It describes how we collect, use, and protect your data.",
      },
      {
        question: "Where are the Terms of Service?",
        answer:
          "Our Terms of Service are available at /terms. They cover use of the platform, billing, and refunds.",
      },
    ],
  },
];

/** Flat list of all FAQ items (for pages that don't group by category) */
export const FAQ_ITEMS_FLAT: FaqItem[] = FAQ_ITEMS.flatMap((c) => c.items);
