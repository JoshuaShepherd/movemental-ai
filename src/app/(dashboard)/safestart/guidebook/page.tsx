import { redirect } from "next/navigation";

import { GuidebookView } from "@/components/safestart/guidebook-view";
import { loadSafeStartEngagementState } from "@/lib/safestart/engagement.server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "AI Organizational Guidebook · SafeStart",
};

export default async function SafeStartGuidebookPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=/safestart/guidebook");
  }

  const sp = await searchParams;
  const resolved = await resolveActiveOrganizationId(user.id, sp.org);
  if (!resolved.success) {
    redirect("/dashboard");
  }

  const state = await loadSafeStartEngagementState(resolved.data.organizationId);

  // The "leader" role gate from the spec is not yet plumbed through the
  // membership model — Phase 03 ships the Edit button for everyone with
  // access, with the editor itself stubbed (links back to Drafting). When
  // the membership role lands, swap this for the real check.
  const canEdit = true;

  const ratifiedCount = state.guidebook.filter((s) => s.status === "ratified").length;
  const totalCount = state.guidebook.length;

  return (
    <div className="-mx-[clamp(1.25rem,4vw,2.5rem)] -my-8 flex min-h-[calc(100dvh-4rem)] flex-col bg-background pb-24 pt-12">
      {/* Cover */}
      <header className="mx-auto w-full max-w-[1240px] px-4 sm:px-8 lg:px-0">
        <div className="max-w-[800px]">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
            SafeStart · Artifact
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,4rem)] italic leading-[1.02] tracking-tight text-foreground">
            AI Organizational Guidebook
          </h1>
          <p className="mt-6 max-w-[620px] text-[17px] leading-relaxed text-foreground">
            The five-layer document {state.organizationName} is writing — and will
            ratify — to govern how AI shows up in your work. Each section maps
            to one layer of the Safety field guide&rsquo;s architecture.
          </p>
          <p className="mt-3 max-w-[620px] text-[14px] leading-relaxed text-muted-foreground">
            Read top to bottom. Open the Drafting workspace to add or revise content.
            Sections move through <em>drafted</em> → <em>in review</em> → <em>ratified</em>{" "}
            as the engagement progresses.
          </p>
          <div className="mt-10 flex flex-wrap gap-10 border-t border-border-soft pt-6">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Organization
              </p>
              <p className="mt-1 text-[14px] text-foreground">{state.organizationName}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Sections ratified
              </p>
              <p className="mt-1 text-[14px] text-foreground">
                {ratifiedCount} of {totalCount}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Series
              </p>
              <p className="mt-1 text-[14px] text-foreground">SafeStart, the Movemental Path</p>
            </div>
          </div>
        </div>
      </header>

      {/* TOC + sections */}
      <div className="mt-16">
        <GuidebookView
          sections={state.guidebook.map((s) => ({
            slug: s.slug,
            status: s.status,
            currentVersionNumber: s.currentVersionNumber,
            latestBodyMarkdown: s.latestBodyMarkdown,
          }))}
          canEdit={canEdit}
        />
      </div>
    </div>
  );
}
