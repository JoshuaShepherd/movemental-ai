import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { FounderProfilePage } from "@/components/founders/founder-profile-page";
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
    title: `${profile.name} — ${profile.jobTitle}`,
    description: profile.oneLine,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title: profile.name,
      description: profile.oneLine,
      type: "profile",
    },
  };
}

/** `/about/[slug]` — Person-schema founder profile (true home of the full bio). */
export default async function FounderSlugPage({ params }: PageProps) {
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
      <FounderProfilePage profile={profile} />
    </>
  );
}
