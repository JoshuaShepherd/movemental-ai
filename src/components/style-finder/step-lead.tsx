import type { ReactNode } from "react";

type StepLeadProps = {
  kicker: string;
  title: string;
  description: ReactNode;
};

export function StepLead({ kicker, title, description }: StepLeadProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-2 px-1 pb-2.5">
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-ink-band-blue)]">
        {kicker}
      </span>
      <h2 className="font-serif text-[clamp(1.1rem,2.6vw,1.5rem)] font-semibold tracking-tight">{title}</h2>
      <p className="w-full text-[0.82rem] text-muted-foreground max-w-[60ch]">{description}</p>
    </div>
  );
}
