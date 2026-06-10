import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/studio/Container";
import {
  SITE_FOUNDER_SLUGS,
  getSiteFounderBySlug,
  type SiteFounderSlug,
} from "@/lib/site-founders";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams(): { slug: SiteFounderSlug }[] {
  return SITE_FOUNDER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const founder = getSiteFounderBySlug(slug);
  if (!founder) {
    return { title: "Founder" };
  }
  return {
    title: founder.name,
    description: founder.bioSummary,
  };
}

export default async function FounderBioPage({ params }: PageProps) {
  const { slug } = await params;
  const founder = getSiteFounderBySlug(slug);
  if (!founder) {
    notFound();
  }

  return (
    <section
      className="band-default border-b border-border py-16 md:py-24"
      aria-labelledby="founder-bio-h1"
    >
      <Container className="max-w-(--prose-max)">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
          Founder
        </p>
        <h1
          id="founder-bio-h1"
          className="mt-3 font-serif italic text-4xl font-normal tracking-tight text-foreground md:text-5xl"
        >
          {founder.name}
        </h1>
        <p className="mt-2 text-sm font-medium text-muted-foreground">{founder.shortTitle}</p>
        <p className="mt-8 text-[1.0625rem] leading-relaxed text-foreground">{founder.bioSummary}</p>
        <p className="mt-10">
          <Link
            href={`/about#${founder.aboutAnchorId}`}
            className="text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
          >
            Read the full founder story on About
          </Link>
        </p>
      </Container>
    </section>
  );
}
