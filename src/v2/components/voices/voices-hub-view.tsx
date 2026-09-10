import Image from "next/image";
import Link from "next/link";

import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";
import { DocumentGraphNav } from "@/components/linking/document-graph-nav";
import { COMMITTED_VOICES } from "@/lib/committed-voices";
import { LEADERS_V4 } from "@/v2/lib/leaders-v4";
import styles from "@/components/voices/voice-profile.module.css";

/**
 * Staging view for Movemental Voices Hub.
 * Shows the 3 committed voices with profiles, and the 25-leader scenius roster (L-3).
 */
export function VoicesHubView() {
  return (
    <InkBandUtilityShell>
      <div className={styles.layout}>
        <Link className={styles.back} href="/about">
          ← About Movemental
        </Link>

        <p className={styles.eyebrow}>Trusted voices</p>
        <h1 className={styles.title}>Movement leaders in the scenius</h1>
        <p className={styles.tagline}>
          These are practitioners whose public work Movemental helps gather, link, and verify —
          not a recruiting roster. Each profile links to their primary site and to a durable URL
          on movemental.ai you can cite.
        </p>

        <section className={styles.section} aria-labelledby="committed-voices-heading">
          <h2 className={styles.sectionTitle} id="committed-voices-heading">
            Committed voices
          </h2>
          <div className={styles.relatedGrid}>
            {COMMITTED_VOICES.map((voice) => (
              <Link key={voice.slug} href={`/voices/${voice.slug}`} className={styles.relatedCard}>
                <p className={styles.relatedName}>{voice.displayName}</p>
                <p className={styles.relatedRole}>{voice.shortTagline}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="scenius-roster-heading" style={{ marginTop: "3rem" }}>
          <h2 className={styles.sectionTitle} id="scenius-roster-heading">
            The wider movement scenius
          </h2>
          <p className={styles.body} style={{ marginBottom: "1.5rem" }}>
            Movemental learns from and convenes 25 leading practitioners across pioneering ecclesial networks.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {LEADERS_V4.map((leader) => (
              <div
                key={leader.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  background: "var(--color-ink-band-surface)",
                  border: "1px solid var(--color-ink-band-border)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    overflow: "hidden",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Image
                    src={leader.fullImageUrl}
                    alt={leader.name}
                    fill
                    sizes="72px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--color-ink-band-ink)",
                    lineHeight: 1.2,
                  }}
                >
                  {leader.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <DocumentGraphNav current="voices" />
      </div>
    </InkBandUtilityShell>
  );
}
