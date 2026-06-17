import type { ReactNode } from "react";

/**
 * Step spine for Ink Band utility pages (proposal §3.8, reference pattern A).
 *
 * A left ink-blue rule + mono eyebrow that ties standalone entry points
 * (`/assess`, `/enroll`, `/field-guide`) to the agent room's numbered path
 * vocabulary. When `step` is given it renders a large faint ghost numeral above
 * the label (matching the readback ghost number); omit it where no real stage
 * number exists. Presentational and UI-only — relies on the `--color-ink-band-*`
 * ramp available inside `.ink-band-surface`.
 */
export function StepSpine({
  step,
  label,
  title,
  active = true,
}: {
  step?: string;
  label: string;
  title?: ReactNode;
  active?: boolean;
}) {
  return (
    <div className="relative pl-6">
      <span
        aria-hidden
        className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
        style={{
          background: active
            ? "var(--color-ink-band-blue)"
            : "var(--color-ink-band-border)",
        }}
      />
      {step ? (
        <span
          aria-hidden
          className="block select-none font-mono font-semibold leading-none text-[clamp(2.5rem,8vw,3.5rem)] tracking-[-0.03em]"
          style={{ color: "var(--color-ink-band-blue)", opacity: 0.12 }}
        >
          {step}
        </span>
      ) : null}
      <p className="mt-1 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      {title ? (
        <h1 className="mt-2 text-4xl leading-tight md:text-5xl">{title}</h1>
      ) : null}
    </div>
  );
}
