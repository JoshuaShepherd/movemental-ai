"use client";

import { useEffect, useRef } from "react";

/**
 * Modal used by the Resolve screens (share, bring to someone who decides, invite).
 * Escape and the Close button close it; focus moves into it on open and back on close.
 */
export function MvDialog({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);

  useEffect(() => {
    close.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const first = ref.current?.querySelector<HTMLElement>("input, textarea");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close.current();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, []);

  return (
    <div
      className="mv-scrim mv-no-print"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mv-dialog-title"
        className="mv-dialog mv-settle"
      >
        <div className="mv-dialog-head">
          <h2 id="mv-dialog-title" className="mv-rz-h2--sm">
            {title}
          </h2>
          <button type="button" className="mv-textbtn mv-textbtn--muted" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Check({
  checked,
  onToggle,
  children,
  variant = "inline",
}: {
  checked: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  variant?: "inline" | "act";
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className={`mv-check mv-check--${variant}`}
    >
      <span aria-hidden="true" className="mv-check-box">
        ✓
      </span>
      <span>{children}</span>
    </button>
  );
}
