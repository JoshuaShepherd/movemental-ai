/* eslint-disable @next/next/no-img-element -- static voice portraits */
import Link from "next/link";

import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";
import { DocumentGraphNav } from "@/components/linking/document-graph-nav";
import {
  COMMITTED_VOICES,
  type CommittedVoice,
  VOICES_HUB_PATH,
} from "@/lib/committed-voices";

import styles from "./voice-profile.module.css";

type VoiceDetailPageProps = {
  voice: CommittedVoice;
};

/** `/voices/[slug]` — per-voice editorial profile with outbound tenant links. */
export function VoiceDetailPage({ voice }: VoiceDetailPageProps) {
  const others = COMMITTED_VOICES.filter((v) => v.slug !== voice.slug);

  return (
    <InkBandUtilityShell>
      <article className={styles.layout}>
        <Link className={styles.back} href={VOICES_HUB_PATH}>
          ← Trusted voices
        </Link>

        <p className={styles.eyebrow}>Trusted voice</p>
        <h1 className={styles.title}>{voice.displayName}</h1>
        <p className={styles.role}>{voice.role}</p>
        <p className={styles.location}>{voice.locationLine}</p>

        <div className={styles.heroRow}>
          {voice.portraitSrc ? (
            <img
              className={styles.portrait}
              src={voice.portraitSrc}
              alt={voice.portraitAlt}
              loading="eager"
            />
          ) : (
            <span className={styles.initials} aria-hidden>
              {voice.initials}
            </span>
          )}
          <div>
            <p className={styles.tagline}>{voice.shortTagline}</p>
            <div className={styles.actions}>
              <a
                className={styles.primaryLink}
                href={voice.primaryUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Leader&apos;s primary site ↗
              </a>
              {voice.secondaryLinks.map((link) => (
                <a
                  key={link.href}
                  className={styles.secondaryLink}
                  href={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        <section id="bio" aria-labelledby="voice-bio">
          {voice.editorialBio.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className={styles.body}>
              {paragraph}
            </p>
          ))}
        </section>

        <section className={styles.section} aria-labelledby="voice-themes">
          <h2 className={styles.sectionTitle} id="voice-themes">
            Themes
          </h2>
          <div className={styles.themes}>
            {voice.themes.map((theme) => (
              <span key={theme} className={styles.theme}>
                {theme}
              </span>
            ))}
          </div>
        </section>

        {voice.featuredWorks.length ? (
          <section className={styles.section} aria-labelledby="voice-works">
            <h2 className={styles.sectionTitle} id="voice-works">
              Featured work
            </h2>
            <ul className={styles.workList}>
              {voice.featuredWorks.map((work) => (
                <li key={work} className={styles.workItem}>
                  {work}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {others.length ? (
          <section className={styles.section} aria-labelledby="voice-related">
            <h2 className={styles.sectionTitle} id="voice-related">
              Other trusted voices
            </h2>
            <div className={styles.relatedGrid}>
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/voices/${other.slug}`}
                  className={styles.relatedCard}
                >
                  <p className={styles.relatedName}>{other.displayName}</p>
                  <p className={styles.relatedRole}>{other.role}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <DocumentGraphNav current="voices" />
      </article>
    </InkBandUtilityShell>
  );
}
