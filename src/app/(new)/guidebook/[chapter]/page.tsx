import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { chapterBySlug } from "@/components/mv/guidebook/guidebook";
import { PolicyChapter } from "@/components/mv/guidebook/guidebook-views";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

/** Only written chapters have pages. Today that is Policy, the chapter on the board. */
const VIEWS: Record<string, typeof PolicyChapter> = { policy: PolicyChapter };

export function generateMetadata(): Metadata {
  return { title: "Policy: what people may and may not do | The guidebook" };
}

export default async function GuidebookChapterPage({
  params,
  searchParams,
}: {
  params: Promise<{ chapter: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { chapter } = await params;
  const { edition } = await searchParams;
  const c = chapterBySlug(chapter);
  const View = VIEWS[chapter];
  if (!c?.written || !View) notFound();
  return (
    <>
      <MvHeader />
      <View edition={typeof edition === "string" ? edition : undefined} />
      <MvFooter />
    </>
  );
}
