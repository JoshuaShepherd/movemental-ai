import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MAP_STAGES, stageBySlug } from "@/components/mv/map/stages";
import { StagePage } from "@/components/mv/map/stage-page";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

export const dynamicParams = false;

export function generateStaticParams() {
  return MAP_STAGES.map((s) => ({ stage: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stage: string }>;
}): Promise<Metadata> {
  const stage = stageBySlug((await params).stage);
  return stage
    ? {
        title: `${stage.name} | The Map | Movemental`,
        description: stage.lead,
        alternates: { canonical: `/map-new/${stage.slug}` },
      }
    : {};
}

/** One stage of the Map. Board: Map-Stage (Oct 15, 2026). */
export default async function MapStagePage({ params }: { params: Promise<{ stage: string }> }) {
  const stage = stageBySlug((await params).stage);
  if (!stage) notFound();
  return (
    <>
      <MvHeader />
      <StagePage stage={stage} />
      <MvFooter />
    </>
  );
}
