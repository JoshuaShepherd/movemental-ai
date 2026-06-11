"use client";

import { useCallback, useEffect } from "react";

import type { SafetyCharterDocument } from "@/lib/agent-room/data/safety-charter";
import { SAFETY_GUIDEBOOK } from "@/lib/agent-room/naming";
import styles from "../ink-band.module.css";

export function CharterLightbox({
  doc,
  onClose,
}: {
  doc: SafetyCharterDocument | null;
  onClose: () => void;
}) {
  const open = doc != null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    },
    [onClose, open],
  );

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("lightbox-open");
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("lightbox-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, open]);

  if (!doc) return null;

  return (
    <div
      className={`${styles.lightbox} ${styles.lightboxIsOpen}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="charter-lb-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.lightboxSheet}>
        <button
          type="button"
          className={styles.lightboxClose}
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
        <p className={styles.lbEyebrow}>{SAFETY_GUIDEBOOK.fullTitle} · Layer {doc.layer}</p>
        <h2 className={styles.lbTitle} id="charter-lb-title">
          {doc.title}
        </h2>
        <div
          className={styles.lbBody}
          dangerouslySetInnerHTML={{ __html: doc.draft }}
        />
      </div>
    </div>
  );
}
