import Link from "next/link";

import type { EditionPathStage } from "./churches-edition-types";
import styles from "./churches-edition.module.css";
import { RevealOnScroll } from "./reveal-on-scroll";

type PathOrderGridProps = {
  stages: readonly EditionPathStage[];
};

export function PathOrderGrid({ stages }: PathOrderGridProps) {
  return (
    <div className={styles.orderGrid}>
      {stages.map((stage) => {
        const content = (
          <>
            <span className={styles.orderSn}>{stage.n}</span>
            <h4 className={styles.orderTitle}>
              {stage.isFirst ? (
                <span className={styles.underlineWrap}>
                  {stage.title}
                  <svg
                    className={styles.underlineSvg}
                    viewBox="0 0 90 12"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path className={styles.underlinePath} d="M3 8 Q45 2 87 7" />
                  </svg>
                </span>
              ) : (
                stage.title
              )}
            </h4>
            <p className={styles.orderBody}>{stage.body}</p>
            {stage.isFirst ? <span className={styles.orderGo}>Start here →</span> : null}
          </>
        );

        return (
          <RevealOnScroll key={stage.n}>
            {stage.href ? (
              <Link
                href={stage.href}
                className={`${styles.orderStep} ${styles.orderStepFirst}`}
                aria-label={`Start with ${stage.title}`}
              >
                {content}
              </Link>
            ) : (
              <div className={`${styles.orderStep} ${styles.orderStepRest}`}>{content}</div>
            )}
          </RevealOnScroll>
        );
      })}
    </div>
  );
}
