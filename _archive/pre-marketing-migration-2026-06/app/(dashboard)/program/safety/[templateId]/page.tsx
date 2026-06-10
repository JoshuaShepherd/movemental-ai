import { notFound } from "next/navigation";

import { ProgramStitchTemplateView } from "@/components/program/program-stitch-template-view";
import { loadProgramTemplateData } from "@/lib/program/load-program-template-data.server";
import { loadStitchTemplatesManifest } from "@/lib/program/stitch-manifest";
import { createClient } from "@/lib/supabase/server";

/** Avoid pre-rendering dozens of migration stubs at build time (memory + churn). */
export const dynamic = "force-dynamic";

export default async function ProgramSafetyTemplatePage({
  params,
  searchParams,
}: {
  params: Promise<{ templateId: string }>;
  searchParams: Promise<{ org?: string }>;
}) {
  const { templateId } = await params;
  const { org: orgSlug } = await searchParams;
  const manifest = loadStitchTemplatesManifest();
  const exists = manifest.templates.some((t) => t.category === "safety" && t.id === templateId);
  if (!exists) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) notFound();

  const { fixture, sourceBadge } = await loadProgramTemplateData(user.id, orgSlug, "safety", templateId);
  return <ProgramStitchTemplateView fixture={fixture} sourceBadge={sourceBadge} />;
}
