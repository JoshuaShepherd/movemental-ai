"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DashboardOrgProvider } from "@/components/dashboard/dashboard-org-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

import type { DashboardPersona } from "@/lib/dashboard/dashboard-persona";

type Membership = {
  organizationId: string;
  orgName: string;
  orgSlug: string;
};

export function DashboardShell({
  initialOrgSlug,
  userEmail,
  memberships,
  personaByOrgSlug,
  showAdminLink,
  children,
}: {
  initialOrgSlug: string;
  userEmail: string;
  memberships: Membership[];
  personaByOrgSlug: Record<string, DashboardPersona>;
  showAdminLink: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSlug = searchParams.get("org") ?? initialOrgSlug;

  const setOrgSlug = (slug: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("org", slug);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const active = memberships.find((m) => m.orgSlug === currentSlug) ?? memberships[0];

  const persona: DashboardPersona =
    personaByOrgSlug[currentSlug] ?? personaByOrgSlug[initialOrgSlug] ?? "movement_leader";
  const programNavLabel = persona === "implementation_org" ? "Safety & Sandbox" : "Program";

  return (
    <DashboardOrgProvider initialSlug={currentSlug}>
      <div className="min-h-dvh bg-section text-foreground">
        <header className="bg-card">
          <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-wrap items-center justify-between gap-3 px-[clamp(1.25rem,4vw,2.5rem)] py-4">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="text-[0.95rem] font-semibold tracking-[-0.02em] text-foreground"
              >
                Dashboard
              </Link>
              <nav className="flex flex-wrap items-center gap-3 text-[0.85rem] text-muted-foreground">
                <Link href="/program" className="hover:text-foreground">
                  {programNavLabel}
                </Link>
                <Link href="/dashboard/teaching/claude-skills" className="hover:text-foreground">
                  Teaching library
                </Link>
                <Link href="/welcome" className="hover:text-foreground">
                  Onboarding
                </Link>
                {showAdminLink ? (
                  <Link href="/admin/onboarding" className="hover:text-foreground">
                    Admin
                  </Link>
                ) : null}
              </nav>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {memberships.length > 1 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={cn("gap-1 text-muted-foreground")}
                    >
                      {active?.orgName ?? "Organization"}
                      <ChevronDown className="size-4 opacity-70" aria-hidden />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[12rem]">
                    {memberships.map((m) => (
                      <DropdownMenuItem key={m.organizationId} onClick={() => setOrgSlug(m.orgSlug)}>
                        {m.orgName}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <span className="text-[0.85rem] text-muted-foreground">{active?.orgName}</span>
              )}
              <span className="hidden text-[0.8rem] text-muted-foreground sm:inline">{userEmail}</span>
            </div>
          </div>
        </header>
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[clamp(1.25rem,4vw,2.5rem)] py-8">
          {children}
        </div>
      </div>
    </DashboardOrgProvider>
  );
}
