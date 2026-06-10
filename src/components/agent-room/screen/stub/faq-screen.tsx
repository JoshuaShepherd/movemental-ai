"use client";

import { FAQ_SECTIONS } from "@/lib/agent-room/data/faq";
import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";

/**
 * The FAQ (prototype `FAQ_HTML` / `faq.js`): an intro, in-page jump links, then
 * ten labeled sections of native `<details>` accordions (collapsed by default,
 * matching the prototype — not an invented accordion).
 */
export function FaqScreen({ onHome }: ScreenProps) {
  return (
    <div>
      <Crumb onHome={onHome} />
      <p className={styles.eyebrow}>FAQ</p>
      <p className={styles.q} style={{ marginBottom: "0.7rem" }}>
        Honest answers to real questions.
      </p>
      <p className={styles.body}>
        These are the questions we hear most often from leaders sitting exactly where you
        are. The answers are honest. Some will be reasons we are right for you. Some will
        be reasons we are not.
      </p>

      <div className={styles.sec}>
        <p className={styles.secLabel}>In this FAQ</p>
        <p className={styles.body} style={{ marginTop: "0.2rem", fontSize: "0.92rem" }}>
          Ten short groups. Jump directly to the answers you need.
        </p>
        <div className={styles.faqJump}>
          {FAQ_SECTIONS.map((s) => (
            <a key={s.id} className={styles.faqJumpLink} href={`#${s.id}`}>
              {s.title}
            </a>
          ))}
        </div>
      </div>

      {FAQ_SECTIONS.map((section) => (
        <div key={section.id} className={styles.sec} id={section.id}>
          <p className={styles.secLabel}>{section.title}</p>
          <div className={styles.faq}>
            {section.items.map((item) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqQ}>{item.q}</summary>
                <p className={styles.faqA}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      ))}

      <p className={styles.honest} style={{ marginTop: "1.4rem" }}>
        Still have questions? Get in touch — or map where you stand, and we’ll know
        exactly what to talk about.
      </p>
    </div>
  );
}
