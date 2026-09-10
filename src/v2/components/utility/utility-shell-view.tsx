import Link from "next/link";
import { ReactNode } from "react";

interface UtilityShellViewProps {
  eyebrow?: string;
  title: string;
  body: string;
  actionHref?: string;
  actionLabel?: string;
  children?: ReactNode;
}

/**
 * Staging view for Utility Shell.
 * Matches design specification in Movemental Utility Shell.dc.html.
 */
export function UtilityShellView({
  eyebrow = "Newsletter",
  title,
  body,
  actionHref = "/agent",
  actionLabel = "Back to home →",
  children,
}: UtilityShellViewProps) {
  return (
    <div
      style={{
        maxWidth: "36rem",
        margin: "0 auto",
        padding: "5rem 1.5rem 7rem",
      }}
    >
      <div
        style={{
          background: "var(--color-ink-band-paper)",
          border: "1px solid var(--color-ink-band-border)",
          borderRadius: "12px",
          padding: "2.5rem 2rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "var(--color-ink-band-ink-muted)",
            marginBottom: "1rem",
          }}
        >
          {eyebrow}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            lineHeight: 1.2,
            color: "var(--color-ink-band-ink)",
            margin: "0 0 1.25rem",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.6,
            color: "var(--color-ink-band-ink)",
            margin: "0 0 2rem",
          }}
        >
          {body}
        </p>
        {children}
        <p style={{ margin: 0 }}>
          <Link
            href={actionHref}
            style={{
              color: "var(--color-ink-band-blue)",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              fontWeight: 500,
            }}
          >
            {actionLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}
