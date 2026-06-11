"use client";

import { useState } from "react";

import styles from "../ink-band.module.css";

/**
 * Split-screen role picker (proposal §3.5, reference pattern B). Three org types
 * as a selection rather than a paragraph: a Playfair headline + body for the
 * active type on the left, a vertical option rail on the right (md+); on narrow
 * viewports the options become a chip row above the body.
 *
 * Presentational and UI-only — no scenes, routes, or new ScreenId. `onSelect`
 * is an optional hook for future agent context (default noop).
 */
export type AudienceType = "church" | "nonprofit" | "institution";

const AUDIENCES: ReadonlyArray<{
  id: AudienceType;
  label: string;
  title: string;
  body: string;
}> = [
  {
    id: "church",
    label: "Churches",
    title: "For churches",
    body: "The pastoral and disclosure questions — sermons, member data, and what belongs in the pulpit.",
  },
  {
    id: "nonprofit",
    label: "Nonprofits",
    title: "For nonprofits",
    body: "The fiduciary and donor-data questions your board owns.",
  },
  {
    id: "institution",
    label: "Seminaries & institutions",
    title: "For seminaries & institutions",
    body: "The three-constituency picture across faculty, students, and administration.",
  },
];

export function AudiencePicker({
  onSelect,
}: {
  onSelect?: (id: AudienceType) => void;
}) {
  const [active, setActive] = useState<AudienceType>("church");
  const current = AUDIENCES.find((a) => a.id === active) ?? AUDIENCES[0];

  const select = (id: AudienceType) => {
    setActive(id);
    onSelect?.(id);
  };

  return (
    <div className={styles.audPicker}>
      {/* Chip rail — shown above the body on narrow viewports */}
      <div className={styles.audChips} aria-label="Who this is for">
        {AUDIENCES.map((a) => (
          <button
            key={a.id}
            type="button"
            aria-pressed={a.id === active}
            className={`${styles.chip} ${a.id === active ? styles.chipActive : ""}`}
            onClick={() => select(a.id)}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className={styles.audBody}>
        <p className={styles.audTitle}>{current.title}</p>
        <p className={styles.audLead}>{current.body}</p>
      </div>

      {/* Vertical option rail — shown on md+ */}
      <div className={styles.audList} aria-label="Who this is for">
        {AUDIENCES.map((a) => (
          <button
            key={a.id}
            type="button"
            aria-pressed={a.id === active}
            className={`${styles.audOpt} ${a.id === active ? styles.audOptActive : ""}`}
            onClick={() => select(a.id)}
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}
