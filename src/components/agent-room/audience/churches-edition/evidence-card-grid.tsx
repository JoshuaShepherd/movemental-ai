import type { EditionAccent, EditionEvidenceCard } from "./churches-edition-types";
import styles from "./churches-edition.module.css";
import { RevealOnScroll } from "./reveal-on-scroll";

const ACCENT_CLASS: Record<EditionAccent, string> = {
  blue: styles.cardAccentBlue,
  margin: styles.cardAccentMargin,
  ink: styles.cardAccentInk,
};

type EvidenceCardGridProps = {
  cards: readonly EditionEvidenceCard[];
};

export function EvidenceCardGrid({ cards }: EvidenceCardGridProps) {
  return (
    <div className={styles.cardGrid} role="list">
      {cards.map((card) => (
        <RevealOnScroll key={card.num}>
          <article
            className={`${styles.card} ${ACCENT_CLASS[card.accent]}`}
            role="listitem"
          >
            <div className={styles.cardTag}>
              <span className={styles.cardWhere}>{card.where}</span>
              <span className={styles.cardNum}>{card.num}</span>
            </div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardBody}>{card.body}</p>
            <details className={styles.cardDetails}>
              <summary className={styles.cardSummary}>
                <span className={styles.cardChev} aria-hidden="true">
                  ▸
                </span>
                the evidence
              </summary>
              <div className={styles.cardCite}>
                <span className={styles.cardCiteBold}>{card.evidence.bold}</span>
                {card.evidence.detail ? ` ${card.evidence.detail}` : null}
                <span className={styles.cardCiteSrc}>{card.evidence.source}</span>
              </div>
            </details>
          </article>
        </RevealOnScroll>
      ))}
    </div>
  );
}
