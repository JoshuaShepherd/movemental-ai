import Link from "next/link";

import { type CommittedVoice, voicePath } from "@/lib/committed-voices";

import { VoicePortrait } from "./voice-portrait";

type Props = {
  voice: CommittedVoice;
};

/**
 * Hub card for a committed voice. Portrait-forward, name + role, one-line
 * thesis, and 2–3 themes. Link target is the in-site detail page — external
 * links live one click deeper, on `/voices/[slug]`.
 */
export function VoiceCard({ voice }: Props) {
  const href = voicePath(voice.slug);

  return (
    <article className="group flex h-full flex-col border border-border bg-card transition-colors hover:bg-elevated">
      <Link href={href} className="flex h-full flex-col" aria-label={`Read more about ${voice.displayName}`}>
        <VoicePortrait
          imageSrc={voice.portraitSrc}
          imageAlt={voice.portraitAlt}
          initials={voice.initials}
        />
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div>
            <h3 className="text-lg font-medium text-foreground">{voice.displayName}</h3>
            <p className="mt-1 text-sm text-primary">{voice.role}</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{voice.shortTagline}</p>
          <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-4 text-[0.7rem] font-medium uppercase tracking-eyebrow text-ink-soft">
            {voice.themes.map((theme) => (
              <li key={theme}>{theme}</li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}
