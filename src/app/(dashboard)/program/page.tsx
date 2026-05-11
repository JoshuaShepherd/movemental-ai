import Link from "next/link";
import { redirect } from "next/navigation";

import type { DashboardPersona } from "@/lib/dashboard/dashboard-persona";
import { loadStitchTemplatesManifest } from "@/lib/program/stitch-manifest";
import {
  partitionSafetyTemplatesForImplementation,
  sortSafetyTemplatesForPersona,
} from "@/lib/program/sort-templates-for-dashboard-persona";
import { resolveDashboardContextForSessionUser } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export default async function ProgramIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=/program");
  }

  const sp = await searchParams;
  const ctx = await resolveDashboardContextForSessionUser(user.id, sp.org);
  const persona: DashboardPersona = ctx?.persona ?? "movement_leader";

  const { templates, subgroupLabels } = loadStitchTemplatesManifest();
  const safetyRaw = templates.filter((t) => t.category === "safety");
  const sandbox = templates.filter((t) => t.category === "sandbox");

  const safetySorted = sortSafetyTemplatesForPersona(safetyRaw, persona);
  const { governance, other } =
    persona === "implementation_org"
      ? partitionSafetyTemplatesForImplementation(safetySorted)
      : { governance: safetySorted, other: [] as typeof safetySorted };

  const renderList = (items: typeof templates) => (
    <ul className="mt-4 columns-1 gap-x-8 text-sm text-muted-foreground md:columns-2">
      {items.map((t) => (
        <li key={t.id} className="mb-2 break-inside-avoid">
          <Link href={`/program/${t.category}/${t.id}`} className="hover:text-pathway-accent hover:underline">
            {t.title}
          </Link>
          <span className="ml-2 text-xs opacity-80">
            ({subgroupLabels[t.subgroup] ?? t.subgroup})
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-[-0.02em] text-foreground">Program templates</h1>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        {persona === "implementation_org" ? (
          <>
            Authenticated Safety and Sandbox hub for organizational governance. Start with operations-ready
            Safety templates (policy, inventory, ratification), then explore Sandbox when your facilitated
            sequence calls for it. Manifest source:{" "}
            <code className="rounded bg-muted px-1 text-xs">movemental-stitch-dashboard</code>.
          </>
        ) : (
          <>
            Authenticated-only Stitch migration hub. Routes mirror the consolidated manifest from{" "}
            <code className="rounded bg-muted px-1 text-xs">movemental-stitch-dashboard</code>. Marketing pathway
            pages on the public site are unrelated.
          </>
        )}
      </p>

      <section className="mt-10">
        <h2 className="font-headline text-base italic text-foreground">Safety ({safetySorted.length})</h2>
        {persona === "implementation_org" && governance.length > 0 ? (
          <>
            <h3 className="mt-6 text-sm font-medium text-foreground">Operations &amp; governance</h3>
            {renderList(governance)}
            {other.length > 0 ? (
              <>
                <h3 className="mt-8 text-sm font-medium text-foreground">Additional safety templates</h3>
                {renderList(other)}
              </>
            ) : null}
          </>
        ) : (
          renderList(safetySorted)
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-headline text-base italic text-foreground">Sandbox ({sandbox.length})</h2>
        {renderList(sandbox)}
      </section>
    </div>
  );
}
