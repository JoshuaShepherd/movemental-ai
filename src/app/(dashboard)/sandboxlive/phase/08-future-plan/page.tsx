import Link from "next/link";
import { redirect } from "next/navigation";

import { FuturePlanEditor } from "@/components/sandboxlive/future-plan-editor";
import { loadFuturePlanState } from "@/lib/sandboxlive/future-plan.server";
import { getSandboxLivePhase } from "@/lib/sandboxlive/phase-manifest";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

import { saveSectionAction } from "./actions";

export const metadata = {
  title: "Future Plan · SandboxLive",
};

export default async function FuturePlanEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=/sandboxlive/phase/08-future-plan");
  }

  const sp = await searchParams;
  const resolved = await resolveActiveOrganizationId(user.id, sp.org);
  if (!resolved.success) {
    redirect("/dashboard");
  }

  const phase = getSandboxLivePhase("08-future-plan")!;
  const state = await loadFuturePlanState(resolved.data.organizationId);
  const orgQuery = sp.org ? `?org=${sp.org}` : "";

  return (
    <div className="-mx-[clamp(1.25rem,4vw,2.5rem)] -my-8 flex min-h-[calc(100dvh-4rem)] flex-col bg-safestart-bg text-safestart-ink selection:bg-pathway-accent/20">
      {/* Phase header */}
      <header className="border-b border-safestart-hairline bg-safestart-bg">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-10 md:px-12 md:py-14">
          <Link
            href={`/sandboxlive${orgQuery}`}
            className="self-start text-[11px] font-medium uppercase tracking-[0.1em] text-safestart-muted transition-colors hover:text-pathway-accent"
          >
            ← SandboxLive
          </Link>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
                Phase {phase.number} — {phase.name}
              </p>
              <h1 className="font-serif text-[clamp(2.25rem,4.5vw,2.75rem)] italic leading-[1.05] tracking-tight text-safestart-ink">
                Compose the Future Plan
              </h1>
              <p className="max-w-[680px] text-[15px] leading-relaxed text-safestart-muted">
                {phase.produces}
              </p>
            </div>
            <Link
              href={`/sandboxlive/phase/08-future-plan/export${orgQuery}`}
              className="shrink-0 inline-flex items-center gap-2 border border-safestart-hairline bg-safestart-bg px-4 py-2 text-[12px] font-medium text-safestart-ink transition-colors hover:bg-safestart-surface-container"
            >
              Board export →
            </Link>
          </div>
        </div>
      </header>

      {/* Editor */}
      <FuturePlanEditor
        organizationName={state.organizationName}
        content={state.content}
        currentVersion={state.currentVersion}
        status={state.status}
        orgSlug={sp.org}
        onSaveSection={saveSectionAction}
      />
    </div>
  );
}
