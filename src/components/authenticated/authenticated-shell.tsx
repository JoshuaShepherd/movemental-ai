"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, LogOut } from "lucide-react";

import { DashboardOrgProvider } from "@/components/dashboard/dashboard-org-context";
import {
  getWorkspacePrimaryNavItems,
  withOrgIfNeeded,
} from "@/lib/authenticated/workspace-primary-nav";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import {
  onboardingShellEditorialLabel,
  type OnboardingShellKind,
} from "@/lib/onboarding/shell-progress-labels";
import { cn } from "@/lib/utils";

import type { DashboardPersona } from "@/lib/dashboard/dashboard-persona";

/**
 * AuthenticatedShell — the single chrome for every signed-in surface.
 *
 * Replaces the previous DashboardShell + ProgramShell pair (which produced
 * stacked midnight headers / footers when /program routes rendered inside the
 * dashboard layout). One persistent top nav, an optional product sidebar, and
 * an optional onboarding progress rail beneath the nav.
 *
 * Product shells (SandboxLive, SafeStart, Leader) opt in via `productContext`
 * and pass a `sidebar` configuration. Cohort recipes and Future Plan live
 * under SandboxLive URLs (`/sandboxlive/recipes`, phase `08-future-plan`), not
 * separate top-level product contexts.
 *
 * The general workspace passes `productContext: null` and shows Tier A links
 * from `getWorkspacePrimaryNavItems`. When a product sidebar is active, the
 * same links are available from the **Workspace** dropdown (one click to open,
 * second click to navigate).
 */

export type ProductContext = "sandbox" | "safe" | "leader" | null;

type Membership = {
  organizationId: string;
  orgName: string;
  orgSlug: string;
};

export type AuthenticatedSidebarItem = {
  label: string;
  href: string;
  /** Optional leading numeral (e.g. "01" for SandboxLive phases). */
  number?: string;
};

export type AuthenticatedSidebarSection = {
  /** Optional small uppercase label rendered above the items. */
  label?: string;
  items: AuthenticatedSidebarItem[];
};

const PRODUCT_LABELS: Record<Exclude<ProductContext, null>, string> = {
  sandbox: "SandboxLive",
  safe: "SafeStart",
  leader: "Leader",
};

export function AuthenticatedShell({
  initialOrgSlug,
  userEmail,
  memberships,
  personaByOrgSlug,
  showAdminLink,
  productContext = null,
  sidebar,
  onboardingProgress,
  onboardingShellKind = "org",
  hasLeaderWorkspace = false,
  workspaceFallbackLabel = null,
  children,
}: {
  initialOrgSlug: string;
  userEmail: string;
  memberships: Membership[];
  personaByOrgSlug: Record<string, DashboardPersona>;
  showAdminLink: boolean;
  productContext?: ProductContext;
  sidebar?: AuthenticatedSidebarSection[];
  /** 0..99 while onboarding is incomplete. Omitted when finished or not applicable. */
  onboardingProgress?: number;
  /** Drives editorial line under the progress rail (org vs leader copy). */
  onboardingShellKind?: OnboardingShellKind;
  /** Signed-in user has a `movement_leaders` row (matched on email). */
  hasLeaderWorkspace?: boolean;
  /** Shown in the header when there are no org memberships (leader-only accounts). */
  workspaceFallbackLabel?: string | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSlug = searchParams.get("org") ?? initialOrgSlug;

  const setOrgSlug = (slug: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("org", slug);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const active =
    memberships.length > 0
      ? (memberships.find((m) => m.orgSlug === currentSlug) ?? memberships[0])
      : null;

  const persona: DashboardPersona =
    (currentSlug && personaByOrgSlug[currentSlug]) ||
    personaByOrgSlug[initialOrgSlug] ||
    "movement_leader";
  const programNavLabel = persona === "implementation_org" ? "Safety & Sandbox" : "Program";

  const productLabel = productContext ? PRODUCT_LABELS[productContext] : null;
  const onLeaderProduct = pathname === "/leader" || pathname.startsWith("/leader/");
  const showProgressRail =
    typeof onboardingProgress === "number" && onboardingProgress < 100;

  const renderSidebar = sidebar && productContext;

  const workspaceNavItems = getWorkspacePrimaryNavItems({
    programNavLabel,
    showStaff: showAdminLink,
  });

  const workspaceMenuDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1 rounded-none text-[13px] text-white/80 hover:bg-white/10 hover:text-white"
        >
          Workspace
          <ChevronDown className="size-4 shrink-0 opacity-70" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[14rem]">
        {workspaceNavItems.map((item) => (
          <DropdownMenuItem key={item.href + item.label} asChild>
            <Link href={withOrgIfNeeded(item, currentSlug)} className="cursor-pointer">
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const renderWorkspaceNavLink = (item: (typeof workspaceNavItems)[number], className: string) => (
    <Link key={item.href + item.label} href={withOrgIfNeeded(item, currentSlug)} className={className}>
      {item.label}
    </Link>
  );

  return (
    <DashboardOrgProvider initialSlug={currentSlug}>
      <div className="flex min-h-dvh flex-col bg-background text-foreground">
        <header className="bg-movemental-midnight text-white print:hidden">
          <div className="mx-auto flex h-16 w-full max-w-[var(--container-max)] items-center justify-between gap-3 px-[clamp(1.25rem,4vw,2.5rem)]">
            <div className="flex min-w-0 items-center gap-4">
              <Link
                href="/dashboard"
                className="font-serif text-[18px] italic leading-none text-white"
              >
                Movemental
              </Link>
              {productLabel ? (
                <>
                  <span aria-hidden className="hidden h-4 w-[0.5px] shrink-0 bg-white/25 sm:block" />
                  <span className="rounded-none border border-[0.5px] border-pathway-accent/55 bg-pathway-accent/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-pathway-accent">
                    {productLabel}
                  </span>
                </>
              ) : null}
              <div className="lg:hidden">{workspaceMenuDropdown}</div>
              {productLabel ? (
                <div className="hidden lg:block">{workspaceMenuDropdown}</div>
              ) : (
                <nav
                  className="hidden max-w-[min(52rem,calc(100vw-14rem))] flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-white/70 lg:flex"
                  aria-label="Workspace"
                >
                  {workspaceNavItems.map((item) =>
                    renderWorkspaceNavLink(item, "shrink-0 hover:text-white"),
                  )}
                </nav>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              {memberships.length >= 1 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="max-w-[14rem] gap-1 rounded-none text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      <span className="truncate">{active?.orgName ?? "Organization"}</span>
                      <ChevronDown className="size-4 shrink-0 opacity-70" aria-hidden />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[12rem]">
                    {memberships.map((m) => (
                      <DropdownMenuItem
                        key={m.organizationId}
                        onClick={() => setOrgSlug(m.orgSlug)}
                        className={cn(m.orgSlug === currentSlug && "bg-section")}
                      >
                        {m.orgName}
                      </DropdownMenuItem>
                    ))}
                    {hasLeaderWorkspace ? (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/leader">Leader workspace</Link>
                        </DropdownMenuItem>
                      </>
                    ) : null}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : workspaceFallbackLabel ? (
                <span className="max-w-[14rem] truncate text-[13px] text-white/70">{workspaceFallbackLabel}</span>
              ) : null}
              {hasLeaderWorkspace && !onLeaderProduct && memberships.length === 0 ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  asChild
                  className="rounded-none text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/leader">Leader workspace</Link>
                </Button>
              ) : null}
              {memberships.length > 0 && onLeaderProduct ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  asChild
                  className="rounded-none text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : null}
              <span className="hidden text-[12px] text-white/60 md:inline">
                {userEmail}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="rounded-none text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Sign out"
              >
                <LogOut className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
          {showProgressRail ? (
            <div className="w-full">
              <div className="h-0.5 w-full bg-white/10" aria-hidden>
                <div
                  className="h-full bg-pathway-accent transition-[width] duration-300 ease-out"
                  style={{ width: `${onboardingProgress}%` }}
                />
              </div>
              <div className="mx-auto flex max-w-[var(--container-max)] justify-end px-[clamp(1.25rem,4vw,2.5rem)] pb-1.5 pt-1">
                <p className="text-right font-sans text-[11px] italic leading-snug text-white/65">
                  {onboardingShellEditorialLabel(onboardingShellKind, onboardingProgress)}
                </p>
              </div>
            </div>
          ) : null}
        </header>

        {renderSidebar ? (
          <div className="flex flex-1">
            <aside className="hidden w-60 shrink-0 bg-movemental-midnight text-white md:block print:hidden">
              <nav className="flex flex-col py-2" aria-label="Product sections">
                {sidebar.map((section, sectionIdx) => (
                  <div
                    key={sectionIdx}
                    className={cn(
                      "flex flex-col",
                      sectionIdx > 0 && "border-t border-[0.5px] border-white/12",
                    )}
                  >
                    {section.label ? (
                      <div className="px-5 py-3 text-[10px] font-medium uppercase tracking-[0.1em] text-white/40">
                        {section.label}
                      </div>
                    ) : null}
                    {section.items.map((item) => {
                      const isActive =
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-baseline gap-3 border-b border-[0.5px] border-white/[0.08] border-l-[3px] px-5 py-[12px] font-sans text-[13px] leading-snug transition-colors last:border-b-0",
                            isActive
                              ? "border-l-pathway-accent bg-white/[0.03] text-pathway-accent"
                              : "border-l-transparent text-white/70 hover:bg-white/[0.03] hover:text-white",
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item.number ? (
                            <span
                              className={cn(
                                "shrink-0 font-serif text-[13px] italic tabular-nums",
                                isActive ? "text-pathway-accent" : "text-pathway-accent/80",
                              )}
                            >
                              {item.number}
                            </span>
                          ) : null}
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </aside>
            <div className="min-w-0 flex-1 bg-background">
              <div className="mx-auto w-full max-w-[var(--container-max)] px-[clamp(1.25rem,4vw,2.5rem)] py-8">
                {children}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-background">
            <div className="mx-auto w-full max-w-[var(--container-max)] px-[clamp(1.25rem,4vw,2.5rem)] py-8">
              {children}
            </div>
          </div>
        )}
      </div>
    </DashboardOrgProvider>
  );
}
