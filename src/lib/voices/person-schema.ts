import type { CommittedVoice } from "@/lib/committed-voices";
import { voicePath } from "@/lib/committed-voices";
import { canonicalPageUrl } from "@/lib/site-url";

/** Person JSON-LD for a committed voice profile page. */
export function buildVoicePersonJsonLd(voice: CommittedVoice): Record<string, unknown> {
  const url = canonicalPageUrl(voicePath(voice.slug));
  const sameAs = [
    voice.primaryUrl,
    ...voice.secondaryLinks.map((link) => link.href),
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: voice.displayName,
    jobTitle: voice.role,
    description: voice.shortTagline,
    ...(voice.portraitSrc
      ? {
          image: canonicalPageUrl(voice.portraitSrc),
        }
      : {}),
    url,
    mainEntityOfPage: url,
    ...(sameAs.length ? { sameAs } : {}),
    knowsAbout: [...voice.themes],
  };
}
