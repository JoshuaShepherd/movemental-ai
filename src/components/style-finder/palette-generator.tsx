"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { FAM_LABEL, FAM_ORDER } from "@/lib/visual-style-finder/data/color-families";
import type { ColorFamilyId, GenColumn } from "@/lib/visual-style-finder/types";
import { bestText } from "@/lib/visual-style-finder/utils/color-math";
import { generatePalette } from "@/lib/visual-style-finder/utils/palette-generator";
import { buildGenText } from "@/lib/visual-style-finder/utils/prompts";
import { cn } from "@/lib/utils";

import { rawCopyText } from "./clipboard";
import { CopyIcon, LockOffIcon, LockOnIcon } from "./icons";

type PaletteGeneratorProps = {
  genFamily: ColorFamilyId | "any";
  gen: GenColumn[];
  savedCount: number;
  onFamilyChange: (family: ColorFamilyId | "any") => void;
  onGenChange: (gen: GenColumn[]) => void;
  onSave: () => void;
  onCopied: (label: string) => void;
};

export function PaletteGenerator({
  genFamily,
  gen,
  savedCount,
  onFamilyChange,
  onGenChange,
  onSave,
  onCopied,
}: PaletteGeneratorProps) {
  const [dragIndex, setDragIndex] = useState(-1);

  const roll = useCallback(() => {
    onGenChange(generatePalette(genFamily, gen));
  }, [gen, genFamily, onGenChange]);

  useEffect(() => {
    if (!gen.length) roll();
  }, [gen.length, roll]);

  const moveCol = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= gen.length) return;
    const next = [...gen];
    [next[i], next[j]] = [next[j]!, next[i]!];
    onGenChange(next);
  };

  const dropCol = (target: number) => {
    if (dragIndex < 0 || dragIndex === target) return;
    const next = [...gen];
    const [item] = next.splice(dragIndex, 1);
    next.splice(target, 0, item!);
    onGenChange(next);
    setDragIndex(-1);
  };

  const copyGen = async () => {
    try {
      await rawCopyText(buildGenText(gen, genFamily));
      onCopied("Palette copied");
    } catch {
      onCopied("Copy failed");
    }
  };

  return (
    <div>
      <div className="mb-4 rounded-md border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] p-4">
        <div className="font-serif text-[0.95rem] font-semibold">How the generator works</div>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[0.78rem] leading-relaxed text-muted-foreground">
          <li>
            <b className="text-foreground">Pick a family tab.</b> Each one — Ink, Warm, Earthy, Muted, Dark, Bold,
            Painterly — keeps every colour in that mood. <b className="text-foreground">Surprise</b> rolls a random
            family each time.
          </li>
          <li>
            <b className="text-foreground">Press the spacebar</b> (or tap Generate) to roll a fresh five-colour palette.
          </li>
          <li>
            <b className="text-foreground">Lock what you like.</b> Tap a swatch&apos;s lock icon to hold that one colour,
            then keep rolling.
          </li>
          <li>
            <b className="text-foreground">Save</b> to keep a palette; it lands in your results. <b className="text-foreground">Copy</b>{" "}
            sends the current one to Stitch.
          </li>
        </ol>
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1">
          {[...FAM_ORDER, "any" as const].map((k) => (
            <button
              key={k}
              type="button"
              title={k === "any" ? "Rolls a random family each time" : undefined}
              onClick={() => {
                onFamilyChange(k);
                onGenChange(generatePalette(k, gen));
              }}
              className={cn(
                "rounded-sm border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wide transition-colors",
                genFamily === k
                  ? "border-[var(--color-ink-band-blue)] bg-[var(--color-ink-band-blue)] text-white"
                  : "border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-bg)] text-muted-foreground hover:text-foreground",
              )}
            >
              {FAM_LABEL[k]}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={roll}>
            Generate
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => void copyGen()}>
            Copy
          </Button>
          <Button type="button" variant="primary" size="sm" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>

      <div className="flex min-h-[200px] gap-1 overflow-hidden rounded-md border border-[var(--color-ink-band-border)]">
        {gen.map((col, i) => {
          const bt = bestText(col.hex);
          return (
            <div
              key={`${col.role}-${i}`}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragEnd={() => setDragIndex(-1)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                dropCol(i);
              }}
              className={cn("relative flex min-h-[200px] flex-1 flex-col justify-between p-2", col.locked && "ring-2 ring-inset ring-white/40")}
              style={{ background: col.hex }}
            >
              <div className="flex justify-between gap-1">
                <button
                  type="button"
                  title="Lock"
                  style={{ color: bt.t }}
                  onClick={() => {
                    const next = [...gen];
                    next[i] = { ...col, locked: !col.locked };
                    onGenChange(next);
                  }}
                  className="grid size-7 place-items-center rounded bg-black/10 p-0"
                >
                  {col.locked ? <LockOnIcon /> : <LockOffIcon />}
                </button>
                <button
                  type="button"
                  title="Copy hex"
                  style={{ color: bt.t }}
                  onClick={() => void rawCopyText(col.hex.toUpperCase()).then(() => onCopied("Hex copied"))}
                  className="grid size-7 place-items-center rounded bg-black/10 p-0"
                >
                  <CopyIcon />
                </button>
              </div>
              <div style={{ color: bt.t }}>
                <div className="font-mono text-[0.72rem] font-medium">{col.hex.toUpperCase()}</div>
                <div className="font-mono text-[0.58rem] opacity-80">
                  {bt.r.toFixed(1)}:1{bt.r >= 4.5 ? " AA" : ""}
                </div>
              </div>
              <div className="flex justify-between">
                <button type="button" style={{ color: bt.t }} className="px-1 text-lg leading-none" onClick={() => moveCol(i, -1)}>
                  ‹
                </button>
                <button type="button" style={{ color: bt.t }} className="px-1 text-lg leading-none" onClick={() => moveCol(i, 1)}>
                  ›
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {savedCount > 0 ? (
        <p className="mt-2 font-mono text-[0.62rem] text-muted-foreground">Saved {savedCount} palette(s) to results</p>
      ) : null}
    </div>
  );
}
