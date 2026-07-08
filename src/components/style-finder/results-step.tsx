"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/visual-style-finder/data/images";
import { PALETTES } from "@/lib/visual-style-finder/data/palettes";
import { TEMPLATES } from "@/lib/visual-style-finder/data/templates";
import { TYPE_PAIRS } from "@/lib/visual-style-finder/data/typography";
import { stepNum } from "@/lib/visual-style-finder/constants";
import type { SelectionState } from "@/lib/visual-style-finder/types";
import { buildMailtoHref, buildResultsHtml, buildSummaryText } from "@/lib/visual-style-finder/utils/export";
import { computeLeaning } from "@/lib/visual-style-finder/utils/leaning";

type ResultsStepProps = {
  sel: SelectionState;
  onCopied: (label: string) => void;
};

export function ResultsStep({ sel, onCopied }: ResultsStepProps) {
  const typs = TYPE_PAIRS.filter((p) => sel.type.has(p.id));
  const tpls = TEMPLATES.filter((t) => sel.templates.has(t.id));
  const imgs = IMAGES.filter((im) => sel.images.has(im.id));
  const pals = PALETTES.filter((p) => sel.palettes.has(p.id));
  const gens = sel.generated;
  const top = computeLeaning(sel);

  const leanLine =
    top.length > 0
      ? `Your eye leans ${top.join(", ")}. That's the starting brief — a direction to build from, not a template to accept.`
      : "Make a few selections and your leaning will take shape here.";

  const downloadResults = () => {
    try {
      const html = buildResultsHtml(sel, window.location.origin);
      const blob = new Blob([html], { type: "text/html" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `style-results-${new Date().toISOString().slice(0, 10)}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      onCopied("Results sheet downloaded");
    } catch {
      onCopied("Download failed");
    }
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummaryText(sel));
      onCopied("Selections copied");
    } catch {
      onCopied("Copy failed");
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6 border-b border-[var(--color-ink-band-border)] pb-4">
        <div className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-ink-band-blue)]">
          Your style signature
        </div>
        <h2 className="mt-1 font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-semibold">What you&apos;re drawn to</h2>
        <p className="mt-2 font-serif text-[1.05rem] italic text-muted-foreground">{leanLine}</p>
      </div>

      <div className="mb-8 flex flex-col gap-4 rounded-md border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-serif font-semibold">Send these results to Josh</div>
          <div className="mt-1 text-[0.82rem] text-muted-foreground">
            Download the visual sheet, then attach it to the pre-filled email — josh@movemental.ai.
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button type="button" variant="primary" size="sm" onClick={downloadResults}>
            Download results sheet
          </Button>
          <Button type="button" variant="ghost" size="sm" asChild>
            <a href={buildMailtoHref(sel)} target="_blank" rel="noopener noreferrer">
              Email to Josh
            </a>
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => void copySummary()}>
            Copy summary
          </Button>
        </div>
      </div>

      <ResultSection title="Typography" count={typs.length} empty={`None yet — step ${stepNum("typography")}.`}>
        {typs.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {typs.map((p) => (
              <span
                key={p.id}
                className="rounded-sm border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] px-2.5 py-1 text-[0.82rem]"
                style={{ fontFamily: p.head }}
              >
                {p.nm} · {p.hn} / {p.bn}
              </span>
            ))}
          </div>
        ) : null}
      </ResultSection>

      <ResultSection title="Templates & sites" count={tpls.length} empty={`None yet — step ${stepNum("templates")}.`}>
        {tpls.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tpls.map((t) => (
              <a
                key={t.id}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] px-2.5 py-1 text-[0.82rem] no-underline hover:border-[var(--color-ink-band-blue)]"
              >
                {t.nm} ↗
              </a>
            ))}
          </div>
        ) : null}
      </ResultSection>

      <ResultSection title="Images" count={imgs.length} empty={`None yet — step ${stepNum("images")}.`}>
        {imgs.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
            {imgs.map((im) => (
              <Image
                key={im.id}
                src={im.src}
                alt={im.alt}
                width={150}
                height={150}
                className="size-full rounded object-cover border border-[var(--color-ink-band-border)]"
              />
            ))}
          </div>
        ) : null}
      </ResultSection>

      <ResultSection title="Palettes" count={pals.length} empty={`None yet — step ${stepNum("colors")}.`}>
        {pals.length > 0 ? (
          <div className="space-y-2">
            {pals.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="flex h-8 w-40 shrink-0 overflow-hidden rounded border border-[var(--color-ink-band-border)]">
                  {p.c.map((c) => (
                    <span key={c} className="flex-1" style={{ background: c }} />
                  ))}
                </div>
                <span className="font-mono text-[0.62rem] text-muted-foreground">
                  {p.nm} · {p.c.join(" ")}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </ResultSection>

      <ResultSection title="Generated palettes" count={gens.length} empty={`None yet — step ${stepNum("colors")}.`}>
        {gens.length > 0 ? (
          <div className="space-y-2">
            {gens.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="flex h-8 w-40 shrink-0 overflow-hidden rounded border border-[var(--color-ink-band-border)]">
                  {p.c.map((c) => (
                    <span key={c} className="flex-1" style={{ background: c }} />
                  ))}
                </div>
                <span className="font-mono text-[0.62rem] text-muted-foreground">
                  {p.nm} · {p.c.map((x) => x.toUpperCase()).join(" ")}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </ResultSection>
    </div>
  );
}

function ResultSection({
  title,
  count,
  empty,
  children,
}: {
  title: string;
  count: number;
  empty: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <div className="mb-2 flex items-baseline justify-between border-b border-[var(--color-ink-band-border)] pb-1">
        <h3 className="font-serif text-[1.05rem] font-semibold">{title}</h3>
        <span className="font-mono text-[0.62rem] text-muted-foreground">{count} chosen</span>
      </div>
      {count > 0 ? children : <p className="text-[0.85rem] italic text-muted-foreground">{empty}</p>}
    </section>
  );
}
