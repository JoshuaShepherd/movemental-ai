import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LEADERS, leaderBySlug } from "@/components/mv/leaders/leaders";
import { LeaderProfile } from "@/components/mv/leaders/leaders-views";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEADERS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const l = leaderBySlug((await params).slug);
  return l
    ? { title: `${l.name} | Movement leaders | Movemental`, alternates: { canonical: `/leaders/${l.slug}` } }
    : {};
}

/** One movement leader. Board: Leader-Profile. */
export default async function LeaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const leader = leaderBySlug((await params).slug);
  if (!leader) notFound();
  return (
    <>
      <MvHeader />
      <LeaderProfile leader={leader} />
      <MvFooter />
    </>
  );
}
