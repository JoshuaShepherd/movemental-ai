"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  WAYS_IN_DOORS,
  WAYS_IN_LEAD_DOOR,
  WAYS_IN_SEGMENTS,
  readHandoffAudience,
  resolveWaysInAudience,
  type WaysInAudience,
} from "@/lib/agent-room/ways-in-doors";
import styles from "../ink-band.module.css";

export function WaysInPanel({
  onSelectDoor,
  disabled,
  onDismiss,
  overlay,
}: {
  onSelectDoor: (text: string) => void;
  disabled?: boolean;
  /** When set, show a quiet dismiss control (re-summon overlay). */
  onDismiss?: () => void;
  /** Overlay mode — sits above an active conversation. */
  overlay?: boolean;
}) {
  const pathname = usePathname();
  const routeAudience = resolveWaysInAudience(pathname);
  const [audience, setAudience] = useState<WaysInAudience>(routeAudience);

  // Prefer the segment a visitor handed off from (e.g. /agent/nonprofits → the
  // room) over the bare /agent route default, so the doors open where they were.
  useEffect(() => {
    setAudience(readHandoffAudience() ?? routeAudience);
  }, [routeAudience]);

  const doors = WAYS_IN_DOORS[audience];

  return (
    <div
      className={`${styles.waysInPanel} ${overlay ? styles.waysInPanelOverlay : ""}`}
      role={overlay ? "dialog" : "region"}
      aria-label="Ways in"
    >
      {overlay && onDismiss ? (
        <div className={styles.waysInOverlayHeader}>
          <span className={styles.waysInOverlayEyebrow}>Ways in</span>
          <button
            type="button"
            className={styles.waysInDismiss}
            onClick={onDismiss}
            aria-label="Close ways in"
          >
            Close
          </button>
        </div>
      ) : null}

      <p className={styles.waysInPrompt}>Where would you like to start?</p>

      <button
        type="button"
        className={styles.waysInLeadDoor}
        disabled={disabled}
        onClick={() => onSelectDoor(WAYS_IN_LEAD_DOOR)}
      >
        {WAYS_IN_LEAD_DOOR}
      </button>

      <div className={styles.waysInSegments} role="tablist" aria-label="Audience">
        {WAYS_IN_SEGMENTS.map((segment) => {
          const active = audience === segment.id;
          return (
            <button
              key={segment.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={`${styles.waysInSegment} ${active ? styles.waysInSegmentActive : ""}`}
              onClick={() => setAudience(segment.id)}
            >
              {segment.label}
            </button>
          );
        })}
      </div>

      <ul className={styles.waysInDoors}>
        {doors.map((door) => (
          <li key={door}>
            <button
              type="button"
              className={styles.waysInDoor}
              disabled={disabled}
              onClick={() => onSelectDoor(door)}
            >
              {door}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
