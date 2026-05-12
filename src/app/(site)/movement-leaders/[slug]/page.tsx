import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MovementLeaderPublicPageView } from "@/components/movement-leaders/movement-leader-public-page-view";
import { getMovementLeaderBySlug } from "@/lib/movement-leaders/movement-leaders.server";
import { publicLeaderPageModelFromLeader } from "@/lib/movement-leaders/public-page-model";
import { isMovementLeaderPubliclyVisible } from "@/lib/movement-leaders/public-page-ratification.server";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const leader = await getMovementLeaderBySlug(slug);
  if (!leader || !(await isMovementLeaderPubliclyVisible(leader))) {
    return { title: "Movement leader" };
  }
  return {
    title: leader.full_name,
    description: leader.bio_short ?? `Trusted voice — ${leader.full_name}`,
  };
}

export default async function PublicMovementLeaderPage({ params }: Props) {
  const { slug } = await params;
  const leader = await getMovementLeaderBySlug(slug);
  if (!leader || !(await isMovementLeaderPubliclyVisible(leader))) {
    notFound();
  }

  const model = publicLeaderPageModelFromLeader(leader);

  return <MovementLeaderPublicPageView model={model} />;
}
