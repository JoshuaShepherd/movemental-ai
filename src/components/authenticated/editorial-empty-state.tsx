import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type EditorialEmptyStateTone = "default" | "safestart";

export type EditorialEmptyStateProps = {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  secondaryAction?: ReactNode;
  tone?: EditorialEmptyStateTone;
  className?: string;
};

const toneClass: Record<EditorialEmptyStateTone, { wrap: string; eyebrow: string; title: string; body: string }> = {
  default: {
    wrap: "flex max-w-3xl flex-col gap-4",
    eyebrow: "text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground",
    title: "font-serif text-[clamp(1.35rem,3vw,1.75rem)] italic leading-snug tracking-tight text-foreground",
    body: "text-[15px] leading-relaxed text-muted-foreground",
  },
  safestart: {
    wrap: "flex max-w-3xl flex-col gap-4",
    eyebrow: "text-[11px] font-medium uppercase tracking-[0.1em] text-safestart-muted",
    title: "font-serif text-[28px] italic leading-tight text-safestart-ink",
    body: "text-[15px] leading-relaxed text-safestart-muted",
  },
};

/**
 * Shared “surface is being prepared” pattern for authenticated dashboard routes.
 * Keeps copy in a mature editorial register without implementation details.
 */
export function EditorialEmptyState({
  eyebrow,
  title,
  children,
  secondaryAction,
  tone = "default",
  className,
}: EditorialEmptyStateProps) {
  const t = toneClass[tone];
  return (
    <section className={cn(t.wrap, className)}>
      <p className={t.eyebrow}>{eyebrow}</p>
      <h2 className={t.title}>{title}</h2>
      <div className={t.body}>{children}</div>
      {secondaryAction ? <div className="pt-2">{secondaryAction}</div> : null}
    </section>
  );
}
