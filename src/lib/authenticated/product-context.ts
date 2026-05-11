import type {
  AuthenticatedSidebarSection,
  ProductContext,
} from "@/components/authenticated/authenticated-shell";
import { SAFESTART_WORKSPACES } from "@/lib/safestart/workspace-manifest";
import { SANDBOXLIVE_PHASES } from "@/lib/sandboxlive/phase-manifest";

/**
 * Decides what product context + sidebar the AuthenticatedShell should render
 * for a given pathname. Used by `(dashboard)/layout.tsx` so a single shell
 * wraps every authenticated route — including future product shells — without
 * forcing each segment to redeclare the chrome.
 *
 * Sidebar configurations are intentionally static here. If a product later
 * needs per-request sidebar items (e.g. Leader sections vary per user),
 * promote that product's sidebar to a server-side resolver instead.
 */

export interface AuthenticatedShellContext {
  productContext: ProductContext;
  sidebar?: AuthenticatedSidebarSection[];
}

const SANDBOXLIVE_SIDEBAR: AuthenticatedSidebarSection[] = [
  {
    label: "Phases",
    items: SANDBOXLIVE_PHASES.map((p) => ({
      label: p.name,
      href: `/sandboxlive/phase/${p.slug}`,
      number: p.number,
    })),
  },
  {
    label: "Cohort",
    items: [
      { label: "Recipe Library", href: "/sandboxlive/recipes" },
      { label: "Cohort view", href: "/sandboxlive/cohort" },
      { label: "Sponsor oversight", href: "/sandboxlive/sponsor-oversight" },
    ],
  },
];

const LEADER_SIDEBAR: AuthenticatedSidebarSection[] = [
  {
    label: "Reflected understanding",
    items: [
      { label: "Overview", href: "/leader", number: "00" },
      { label: "Calling", href: "/leader/calling", number: "01" },
      { label: "Work", href: "/leader/work", number: "02" },
      { label: "Voice", href: "/leader/voice", number: "03" },
      { label: "Where it lives", href: "/leader/where-it-lives", number: "04" },
      { label: "Network", href: "/leader/network", number: "05" },
      { label: "Gaps", href: "/leader/gaps", number: "06" },
    ],
  },
  {
    label: "Publish",
    items: [
      { label: "Public page", href: "/leader/public-page" },
      { label: "Sign commitments", href: "/leader/sign-commitments" },
    ],
  },
];

const SAFESTART_SIDEBAR: AuthenticatedSidebarSection[] = [
  {
    label: "Engagement",
    items: SAFESTART_WORKSPACES.map((w) => ({
      label: w.name,
      href: `/safestart/${w.slug}`,
      number: String(w.order).padStart(2, "0"),
    })),
  },
  {
    label: "Artifact",
    items: [{ label: "AI Organizational Guidebook", href: "/safestart/guidebook" }],
  },
];

export function resolveAuthenticatedShellContext(
  pathname: string,
): AuthenticatedShellContext {
  if (pathname === "/sandboxlive" || pathname.startsWith("/sandboxlive/")) {
    return {
      productContext: "sandbox",
      sidebar: SANDBOXLIVE_SIDEBAR,
    };
  }

  if (pathname === "/safestart" || pathname.startsWith("/safestart/")) {
    return {
      productContext: "safe",
      sidebar: SAFESTART_SIDEBAR,
    };
  }

  if (pathname === "/leader" || pathname.startsWith("/leader/")) {
    if (pathname === "/leader/apply") {
      return { productContext: null };
    }
    return {
      productContext: "leader",
      sidebar: LEADER_SIDEBAR,
    };
  }

  return { productContext: null };
}
