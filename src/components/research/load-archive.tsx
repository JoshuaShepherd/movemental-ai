"use client";

import { useState } from "react";

import { RESEARCH_ARCHIVE } from "@/lib/research/data";

import { ResearchRow } from "./research-row";
import styles from "./research.module.css";

/** "Load archive" reveals the older research items below the live index. */
export function LoadArchive() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open
        ? RESEARCH_ARCHIVE.map((item) => <ResearchRow key={item.slug} item={item} />)
        : null}
      {open ? null : (
        <div className={styles.loadArchive}>
          <button type="button" className={styles.btn} onClick={() => setOpen(true)}>
            Load archive
          </button>
        </div>
      )}
    </>
  );
}
