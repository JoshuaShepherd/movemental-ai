import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { VoiceProfileView } from "@/v2/components/voices/voice-profile-view";
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
    title: `${voice.displayName} — Trusted Voice | Movemental`,
    description: voice.shortTagline,
    alternates: { canonical: canonical ?? undefined },
    openGraph: {
      url: canonical ?? undefined,
      title: voice.displayName,
      description: voice.shortTagline,
      type: "profile",
    },
  };
}

export default async function V2VoiceSlugPage({ params }: Params) {
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
      <VoiceProfileView voice={voice} />
    </>
  );
}
