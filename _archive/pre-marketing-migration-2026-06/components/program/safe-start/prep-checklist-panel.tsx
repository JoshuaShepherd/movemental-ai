/** Prep checklist panel — safestart-hero-timeline family. */
export function PrepChecklistPanel({
  eyebrow,
  title,
  intro,
  bullets,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  bullets?: string[];
}) {
  return (
    <section className="flex flex-col items-start gap-8 border-l-4 border-pathway-accent bg-safestart-surface-container p-8 md:flex-row lg:gap-16">
      <div className="flex min-w-[200px] flex-col gap-2">
        {eyebrow ? (
          <span className="font-body text-xs font-semibold uppercase tracking-widest text-pathway-accent">
            {eyebrow}
          </span>
        ) : null}
        {title ? (
          <h2 className="font-headline text-2xl italic leading-tight text-safestart-ink">{title}</h2>
        ) : null}
      </div>
      <div className="flex max-w-[500px] flex-col gap-4">
        {intro ? <p className="font-body text-[15px] leading-relaxed text-safestart-ink">{intro}</p> : null}
        {bullets?.length ? (
          <ul className="flex flex-col gap-2 font-body text-[15px] text-safestart-muted">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-1 text-xs text-pathway-accent">▪</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
