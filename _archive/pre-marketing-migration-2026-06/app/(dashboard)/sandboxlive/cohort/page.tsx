import { EditorialEmptyState } from "@/components/authenticated/editorial-empty-state";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { organizations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { loadSandboxLiveEngagementState } from "@/lib/sandboxlive/engagement.server";
import {
  SANDBOXLIVE_PHASES,
  type SandboxLivePhaseSlug,
} from "@/lib/sandboxlive/phase-manifest";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Cohort · SandboxLive",
};

export default async function SandboxLiveCohortPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=/sandboxlive/cohort");
  }

  const sp = await searchParams;
  const resolved = await resolveActiveOrganizationId(user.id, sp.org);
  if (!resolved.success) {
    redirect("/dashboard");
  }

  const [org] = await db
    .select({
      id: organizations.id,
      name: organizations.name,
      slug: organizations.slug,
      organization_type: organizations.organization_type,
      city: organizations.city,
      country: organizations.country,
      cohort_start_date: organizations.cohort_start_date,
    })
    .from(organizations)
    .where(eq(organizations.id, resolved.data.organizationId))
    .limit(1);

  const state = await loadSandboxLiveEngagementState(resolved.data.organizationId);
  const currentPhase = state.currentPhaseSlug
    ? SANDBOXLIVE_PHASES.find((p) => p.slug === state.currentPhaseSlug)
    : null;

  // Single-organization preview until multi-organization cohort rostering ships.
  const cohortMembers = [
    {
      organizationId: org?.id ?? resolved.data.organizationId,
      organizationName: org?.name ?? "Your organization",
      organizationType: org?.organization_type ?? null,
      location:
        [org?.city, org?.country].filter(Boolean).join(", ") || null,
      currentPhaseSlug: state.currentPhaseSlug,
      leaderName: null as string | null,
      leaderRole: null as string | null,
      isYou: true,
    },
  ];

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
          SandboxLive · Cohort
        </span>
        <h1 className="font-serif text-[clamp(2.25rem,4.5vw,2.75rem)] italic leading-tight tracking-tight text-foreground">
          The cohort
        </h1>
        <p className="max-w-[680px] text-[15px] leading-relaxed text-muted-foreground">
          Every organization in the cohort, the leaders representing them, and the
          phase each is currently working through. {org?.cohort_start_date ? (
            <>
              This cohort began on{" "}
              <strong className="font-medium text-foreground">
                {new Date(org.cohort_start_date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </strong>.
            </>
          ) : null}
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-[20px] italic text-foreground">
          Cohort members
        </h2>

        <ul className="grid grid-cols-1 gap-px bg-border-soft md:grid-cols-2">
          {cohortMembers.map((m) => {
            const phase = m.currentPhaseSlug
              ? SANDBOXLIVE_PHASES.find((p) => p.slug === (m.currentPhaseSlug as SandboxLivePhaseSlug))
              : null;
            return (
              <li key={m.organizationId} className="bg-card">
                <article className="flex h-full flex-col gap-4 p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[16px] font-medium leading-tight text-foreground">
                      {m.organizationName}
                    </h3>
                    {m.isYou ? (
                      <span className="text-[9px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
                        You
                      </span>
                    ) : null}
                  </div>
                  {m.location || m.organizationType ? (
                    <p className="text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
                      {[m.organizationType, m.location].filter(Boolean).join(" · ")}
                    </p>
                  ) : null}
                  {m.leaderName ? (
                    <p className="text-[13px] text-foreground">
                      {m.leaderName}
                      {m.leaderRole ? (
                        <span className="text-muted-foreground"> · {m.leaderRole}</span>
                      ) : null}
                    </p>
                  ) : (
                    <p className="text-[12px] leading-relaxed text-muted-foreground">
                      Representative leader name and role will appear here once your
                      cohort roster is linked to this organization record.
                    </p>
                  )}
                  <div className="mt-auto flex items-baseline gap-3 border-t border-border-soft pt-4">
                    <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                      Currently
                    </span>
                    {phase ? (
                      <span className="text-[13px] text-foreground">
                        <span className="font-serif italic text-pathway-accent">{phase.number}</span>{" "}
                        {phase.name}
                      </span>
                    ) : (
                      <span className="text-[13px] italic text-muted-foreground">Not yet engaged</span>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        {/* Editorial framing for the not-yet-wired cohort grouping. */}
        <aside className="border border-border-soft bg-section p-6">
          <EditorialEmptyState eyebrow="About this view" title="The full cohort list is still arriving." tone="default">
            <p>
              Movemental is finishing the roster that ties every organization in your SandboxLive cohort together with
              the leaders who represent them. When that work is complete, this page will show each member, their
              contact, and the phase they are in. For now you see your own organization
              {currentPhase ? (
                <>
                  {" "}
                  and the phase you are working through ({currentPhase.name}).
                </>
              ) : (
                "."
              )}
            </p>
          </EditorialEmptyState>
        </aside>
      </section>
    </div>
  );
}
