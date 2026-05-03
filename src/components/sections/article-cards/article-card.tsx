import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ArticleSummary } from "@/lib/articles";
import { cn } from "@/lib/utils";

/**
 * Variant-aware article card. Drop-in replacement for the ad-hoc `bg-card
 * rounded-[var(--radius-card)]` blocks on `/articles` and the collection pages.
 *
 * Variants:
 * - `default`  — bg-card on bg-section, standard library card.
 * - `featured` — bg-elevated, slightly larger display type, ambient shadow.
 * - `canon`    — bg-card with Instrument Serif italic canon numeral (01–23)
 *                in the top-right, `text-primary/20`.
 * - `sandbox`  — bg-card with sandbox numeral.
 * - `compact`  — single-line horizontal card for rails / continue-reading.
 */
export type ArticleCardVariant = "default" | "featured" | "canon" | "sandbox" | "compact";

const variantShellClass: Record<ArticleCardVariant, string> = {
  default:
    "group relative flex h-full min-h-[200px] flex-col gap-2 rounded-[var(--radius-card)] bg-card p-5 shadow-ambient transition-transform duration-normal ease-out hover:-translate-y-0.5",
  featured:
    "group relative flex h-full min-h-[240px] flex-col gap-2 overflow-hidden rounded-[var(--radius-card)] bg-elevated p-6 shadow-ambient transition-transform duration-normal ease-out hover:-translate-y-0.5",
  canon:
    "group relative flex h-full min-h-[240px] flex-col gap-2 overflow-hidden rounded-[var(--radius-card)] bg-card p-6 shadow-ambient transition-transform duration-normal ease-out hover:-translate-y-0.5",
  sandbox:
    "group relative flex h-full min-h-[220px] flex-col gap-2 overflow-hidden rounded-[var(--radius-card)] bg-card p-6 shadow-ambient transition-transform duration-normal ease-out hover:-translate-y-0.5",
  compact:
    "group relative flex h-full flex-row items-center gap-4 rounded-[var(--radius-card)] bg-card p-4 shadow-ambient transition-transform duration-normal ease-out hover:-translate-y-0.5",
};

const focusRingClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function displayNumeral(num: number | null | undefined): string | null {
  if (num == null) return null;
  return String(num).padStart(2, "0");
}

export function ArticleCard({
  article,
  variant = "default",
  href,
  numeral,
  className,
}: {
  article: ArticleSummary;
  variant?: ArticleCardVariant;
  /** Override anchor target (defaults to `/articles/<slug>`). */
  href?: string;
  /** Override numeral shown in canon/sandbox variants. */
  numeral?: number | null;
  className?: string;
}) {
  const targetHref = href ?? `/articles/${article.slug}`;
  const badgeNumeral = displayNumeral(
    numeral ??
      (variant === "canon" ? article.canonOrder : variant === "sandbox" ? article.seriesOrder : null),
  );

  return (
    <Link href={targetHref} className={cn(variantShellClass[variant], focusRingClass, className)}>
      {badgeNumeral ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute right-5 top-5 font-serif italic leading-none tracking-tight text-primary/20 transition-colors duration-normal group-hover:text-primary/28",
            variant === "canon" ? "text-[2.75rem]" : "text-[2.25rem]",
          )}
        >
          {badgeNumeral}
        </span>
      ) : null}

      <span className="relative text-[0.72rem] font-medium uppercase tabular-nums tracking-eyebrow text-muted-foreground">
        {article.eyebrow}
      </span>

      <span
        className={cn(
          "relative font-medium leading-snug tracking-tight text-foreground",
          variant === "featured" ? "text-[1.15rem]" : "text-[1.02rem]",
          variant === "compact" && "text-[0.98rem]",
        )}
      >
        {article.title}
      </span>

      {variant !== "compact" ? (
        <span className="relative line-clamp-3 text-[0.92rem] leading-relaxed text-muted-foreground">
          {article.deck ?? article.excerpt}
        </span>
      ) : null}

      <span className="relative mt-auto flex items-center justify-between pt-3 text-[0.74rem] text-ink-soft">
        <span className="tabular-nums">{article.readTime.replace(" read", "")}</span>
        <ArrowRight
          className="size-3.5 text-primary transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden
        />
      </span>
    </Link>
  );
}
