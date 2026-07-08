"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CheckIcon, CopyIcon } from "./icons";

type SelectableTileProps = {
  selected: boolean;
  onToggle: () => void;
  onCopy: () => void;
  copyLabel: string;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
  /** Extra index badge (images step) */
  indexLabel?: string;
};

export function SelectableTile({
  selected,
  onToggle,
  onCopy,
  copyLabel,
  ariaLabel,
  className,
  children,
  indexLabel,
}: SelectableTileProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={ariaLabel}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("[data-noselect]")) return;
        onToggle();
      }}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !(e.target as HTMLElement).closest("[data-noselect]")) {
          e.preventDefault();
          onToggle();
        }
      }}
      className={cn(
        "group relative mb-2.5 block w-full break-inside-avoid overflow-hidden rounded text-left",
        "border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)]",
        "transition-[transform,box-shadow,border-color] duration-150",
        "hover:-translate-y-0.5 hover:shadow-[0_8px_22px_-14px_rgba(26,26,26,0.4)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink-band-blue)]",
        selected && "border-[var(--color-ink-band-blue)] shadow-[0_0_0_2px_var(--color-ink-band-blue)]",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-2 right-10 z-[5] grid size-[22px] place-items-center rounded-full bg-[var(--color-ink-band-blue)] shadow-sm",
          "scale-[0.4] opacity-0 transition-[transform,opacity] duration-150",
          selected && "scale-100 opacity-100",
        )}
        aria-hidden
      >
        <CheckIcon />
      </span>

      <button
        type="button"
        data-noselect
        aria-label={copyLabel}
        title={copyLabel}
        onClick={(e) => {
          e.stopPropagation();
          onCopy();
        }}
        className="absolute top-2 right-2 z-[6] grid size-[26px] place-items-center rounded-full bg-[rgba(10,14,26,0.55)] p-0 transition-[background,transform] hover:bg-[rgba(10,14,26,0.82)] active:scale-90"
      >
        <CopyIcon className="stroke-white" />
      </button>

      {indexLabel ? (
        <span className="absolute top-2 left-2 z-[4] rounded-sm bg-[rgba(10,14,26,0.55)] px-1 py-0.5 font-mono text-[0.6rem] tracking-wide text-white">
          {indexLabel}
        </span>
      ) : null}

      {children}
    </div>
  );
}
