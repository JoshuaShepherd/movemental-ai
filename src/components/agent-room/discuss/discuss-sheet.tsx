"use client";

import { useState } from "react";

import type { ThreadTurn } from "@/lib/agent-room/thread";
import styles from "../ink-band.module.css";
import { DiscussThread } from "./discuss-thread";

/**
 * The "What we discussed" fold — conversation recap on the sheet when collapsed.
 */
export function DiscussFold({ thread }: { thread: ThreadTurn[] }) {
  const [open, setOpen] = useState(false);
  if (thread.length === 0) return null;
  return (
    <div className={styles.discussFold}>
      <button
        type="button"
        className={styles.foldToggle}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "▾ " : "▸ "}What we discussed
      </button>
      {open && (
        <div className={styles.foldBody}>
          <DiscussThread thread={thread} />
        </div>
      )}
    </div>
  );
}
