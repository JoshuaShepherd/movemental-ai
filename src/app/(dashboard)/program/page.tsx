import { redirect } from "next/navigation";

import { ProgramTemplateHub, type ProgramSafetyMacroSection } from "@/components/program/program-template-hub";
import type { DashboardPersona } from "@/lib/dashboard/dashboard-persona";
import { groupTemplatesBySubgroup } from "@/lib/program/group-program-templates";
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
  const sandboxRaw = templates.filter((t) => t.category === "sandbox");

  const safetySorted = sortSafetyTemplatesForPersona(safetyRaw, persona);

  const sandboxBuckets = groupTemplatesBySubgroup(sandboxRaw, subgroupLabels);

  let safetyMacros: ProgramSafetyMacroSection[];

  if (persona === "implementation_org") {
    const { governance, other } = partitionSafetyTemplatesForImplementation(safetySorted);
    const govBuckets = groupTemplatesBySubgroup(governance, subgroupLabels);
    const otherBuckets = groupTemplatesBySubgroup(other, subgroupLabels);

    safetyMacros = [];
    if (govBuckets.some((b) => b.templates.length > 0)) {
      safetyMacros.push({ macroHeading: "Operations & governance", buckets: govBuckets });
    }
    if (otherBuckets.some((b) => b.templates.length > 0)) {
      safetyMacros.push({ macroHeading: "Additional safety templates", buckets: otherBuckets });
    }
  } else {
    safetyMacros = [{ macroHeading: null, buckets: groupTemplatesBySubgroup(safetySorted, subgroupLabels) }];
  }

  return (
    <ProgramTemplateHub
      persona={persona}
      safetyTotalCount={safetySorted.length}
      sandboxTotalCount={sandboxRaw.length}
      safetyMacros={safetyMacros}
      sandboxBuckets={sandboxBuckets}
    />
  );
}
