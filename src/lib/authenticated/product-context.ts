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
 * **When to add a branch here** — Add a new `if (pathname === "/foo" || …)`
 * when an entire URL subtree should show a **distinct product badge** and a
 * **static or manifest-driven sidebar** owned by that product. Keep the branch
 * thin: delegate section arrays to `src/lib/<product>/…-sidebar.ts` or a
 * manifest mapper (see `buildSandboxLiveSidebarSections`).
 *
 * **When *not* to add a branch** — Deep links that belong inside an existing
 * product (e.g. Future Plan at `/sandboxlive/phase/08-future-plan`, recipes at
 * `/sandboxlive/recipes`) stay under the parent prefix so `productContext`
 * stays `sandbox` and the sidebar stays driven by phase manifests—no new
 * `ProductContext` enum value.
 *
 * **Dynamic sidebars (per user / per org)** — Do not grow JSX inside
 * `AuthenticatedShell`. Resolve sections in `(dashboard)/layout.tsx` (or a
 * product layout) using server data, then pass `sidebar` into the shell—as
 * SandboxLive already does for the Organization admin block via
 * `buildSandboxLiveSidebarSections({ includeOrganizationAdmin })`.
 */

export interface AuthenticatedShellContext {
  productContext: ProductContext;
  sidebar?: AuthenticatedSidebarSection[];
}

const LEADER_SIDEBAR: AuthenticatedSidebarSection[] = [
  {
    label: "Author reflection",
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
