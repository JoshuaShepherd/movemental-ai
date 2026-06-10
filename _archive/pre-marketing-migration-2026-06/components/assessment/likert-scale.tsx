"use client";

import * as React from "react";

import { LIKERT_LABELS } from "@/lib/ssss-integrity-assessment";
import { cn } from "@/lib/utils";

type Props = {
  /** Stable name for the radio group; ties the legend to the inputs. */
  name: string;
  /** 0–4 selected index (or null for unanswered). */
  value: number | null;
  onChange: (v: number) => void;
  disabled?: boolean;
  /** Auto-focus the first or selected option on mount (used after navigating to a new question). */
  autoFocus?: boolean;
};

/**
 * Five-point scale rendered as five stacked, selectable rows.
 * Keyboard: arrow keys move focus, 1–5 select directly.
 */
export function LikertScale({ name, value, onChange, disabled, autoFocus }: Props) {
  const groupRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!autoFocus || !groupRef.current) return;
    const target =
      (value !== null
        ? groupRef.current.querySelector<HTMLInputElement>(`input[value="${value}"]`)
        : null) ?? groupRef.current.querySelector<HTMLInputElement>("input[type='radio']");
    target?.focus({ preventScroll: true });
  }, [autoFocus, name, value]);

  // Number-key shortcuts (1–5) and arrow-key navigation across rows.
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key >= "1" && e.key <= "5") {
      e.preventDefault();
      onChange(Number(e.key) - 1);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = value === null ? 0 : Math.min(LIKERT_LABELS.length - 1, value + 1);
      onChange(next);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = value === null ? 0 : Math.max(0, value - 1);
      onChange(prev);
    }
  };

  return (
    <div
      ref={groupRef}
      className="space-y-3"
      role="radiogroup"
      aria-labelledby={`${name}-legend`}
      onKeyDown={onKeyDown}
    >
      <span id={`${name}-legend`} className="sr-only">
        Select how true this statement is for your organization
      </span>
      {LIKERT_LABELS.map((label, idx) => {
        const checked = value === idx;
        return (
          <label
            key={label}
            className={cn(
              "group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-xl bg-card p-5 shadow-ambient transition-colors",
              "hover:bg-section has-focus-visible:ring-2 has-focus-visible:ring-primary has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background",
              disabled && "pointer-events-none opacity-60",
            )}
          >
            <input
              type="radio"
              name={name}
              value={String(idx)}
              checked={checked}
              disabled={disabled}
              onChange={() => onChange(idx)}
              className="sr-only"
            />
            <span
              className={cn(
                "flex items-center gap-3 text-base font-medium text-foreground transition-colors",
                checked && "text-primary",
                "group-hover:text-primary",
              )}
            >
              <span
                className="hidden text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground sm:inline"
                aria-hidden
              >
                {idx + 1}
              </span>
              {label}
            </span>
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                checked ? "border-primary bg-primary" : "border-border",
              )}
              aria-hidden
            >
              <span
                className={cn(
                  "size-2.5 rounded-full bg-primary-foreground scale-0 transition-transform",
                  checked && "scale-100",
                )}
              />
            </span>
          </label>
        );
      })}
    </div>
  );
}
