"use client";

import { useEffect, useId, useState } from "react";
import { X } from "lucide-react";

import styles from "./announcement-bar.module.css";

const DISMISS_KEY = "mv-announce-dismissed-v2";

/**
 * Site-wide experimental-preview notice. Rendered once by the root layout, so it
 * sits above every surface's own header. The short line is always visible; the
 * longer process note (contact, vetting commitment) opens in an overlay panel via
 * "Read more" — the bar's own height never changes, which keeps the agent room's
 * `100dvh - var(--announce-h)` math exact.
 *
 * Dismissable and remembered (localStorage). On dismissal we also zero
 * `--announce-h` on <html> so the no-scroll agent room reclaims that strip of
 * viewport instead of leaving a gap; on restore we drop the inline override so
 * the responsive :root value applies again.
 */
export function AnnouncementBar() {
  const [open, setOpen] = useState(false);
  // Default to visible so it matches SSR and new visitors get no flash; the
  // effect hides it post-hydration only for someone who already dismissed it.
  const [dismissed, setDismissed] = useState(false);
  const panelId = useId();

  useEffect(() => {
    setDismissed(window.localStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dismissed) {
      root.style.setProperty("--announce-h", "0px");
    } else {
      root.style.removeProperty("--announce-h");
    }
  }, [dismissed]);

  function dismiss() {
    window.localStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <div className={styles.root} role="region" aria-label="Site notice">
      <div className={styles.bar}>
        <span className={styles.label}>
          <span className={styles.tick} aria-hidden />
          Build in progress
        </span>

        <p className={styles.short}>
            <span className={styles.shortStrong}>
              This site is still in active development — an early-stage mock-up of movemental.ai&rsquo;s
              new agentic approach to websites.
            </span>{" "}
          Movement-leader content is under revision, is not final, and movemental.ai is not yet
          being distributed or shared publicly.
        </p>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
        >
          {open ? "Read less" : "Read more"}
        </button>

        <button
          type="button"
          className={styles.dismiss}
          onClick={dismiss}
          aria-label="Dismiss notice"
        >
          <X className={styles.dismissIcon} aria-hidden />
        </button>
      </div>

      {open ? (
        <div className={styles.panel} id={panelId} role="region" aria-label="About this preview">
          <div className={styles.panelInner}>
            <p className={styles.panelHeading}>Build in progress</p>
            <p className={styles.panelText}>
              This site is still in active development — an early-stage mock-up of movemental.ai&rsquo;s
              new agentic approach to websites. Content related to movement leaders is under revision
              and is not final, and movemental.ai is not currently being distributed or shared publicly.
            </p>
            <p className={styles.panelText}>
              For questions about the process, contact{" "}
              <a className={styles.mail} href="mailto:josh@movemental.ai">
                josh@movemental.ai
              </a>
              . We are in the final stages of development, and all movement-leader content will be
              reviewed and vetted by the movement leaders themselves before publication.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
