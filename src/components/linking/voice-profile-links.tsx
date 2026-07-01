import Link from "next/link";

import { COMMITTED_VOICES, voicePath } from "@/lib/committed-voices";

import styles from "./linking.module.css";

type VoiceProfileLinksProps = {
  label?: string;
};

/** Hub links to committed voice profile pages. */
export function VoiceProfileLinks({ label = "Trusted voices" }: VoiceProfileLinksProps) {
  return (
    <aside className={styles.linkingBlock} aria-label={label}>
      <p className={styles.linkingLabel}>{label}</p>
      <ul className={styles.linkingList}>
        {COMMITTED_VOICES.map((voice) => (
          <li key={voice.slug}>
            <Link href={voicePath(voice.slug)} className={styles.linkingLink}>
              {voice.displayName}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/voices" className={styles.linkingLink}>
            View all trusted voices →
          </Link>
        </li>
      </ul>
    </aside>
  );
}
