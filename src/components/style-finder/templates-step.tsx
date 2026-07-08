"use client";

import { useEffect, useRef } from "react";

import { TEMPLATES } from "@/lib/visual-style-finder/data/templates";
import { buildTemplatePrompt } from "@/lib/visual-style-finder/utils/prompts";

import { rawCopyText } from "./clipboard";
import { SelectableTile } from "./selectable-tile";
import { StepLead } from "./step-lead";
import { stepKey } from "@/lib/visual-style-finder/constants";

type TemplatesStepProps = {
  selected: Set<string>;
  onToggle: (id: string) => void;
  onCopied: (label: string) => void;
};

function TemplateScreenshot({ url, name }: { url: string; name: string }) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    let tries = 0;
    let viaThum = false;

    const mshot = () =>
      `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=640${tries ? `&r=${tries}` : ""}`;

    img.onload = () => {
      img.classList.add("opacity-100");
      if (!viaThum && tries < 2) {
        tries += 1;
        window.setTimeout(() => {
          img.src = mshot();
        }, 4200);
      }
    };

    img.onerror = () => {
      if (!viaThum) {
        viaThum = true;
        img.src = `https://image.thum.io/get/width/640/${url}`;
      }
    };

    img.src = mshot();
  }, [url]);

  return (
    <img
      ref={imgRef}
      alt={`${name} screenshot`}
      loading="lazy"
      className="absolute inset-0 size-full object-cover object-top opacity-0 transition-opacity duration-300"
    />
  );
}

export function TemplatesStep({ selected, onToggle, onCopied }: TemplatesStepProps) {
  const copyTemplate = async (id: string) => {
    const t = TEMPLATES.find((x) => x.id === id);
    if (!t) return;
    try {
      await rawCopyText(buildTemplatePrompt(t));
      onCopied("Stitch prompt copied");
    } catch {
      onCopied("Copy failed");
    }
  };

  return (
    <div>
      <StepLead
        kicker={stepKey("templates")}
        title="Real sites & templates."
        description={
          <>
            Actual living websites and template starting points. Tap the ones you would happily launch from —{" "}
            <b className="text-[var(--color-ink-band-blue)]">Open ↗</b> shows you the real thing. Thumbnails load as
            you browse.
          </>
        }
      />

      <div className="columns-1 gap-2.5 sm:columns-2 xl:columns-3">
        {TEMPLATES.map((t) => {
          const kind = t.kind === "template" ? "Template" : "Live site";
          return (
            <SelectableTile
              key={t.id}
              selected={selected.has(t.id)}
              onToggle={() => onToggle(t.id)}
              onCopy={() => void copyTemplate(t.id)}
              copyLabel="Copy Stitch prompt"
              ariaLabel={`${t.nm} — ${t.dm}`}
              className="bg-[var(--color-ink-band-bg)]"
            >
              <span className="absolute top-2 left-2 z-[4] rounded-sm bg-[rgba(10,14,26,0.6)] px-1.5 py-0.5 font-mono text-[0.54rem] uppercase tracking-wider text-white">
                {kind}
              </span>
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-ink-band-surface)]">
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-br from-[var(--color-ink-band-surface)] to-[#ece5d6] p-3.5">
                  <div className="font-serif text-[1.15rem] font-semibold leading-tight">{t.nm}</div>
                  <div className="mt-1 font-mono text-[0.58rem] tracking-wide text-muted-foreground">{t.dm}</div>
                </div>
                <TemplateScreenshot url={t.url} name={t.nm} />
              </div>
              <div className="flex items-start justify-between gap-2 border-t border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-bg)] px-2.5 py-2">
                <div className="min-w-0">
                  <div className="font-serif text-[0.9rem] font-semibold leading-tight">{t.nm}</div>
                  <div className="mt-0.5 font-mono text-[0.56rem] tracking-wide text-muted-foreground">
                    {t.dm} · {t.tag}
                  </div>
                </div>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-noselect
                  className="shrink-0 rounded-sm border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-bg)] px-2 py-1.5 font-mono text-[0.58rem] uppercase tracking-wide text-[var(--color-ink-band-blue)] no-underline transition-colors hover:border-[var(--color-ink-band-blue)] hover:bg-[var(--color-ink-band-surface)]"
                >
                  Open ↗
                </a>
              </div>
            </SelectableTile>
          );
        })}
      </div>
    </div>
  );
}
