import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { FounderProfileView } from "@/components/mv/legacy/founder-profile";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

import {
  FOUNDER_SLUGS,
  FOUNDER_SLUG_ALIASES,
  getFounderBySlug,
  resolveFounderSlug,
} from "@/lib/founders/content";
import { buildFounderPersonJsonLd } from "@/lib/founders/person-schema";
import { canonicalPageUrl } from "@/lib/site-url";
import { founderHref } from "@/components/mv/routes";

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
    permanentRedirect(founderHref(profile.slug));
  }

  const jsonLd = buildFounderPersonJsonLd(profile);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MvHeader />
      <FounderProfileView profile={profile} />
      <MvFooter />
    </>
  );
}
