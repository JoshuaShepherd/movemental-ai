import type {
  AuthenticatedSidebarSection,
  ProductContext,
} from "@/components/authenticated/authenticated-shell";
import { buildSafeStartSidebarSections, buildSandboxLiveSidebarSections } from "@/lib/sandboxlive/sandboxlive-sidebar";

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

export function resolveAuthenticatedShellContext(
  pathname: string,
): AuthenticatedShellContext {
  if (pathname === "/sandboxlive" || pathname.startsWith("/sandboxlive/")) {
    return {
      productContext: "sandbox",
      sidebar: buildSandboxLiveSidebarSections({ includeOrganizationAdmin: false }),
    };
  }

  if (pathname === "/safestart" || pathname.startsWith("/safestart/")) {
    return {
      productContext: "safe",
      sidebar: buildSafeStartSidebarSections(),
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
