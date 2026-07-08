"use client";

import { useMemo, useState, type CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { ARTICLE_HTML, TYPE_PAIRS } from "@/lib/visual-style-finder/data/typography";
import { buildTypePrompt } from "@/lib/visual-style-finder/utils/prompts";
import { cn } from "@/lib/utils";

import { rawCopyText } from "./clipboard";
import { CopyIcon } from "./icons";
import { StepLead } from "./step-lead";
import { stepKey } from "@/lib/visual-style-finder/constants";
import { useTypographyFonts } from "./use-typography-fonts";

type TypographyStepProps = {
  selected: Set<string>;
  activeType: string;
  onSetActive: (id: string) => void;
  onToggle: (id: string) => void;
  onCopied: (label: string) => void;
};

export function TypographyStep({ selected, activeType, onSetActive, onToggle, onCopied }: TypographyStepProps) {
  const pair = TYPE_PAIRS.find((p) => p.id === activeType);
  useTypographyFonts(activeType);

  const [copyDone, setCopyDone] = useState<string | null>(null);

  const copyPrompt = async (p: (typeof TYPE_PAIRS)[0], btnId: string) => {
    try {
      await rawCopyText(buildTypePrompt(p));
      setCopyDone(btnId);
      window.setTimeout(() => setCopyDone(null), 1200);
      onCopied("Stitch prompt copied");
    } catch {
      onCopied("Copy failed");
    }
  };

  const articleStyle = useMemo(
    () =>
      ({
        "--tf-head": pair?.head,
        "--tf-body": pair?.body,
        "--tf-hw": pair?.hw ?? 600,
      }) as CSSProperties,
    [pair],
  );

  return (
    <div>
      <StepLead
        kicker={stepKey("typography")}
        title="Typography — the same words, many voices."
        description="Flip through trending font pairings and the article restyles live. Select as many as you like; the copy icon sends a pairing to Stitch."
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-start">
        <div className="max-h-[46vh] w-full shrink-0 overflow-y-auto rounded-md border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-bg)] md:sticky md:top-0 md:max-h-[calc(100vh-104px-20px)] md:w-[276px]">
          {TYPE_PAIRS.map((p) => {
            const isActive = p.id === activeType;
            const isSel = selected.has(p.id);
            const copyId = `copy-${p.id}`;
            return (
              <div
                key={p.id}
                className={cn(
                  "relative flex cursor-pointer items-start gap-2 border-b border-[var(--color-ink-band-border)] px-2.5 py-2.5 last:border-b-0",
                  isActive && "bg-[var(--color-ink-band-surface)] shadow-[inset_3px_0_0_var(--color-ink-band-blue)]",
                )}
              >
                <button
                  type="button"
                  data-noselect
                  title="Select pairing"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(p.id);
                  }}
                  className={cn(
                    "mt-0.5 grid size-[22px] shrink-0 place-items-center rounded-full border p-0",
                    isSel
                      ? "border-[var(--color-ink-band-blue)] bg-[var(--color-ink-band-blue)] text-white"
                      : "border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-bg)] text-transparent",
                  )}
                >
                  <svg viewBox="0 0 24 24" className="size-3 stroke-current stroke-[3] fill-none">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </button>

                <div className="min-w-0 flex-1" onClick={() => onSetActive(p.id)} role="presentation">
                  <div className="text-[0.82rem] font-semibold">{p.nm}</div>
                  <div className="mt-0.5 flex items-baseline gap-2">
                    <span className="text-[1.4rem] leading-none" style={{ fontFamily: p.head }}>
                      Ag
                    </span>
                    <span className="truncate text-[0.66rem] text-muted-foreground">
                      <span style={{ fontFamily: p.head }}>{p.hn}</span> +{" "}
                      <span style={{ fontFamily: p.body }}>{p.bn}</span>
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-[0.55rem] uppercase tracking-wide text-muted-foreground">
                    {p.vibe}
                  </div>
                </div>

                <button
                  type="button"
                  data-noselect
                  title="Copy Stitch prompt"
                  onClick={(e) => {
                    e.stopPropagation();
                    void copyPrompt(p, copyId);
                  }}
                  className={cn(
                    "mt-0.5 grid size-[26px] shrink-0 place-items-center rounded border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-bg)] p-0 text-muted-foreground hover:border-[var(--color-ink-band-blue)] hover:text-[var(--color-ink-band-blue)]",
                    copyDone === copyId && "border-[var(--color-ink-band-blue)] text-[var(--color-ink-band-blue)]",
                  )}
                >
                  <CopyIcon />
                </button>
              </div>
            );
          })}
        </div>

        <div className="min-w-0 flex-1 rounded-md border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)]">
          <div className="sticky top-0 z-[3] flex items-center justify-between gap-2.5 rounded-t-md border-b border-[var(--color-ink-band-border)] bg-[color-mix(in_srgb,var(--color-ink-band-paper)_94%,transparent)] px-3.5 py-2 backdrop-blur-sm">
            <span className="truncate font-mono text-[0.62rem] tracking-wide text-muted-foreground">
              {pair ? `Viewing: ${pair.nm} — ${pair.hn} / ${pair.bn}` : ""}
            </span>
            <Button
              type="button"
              variant={selected.has(activeType) ? "ghost" : "primary"}
              size="sm"
              className={cn(selected.has(activeType) && "bg-[var(--color-ink-band-blue)] text-white")}
              onClick={() => onToggle(activeType)}
            >
              {selected.has(activeType) ? "Selected ✓" : "Select this pairing"}
            </Button>
          </div>

          <article
            id="typeArticle"
            style={articleStyle}
            className="style-finder-article mx-auto max-w-[660px] px-[clamp(20px,3vw,40px)] py-[clamp(20px,3vw,40px)] [&_.byline]:my-6 [&_.byline]:border-y [&_.byline]:border-[var(--color-ink-band-border)] [&_.byline]:py-2.5 [&_.byline]:text-[0.7rem] [&_.byline]:font-medium [&_.byline]:uppercase [&_.byline]:tracking-wide [&_.byline]:text-muted-foreground [&_.close]:text-[1.1rem] [&_.deck]:mb-4 [&_.deck]:text-[1.16rem] [&_.deck]:leading-relaxed [&_.deck]:text-muted-foreground [&_.kicker]:text-[0.7rem] [&_.kicker]:font-semibold [&_.kicker]:uppercase [&_.kicker]:tracking-[0.2em] [&_.kicker]:text-[var(--color-ink-band-blue)] [&_.pull]:my-6 [&_.pull]:border-l-2 [&_.pull]:border-[var(--color-ink-band-blue)] [&_.pull]:pl-4 [&_.pull]:font-serif [&_.pull]:text-[1.55rem] [&_.pull]:leading-snug [&_.pull]:italic [&_h1]:my-2 [&_h1]:font-serif [&_h1]:text-[clamp(2rem,4.6vw,3rem)] [&_h1]:leading-[1.04] [&_h1]:font-[var(--tf-hw)] [&_h1]:tracking-tight [&_h1]:[font-family:var(--tf-head)] [&_h2]:my-6 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-[var(--tf-hw)] [&_h2]:[font-family:var(--tf-head)] [&_p]:mb-4 [&_p]:text-[1.06rem] [&_p]:leading-[1.72] [&_p]:text-[#2b2824] [&_p]:[font-family:var(--tf-body)]"
            dangerouslySetInnerHTML={{ __html: ARTICLE_HTML }}
          />
        </div>
      </div>
    </div>
  );
}
