import type { ReactNode } from "react";

/** The kept pages' header block: eyebrow, title, deck, optional meta. Board: Kept pages. */
export function MvPageHeader({
  eyebrow,
  title,
  deck,
  children,
  rule = false,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  deck?: ReactNode;
  children?: ReactNode;
  rule?: boolean;
}) {
  return (
    <header className={`mv-ph${rule ? " mv-ph--rule" : ""}`}>
      {eyebrow ? <p className="mv-kicker">{eyebrow}</p> : null}
      <h1 className="mv-ph-title">{title}</h1>
      {deck ? <p className="mv-ph-deck">{deck}</p> : null}
      {children}
    </header>
  );
}

export function MvArrow({ className = "mv-ix-go" }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function MvBackArrow() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}
