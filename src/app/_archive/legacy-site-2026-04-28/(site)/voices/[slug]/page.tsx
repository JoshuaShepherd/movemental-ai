import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { VoiceDetailPageContent } from "@/components/sections/voices/voice-detail-page-content";
import {
  getCommittedVoice,
  listCommittedVoiceSlugs,
  voicePath,
} from "@/lib/committed-voices";
import { canonicalPageUrl } from "@/lib/site-url";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listCommittedVoiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const voice = getCommittedVoice(slug);
  if (!voice) {
    return { title: "Voice not found" };
  }

  const title = `${voice.displayName} — Committed voices`;
  const description = voice.shortTagline;
  const url = canonicalPageUrl(voicePath(voice.slug));

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title,
      description,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function VoiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const voice = getCommittedVoice(slug);
  if (!voice) notFound();

  // Plan §6 Phase 2: lightweight `Person` JSON-LD on detail pages.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: voice.displayName,
    jobTitle: voice.role,
    description: voice.shortTagline,
    url: canonicalPageUrl(voicePath(voice.slug)),
    sameAs: [voice.primaryUrl, ...voice.secondaryLinks.map((l) => l.href)],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <VoiceDetailPageContent voice={voice} />
    </>
  );
}
