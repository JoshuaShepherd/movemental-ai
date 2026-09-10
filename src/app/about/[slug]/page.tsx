import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { FounderDetailView } from "@/v2/components/founders/founder-detail-view";
import {
  FOUNDER_SLUGS,
  FOUNDER_SLUG_ALIASES,
  getFounderBySlug,
  resolveFounderSlug,
} from "@/lib/founders/content";
import { buildFounderPersonJsonLd } from "@/lib/founders/person-schema";
import { canonicalPageUrl } from "@/lib/site-url";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams(): { slug: string }[] {
  const aliases = Object.keys(FOUNDER_SLUG_ALIASES);
  return [...FOUNDER_SLUGS, ...aliases].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getFounderBySlug(slug);
  if (!profile) {
    return { title: "Founder" };
  }

  const canonical = canonicalPageUrl(`/about/${profile.slug}`);

  return {
    title: `${profile.name} — ${profile.jobTitle} | Movemental`,
    description: profile.oneLine,
    alternates: { canonical: canonical ?? undefined },
    openGraph: {
      url: canonical ?? undefined,
      title: profile.name,
      description: profile.oneLine,
      type: "profile",
    },
  };
}

export default async function V2FounderSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const resolved = resolveFounderSlug(slug);
  const profile = getFounderBySlug(slug);

  if (!resolved || !profile) {
    notFound();
  }

  if (slug !== profile.slug) {
    permanentRedirect(`/about/${profile.slug}`);
  }

  const jsonLd = buildFounderPersonJsonLd(profile);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FounderDetailView profile={profile} />
    </>
  );
}
