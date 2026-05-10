import type { ReactNode } from "react";

export function PathwayVoiceFallback({
  initials,
  name,
  role,
  children,
}: {
  initials: string;
  name: string;
  role: string;
  children: ReactNode;
}) {
  return (
    <article>
      <div className="mb-5 flex aspect-[4/5] w-full flex-col items-center justify-center border border-border/50 bg-section px-6 text-center">
        <span className="font-serif-display text-5xl italic leading-none tracking-tight text-foreground sm:text-7xl">
          {initials}
        </span>
        <span className="mt-6 max-w-[18ch] text-[0.62rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
          Editorial portrait in production
        </span>
      </div>
      <h3 className="font-serif-display text-xl italic text-foreground">{name}</h3>
      <p className="text-[0.62rem] font-medium uppercase tracking-eyebrow text-muted-foreground">{role}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </article>
  );
}
