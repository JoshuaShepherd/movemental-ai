import Link from "next/link";
import { redirect } from "next/navigation";

import { Eyebrow } from "@/components/primitives/eyebrow";
import type { DashboardPersona } from "@/lib/dashboard/dashboard-persona";
import { resolveDashboardContextForSessionUser } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";
import { BookOpen, ClipboardList, LayoutGrid, Shield } from "lucide-react";

type Destination = {
  href: string;
  title: string;
  description: string;
  icon: typeof LayoutGrid;
};

function destinationsForPersona(persona: DashboardPersona): Destination[] {
  const program: Destination = {
    href: "/program",
    title: "Program templates",
    description:
      persona === "implementation_org"
        ? "Safety and Sandbox screens aligned to governance, inventory, and board-ready sequences—preview each template with your active organization context."
        : "Safety and Sandbox working surfaces from Movemental’s curated template library—open any card for a signed-in preview with your active organization when one is selected.",
    icon: LayoutGrid,
  };

  const teaching: Destination = {
    href: "/dashboard/teaching/claude-skills",
    title: "Teaching library",
    description:
      "Structured guide to Claude Skills for mission-driven leaders—eight chapters from intuition through practice.",
    icon: BookOpen,
  };

  const onboarding: Destination = {
    href: "/welcome",
    title: "Full onboarding checklist",
    description:
      persona === "implementation_org"
        ? "Expanded checklist with cohort date and every phase—use it to align operations, programs, and development before kickoff."
        : "Open the expanded checklist with cohort date and every phase. The compact checklist stays pinned above on this overview.",
    icon: ClipboardList,
  };

  if (persona === "implementation_org") {
    return [program, onboarding, teaching];
  }
  return [program, teaching, onboarding];
}

export default async function DashboardHomePage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=/dashboard");
  }

  const sp = await searchParams;
  const ctx = await resolveDashboardContextForSessionUser(user.id, sp.org);
  const persona = ctx?.persona ?? "movement_leader";

  const destinations = destinationsForPersona(persona);

  return (
    <div className="flex flex-col gap-10">
      <header className="max-w-prose">
        <Eyebrow className="mb-2">Workspace</Eyebrow>
        <h1 className="font-serif text-[clamp(1.75rem,3.5vw,2.25rem)] italic leading-tight tracking-tight text-foreground">
          Overview
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {persona === "implementation_org" ? (
            <>
              Your signed-in hub for organizational governance work. Use Program templates for Safety and
              Sandbox sequences, keep onboarding moving so inventory and policy stay aligned with your board
              stance, and switch organizations in the header when you belong to more than one.
            </>
          ) : (
            <>
              Your signed-in hub after login. Use the header to switch organizations when you belong to more
              than one. The onboarding panel above tracks commitments and later phases until your organization
              is fully onboarded.
            </>
          )}
        </p>
      </header>

      <section aria-labelledby="dashboard-modules-heading">
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-muted-foreground" aria-hidden />
          <h2 id="dashboard-modules-heading" className="text-[0.95rem] font-medium text-foreground">
            Modules in this workspace
          </h2>
        </div>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {destinations.map(({ href, title, description, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex h-full flex-col border-[0.5px] border-border-soft bg-card px-5 py-5 text-left transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-section"
              >
                <span className="flex size-9 items-center justify-center bg-section text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="mt-4 text-[0.95rem] font-semibold text-foreground">{title}</span>
                <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</span>
                <span className="mt-4 text-sm font-medium text-pathway-accent underline decoration-pathway-accent/50 decoration-[0.5px] underline-offset-4">
                  Open →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
