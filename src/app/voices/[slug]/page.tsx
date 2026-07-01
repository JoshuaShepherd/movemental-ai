import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { VoiceDetailPage } from "@/components/voices/voice-detail-page";
import {
  getCommittedVoice,
  listCommittedVoiceSlugs,
  voicePath,
} from "@/lib/committed-voices";
import { buildVoicePersonJsonLd } from "@/lib/voices/person-schema";
import { canonicalPageUrl } from "@/lib/site-url";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listCommittedVoiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const voice = getCommittedVoice(slug);
  if (!voice) return { title: "Voice not found" };

  const canonical = canonicalPageUrl(voicePath(voice.slug));

  return {
    title: `${voice.displayName} — Trusted voice`,
    description: voice.shortTagline,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title: voice.displayName,
      description: voice.shortTagline,
      type: "profile",
    },
  };
}

export default async function VoiceSlugPage({ params }: Params) {
  const { slug } = await params;
  const voice = getCommittedVoice(slug);
  if (!voice) notFound();

  const jsonLd = buildVoicePersonJsonLd(voice);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VoiceDetailPage voice={voice} />
    </>
  );
}
