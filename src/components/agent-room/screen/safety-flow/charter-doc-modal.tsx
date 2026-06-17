"use client";

import { useCallback, useEffect, useRef } from "react";
import { X } from "lucide-react";

import type { SafetyCharterDocument } from "@/lib/agent-room/data/safety-charter";
import { SAFETY_HANDBOOK } from "@/lib/agent-room/naming";
import styles from "../../ink-band.module.css";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/** Charter document preview modal — read-only in the agent room. */
export function CharterDocModal({
  doc,
  onClose,
}: {
  doc: SafetyCharterDocument | null;
  onClose: () => void;
}) {
  const open = doc != null;
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Trap focus inside the dialog while it is open.
      if (e.key === "Tab" && sheetRef.current) {
        const focusables = Array.from(
          sheetRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose, open],
  );

  useEffect(() => {
    if (!open) return;
    // Remember the trigger so focus can return to it on close.
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.classList.add("lightbox-open");
    document.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();
    return () => {
      document.body.classList.remove("lightbox-open");
      document.removeEventListener("keydown", handleKeyDown);
      restoreFocusRef.current?.focus?.();
    };
  }, [handleKeyDown, open]);

  if (!doc) return null;

  return (
    <div
      className={`${styles.lightbox} ${styles.lightboxIsOpen}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="charter-doc-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.lightboxSheet} ref={sheetRef}>
        <button
          ref={closeRef}
          type="button"
          className={styles.lightboxClose}
          aria-label="Close"
          onClick={onClose}
        >
          <X className={styles.lightboxCloseIcon} strokeWidth={1.75} aria-hidden />
        </button>
        <p className={styles.lbEyebrow}>
          {SAFETY_HANDBOOK.fullTitle} · Layer {doc.layer}
        </p>
        <h2 className={styles.lbTitle} id="charter-doc-modal-title">
          {doc.title}
        </h2>
        <p className={styles.flowModalSub}>{doc.sub}</p>
        <p className={styles.flowModalStatus}>Draft · Layer {doc.layer} · not yet written for your organization</p>
        <div className={styles.flowModalBody}>
          {doc.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <h3 className={styles.flowModalAffTitle}>{doc.affTitle}</h3>
        <ul className={styles.flowModalAffList}>
          {doc.aff.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
