import Link from "next/link";

import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";
import { DocumentGraphNav } from "@/components/linking/document-graph-nav";
import { COMMITTED_VOICES, voicePath } from "@/lib/committed-voices";

import styles from "./voice-profile.module.css";

/** `/voices` — trusted voices hub (ecosystem layer, not a funnel segment). */
export function VoicesHubPage() {
  return (
    <InkBandUtilityShell>
      <div className={styles.layout}>
        <Link className={styles.back} href="/agent/about#the-network">
          ← About Movemental
        </Link>

        <p className={styles.eyebrow}>Trusted voices</p>
        <h1 className={styles.title}>Movement leaders in the scenius</h1>
        <p className={styles.tagline}>
          These are practitioners whose public work Movemental helps gather, link, and verify —
          not a recruiting roster. Each profile links to their primary site and to a durable URL
          on movemental.ai you can cite.
        </p>

        <section className={styles.section} aria-labelledby="voices-list">
          <h2 className={styles.sectionTitle} id="voices-list">
            Committed voices
          </h2>
          <div className={styles.relatedGrid}>
            {COMMITTED_VOICES.map((voice) => (
              <Link key={voice.slug} href={voicePath(voice.slug)} className={styles.relatedCard}>
                <p className={styles.relatedName}>{voice.displayName}</p>
                <p className={styles.relatedRole}>{voice.shortTagline}</p>
              </Link>
            ))}
          </div>
        </section>

        <p className={styles.body}>
          <Link href="/agent?scene=about">Ask the concierge about the network →</Link>
        </p>

        <DocumentGraphNav current="voices" />
      </div>
    </InkBandUtilityShell>
  );
}
