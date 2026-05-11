import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Display } from "@/components/primitives/display";
import { Prose } from "@/components/primitives/prose";
import { Section } from "@/components/primitives/section";
import { getMovementLeaderBySlug } from "@/lib/movement-leaders/movement-leaders.server";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const leader = await getMovementLeaderBySlug(slug);
  if (!leader?.public_page_published_at) {
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
  if (!leader?.public_page_published_at) {
    notFound();
  }

  return (
    <Section variant="default" spacing="lg" className="flex-1">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[clamp(1.25rem,4vw,2.5rem)]">
        <header className="mb-10 space-y-4">
          <Display as="h1" size="md" className="text-balance">
            {leader.full_name}
          </Display>
          {leader.primary_role || leader.primary_organization ? (
            <p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">
              {[leader.primary_role, leader.primary_organization].filter(Boolean).join(" · ")}
            </p>
          ) : null}
        </header>
        {leader.photo_url ? (
          // Headshot URLs are arbitrary external storage; skip optimizer config.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={leader.photo_url}
            alt={leader.full_name}
            className="mb-10 max-h-80 w-auto rounded-lg object-cover shadow-ambient"
          />
        ) : null}
        <Prose as="article" className="max-w-none">
          {leader.bio_long ? (
            <div className="whitespace-pre-wrap text-muted-foreground">{leader.bio_long}</div>
          ) : leader.bio_short ? (
            <p>{leader.bio_short}</p>
          ) : (
            <p className="text-muted-foreground">Bio coming soon.</p>
          )}
        </Prose>
      </div>
    </Section>
  );
}
