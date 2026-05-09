import { BOOK_HUB_PATH, SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";

/**
 * ⚠️ NOT WIRED INTO THE LIVE SITE.
 *
 * The active marketing header is `SiteHeader` ([./site-header.tsx]) which
 * consumes `PRIMARY_NAV` / `PRIMARY_CTA` from [./nav-config.ts] — that is the
 * source of truth for the rendered desktop + mobile nav.
 *
 * The exports below (`primaryNavGroups`, `siteNavSections`, `footerSections`,
 * `siteCtaLink`, `footerLegalLinks`) feed `SiteNavDesktop` and `MobileNav`,
 * which today are only consumed by legacy components under
 * `src/components/sections/*` and `src/components/editorial-stitch/*`. None of
 * those are routed in `src/app/(site)/*` after the `sections-mock` migration.
 *
 * Several of the routes referenced here (e.g. `/platform`, `/system`, `/book`,
 * `/fragmentation`, `/articles`, `/services`, `/pricing`, `/methodology`,
 * `/organizations`) were archived to `src/app/_archive/legacy-site-2026-04-28/`
 * and will 404 if linked from a live page.
 *
 * Do not import from this file when adding new live nav surfaces. Either
 * extend [./nav-config.ts] or wire a fresh component against `PRIMARY_NAV`.
 *
 * Canonical IA reference (historical):
 * `docs/build/prompts/site-wide-navigation-ia-proposal.md`.
 *
 * Non-negotiables encoded here:
 *  - Book (/book), AI Stewardship Sequence field guide (SSSS_FIELD_GUIDE_PATH),
 *    and Assess (/assess) remain three distinct destinations with distinct
 *    labels. The `SSSS_FIELD_GUIDE_PATH` constant retains its historical name
 *    for route stability; the user-visible label is "AI Stewardship Sequence
 *    field guide."
 *  - No header targets for URLs that 301 away (see next.config.ts redirects()).
 *  - No token-gated routes (e.g. /book/moderate) in public nav.
 */

export type NavItem = {
  label: string;
  href: string;
  /** Short clarifier rendered beside the link in the desktop mega-menu. */
  description?: string;
  /**
   * Path prefixes (e.g. `/churches`) that should count as "active" for this item
   * in the primary header row — used when the hub route is `/organizations` but
   * segment pages live at their own URLs.
   */
  activeWhenPathMatches?: readonly string[];
};

export type NavSection = {
  id: string;
  title: string;
  links: NavItem[];
};

/**
 * A primary-header entry. Either:
 *  - `kind: "link"` — single link rendered flat in the row, or
 *  - `kind: "menu"` — dropdown trigger with one or more mega-menu columns.
 */
export type NavGroup =
  | {
      kind: "link";
      id: string;
      label: string;
      href: string;
      activeWhenPathMatches?: readonly string[];
    }
  | {
      kind: "menu";
      id: string;
      label: string;
      /** Prefixes that mark this dropdown as active in the header. */
      activeWhenPathMatches: readonly string[];
      /** One column per NavSection; ≤ 2 columns recommended per menu. */
      columns: NavSection[];
      /** Optional footer callout rendered inside the dropdown. */
      callout?: {
        eyebrow: string;
        title: string;
        description: string;
        href: string;
        cta: string;
      };
    };

// ---------------------------------------------------------------------------
// Primary header navigation (desktop)
// ---------------------------------------------------------------------------

export const primaryNavGroups: NavGroup[] = [
  {
    kind: "menu",
    id: "story",
    label: "Story",
    activeWhenPathMatches: [
      "/fragmentation",
      "/platform",
      "/system",
      "/book",
      SSSS_FIELD_GUIDE_PATH,
    ],
    columns: [
      {
        id: "story-argument",
        title: "Read the argument",
        links: [
          {
            label: "The Book",
            href: BOOK_HUB_PATH,
            description: "Full manuscript — From Fragmentation to Movement",
          },
          {
            label: "AI Stewardship Sequence field guide",
            href: SSSS_FIELD_GUIDE_PATH,
            description: "Safety, Sandbox, Skills, Solutions — in that order",
          },
        ],
      },
      {
        id: "story-explanation",
        title: "Explanation pages",
        links: [
          {
            label: "The fragmentation story",
            href: "/fragmentation",
            description: "Six-stage narrative — why leaders feel scattered",
          },
          {
            label: "Platform",
            href: "/platform",
            description: "The living system, in plain product terms",
          },
          {
            label: "System",
            href: "/system",
            description: "How connected surfaces compound over time",
          },
        ],
      },
    ],
    callout: {
      eyebrow: "Start with the book",
      title: "From Fragmentation to Movement",
      description:
        "Chapter-by-chapter manuscript — two intelligences, six stages, one integration thesis.",
      href: BOOK_HUB_PATH,
      cta: "Open the book",
    },
  },
  {
    kind: "menu",
    id: "library",
    label: "Library",
    activeWhenPathMatches: [
      "/articles",
      "/articles/canon",
      "/articles/guides",
      "/articles/playbooks",
      "/articles/methodology",
      "/articles/sandbox",
      "/articles/archive",
      "/articles/series",
      "/articles/topic",
    ],
    columns: [
      {
        id: "library-hubs",
        title: "Hubs",
        links: [
          {
            label: "All articles",
            href: "/articles",
            description: "Library index — latest + featured",
          },
          {
            label: "The Canon",
            href: "/articles/canon",
            description: "Core pieces that anchor the model",
          },
          {
            label: "Guides",
            href: "/articles/guides",
            description: "Long-form walkthroughs",
          },
          {
            label: "Playbooks",
            href: "/articles/playbooks",
            description: "Operational patterns you can run",
          },
        ],
      },
      {
        id: "library-indexes",
        title: "Indexes",
        links: [
          {
            label: "Methodology index",
            href: "/articles/methodology",
            description: "Articles organized by method",
          },
          {
            label: "Sandbox canon",
            href: "/articles/sandbox",
            description: "Pieces written inside a Sandbox Season",
          },
          {
            label: "Archive",
            href: "/articles/archive",
            description: "Everything that has ever been published",
          },
        ],
      },
    ],
  },
  {
    // Canonical doctrine: organizations are the primary *implementation*
    // audiences; movement leaders are a distinct trusted-voice / ecosystem
    // layer. See docs/build/strategy/movement-leaders-as-ecosystem-layer.md.
    // This menu keeps movement-leader surfaces findable but separates them
    // from the audience funnel so they do not read as a fourth peer segment.
    kind: "menu",
    id: "audiences",
    label: "Audience",
    activeWhenPathMatches: [
      "/organizations",
      "/movement-leaders",
      "/churches",
      "/nonprofits",
      "/institutions",
      "/who-is-a-movement-leader",
    ],
    columns: [
      {
        id: "audiences-organizations",
        title: "Organizations",
        links: [
          {
            label: "Overview",
            href: "/organizations",
            description: "Churches, nonprofits, institutions — where Movemental is implemented",
          },
          {
            label: "Churches",
            href: "/churches",
            description: "Congregations and denominations",
          },
          {
            label: "Nonprofits",
            href: "/nonprofits",
            description: "Mission-driven organizations",
          },
          {
            label: "Institutions",
            href: "/institutions",
            description: "Universities, agencies, bodies",
          },
        ],
      },
      {
        id: "audiences-movement-leaders",
        title: "Movement leaders",
        links: [
          {
            label: "Who is a movement leader?",
            href: "/who-is-a-movement-leader",
            description: "Working definition + marks",
          },
          {
            label: "For movement leaders",
            href: "/movement-leaders",
            description: "Five failures, five moves — practitioner fit",
          },
          {
            label: "Movement Voices",
            href: "/voices",
            description: "Named leaders shaping the work",
          },
        ],
      },
    ],
  },
  {
    kind: "menu",
    id: "engage",
    label: "Engage",
    activeWhenPathMatches: [
      "/services",
      "/pricing",
      "/methodology",
      "/resources/templates",
    ],
    columns: [
      {
        id: "engage-work",
        title: "Work together",
        links: [
          {
            label: "Services",
            href: "/services",
            description: "Engagement menu + how we partner",
          },
          {
            label: "Sandbox Season",
            href: "/services/sandbox-season",
            description: "12-week build-with-you container",
          },
          {
            label: "Pricing",
            href: "/pricing",
            description: "Economics and comparisons",
          },
        ],
      },
      {
        id: "engage-methodology",
        title: "Methodology & tools",
        links: [
          {
            label: "Methodology",
            href: "/methodology",
            description: "How the work actually runs",
          },
          {
            label: "Eight patterns",
            href: "/methodology/eight-patterns",
            description: "The eight recurring movement patterns",
          },
          {
            label: "Template pack",
            href: "/resources/templates",
            description: "Downloadable working templates",
          },
        ],
      },
    ],
    callout: {
      eyebrow: "Diagnose first",
      title: "Begin with the Assessment",
      description:
        "Most engagements start with a formation snapshot so the work lands where it matters.",
      href: "/assess",
      cta: "Open the assessment",
    },
  },
  {
    kind: "link",
    id: "assess",
    label: "Assess",
    href: "/assess",
    activeWhenPathMatches: ["/assess", "/assess/formation"],
  },
  {
    kind: "menu",
    id: "about",
    label: "About",
    activeWhenPathMatches: ["/about", "/voices", "/faq", "/contact"],
    columns: [
      {
        id: "about-movemental",
        title: "Movemental",
        links: [
          {
            label: "About",
            href: "/about",
            description: "Founders, origin, and the commitments behind the path",
          },
          {
            label: "Movement Voices",
            href: "/voices",
            description: "Named movement leaders shaping the work",
          },
        ],
      },
      {
        id: "about-trust",
        title: "Trust & next step",
        links: [
          {
            label: "FAQ",
            href: "/faq",
            description: "Long-form answers + TOC",
          },
          {
            label: "Contact",
            href: "/contact",
            description: "Start a conversation",
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Footer sections + mobile "Site map" accordion
// ---------------------------------------------------------------------------

/**
 * Grouped link lists used by the footer and the mobile drawer site map.
 * Mirrors primaryNavGroups but flattens mega-menu columns into single
 * link lists per section, and surfaces Assess + Contact explicitly.
 */
export const siteNavSections: NavSection[] = [
  {
    id: "story",
    title: "Story",
    links: [
      { label: "The Book", href: BOOK_HUB_PATH },
      { label: "AI Stewardship Sequence field guide", href: SSSS_FIELD_GUIDE_PATH },
      { label: "The fragmentation story", href: "/fragmentation" },
      { label: "Platform", href: "/platform" },
      { label: "System", href: "/system" },
    ],
  },
  {
    id: "library",
    title: "Library",
    links: [
      { label: "All articles", href: "/articles" },
      { label: "The Canon", href: "/articles/canon" },
      { label: "Guides", href: "/articles/guides" },
      { label: "Playbooks", href: "/articles/playbooks" },
      { label: "Methodology index", href: "/articles/methodology" },
      { label: "Sandbox canon", href: "/articles/sandbox" },
      { label: "Archive", href: "/articles/archive" },
    ],
  },
  {
    // Footer mirror of the primary "Who it serves" menu. Implementation
    // audiences (organizations) are listed first; movement-leader surfaces
    // sit as a distinct cluster, not a fourth peer segment. See
    // docs/build/strategy/movement-leaders-as-ecosystem-layer.md.
    id: "audiences",
    title: "Who it serves",
    links: [
      { label: "Organizations overview", href: "/organizations" },
      { label: "Churches", href: "/churches" },
      { label: "Nonprofits", href: "/nonprofits" },
      { label: "Institutions", href: "/institutions" },
      { label: "Who is a movement leader?", href: "/who-is-a-movement-leader" },
      { label: "For movement leaders", href: "/movement-leaders" },
      { label: "Movement Voices", href: "/voices" },
    ],
  },
  {
    id: "engage",
    title: "Engage",
    links: [
      { label: "Services", href: "/services" },
      { label: "Sandbox Season", href: "/services/sandbox-season" },
      { label: "Pricing", href: "/pricing" },
      { label: "Methodology", href: "/methodology" },
      { label: "Eight patterns", href: "/methodology/eight-patterns" },
      { label: "Template pack", href: "/resources/templates" },
      { label: "Begin assessment", href: "/assess" },
    ],
  },
  {
    id: "trust",
    title: "Trust & next step",
    links: [
      { label: "About", href: "/about" },
      { label: "Movement Voices", href: "/voices" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/** Footer columns — same data as `siteNavSections`. */
export const footerSections: NavSection[] = siteNavSections;

/** Primary CTA in the header + mobile drawer. */
export const siteCtaLink: NavItem = {
  label: "Start a conversation",
  href: "/contact",
};

export const footerLegalLinks: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

// ---------------------------------------------------------------------------
// Active-state helpers
// ---------------------------------------------------------------------------

/** Active route: exact match for home; prefix match for nested routes (e.g. /book/read/…). Hash in `href` is ignored. */
export function isNavActive(pathname: string, href: string): boolean {
  const base = href.split("#")[0] ?? href;
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(`${base}/`);
}

/** True when any `activeWhenPathMatches` prefix is active. */
function matchesPrefixes(
  pathname: string,
  prefixes: readonly string[] | undefined
): boolean {
  if (!prefixes?.length) return false;
  return prefixes.some((base) => pathname === base || pathname.startsWith(`${base}/`));
}

/** Primary header row: honors both `href` and `activeWhenPathMatches`. */
export function isPrimaryNavActive(pathname: string, link: NavItem): boolean {
  if (isNavActive(pathname, link.href)) return true;
  return matchesPrefixes(pathname, link.activeWhenPathMatches);
}

/** Active state for a primary header `NavGroup` (link or menu). */
export function isGroupActive(pathname: string, group: NavGroup): boolean {
  if (group.kind === "link") {
    if (isNavActive(pathname, group.href)) return true;
    return matchesPrefixes(pathname, group.activeWhenPathMatches);
  }
  if (matchesPrefixes(pathname, group.activeWhenPathMatches)) return true;
  return group.columns.some((column) =>
    column.links.some((link) => isNavActive(pathname, link.href))
  );
}
