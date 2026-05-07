import { cn } from "@/lib/utils";

/**
 * Reusable "If this stage is skipped" treatment. Subtle warning styling with
 * a left-border accent, italic serif heading, and a compact list of risks.
 */
interface IfSkippedComponentProps {
  /** Override the default heading. */
  heading?: string;
  /** 3–4 short risk statements. */
  items: readonly string[];
  className?: string;
}

export function IfSkippedComponent({
  heading = "If this stage is skipped",
  items,
  className,
}: IfSkippedComponentProps) {
  return (
    <aside
      aria-label={heading}
      className={cn(
        "border-l-4 border-primary/40 bg-section/60 px-6 py-6 md:px-8 md:py-8",
        className,
      )}
    >
      <p className="font-serif text-xl italic leading-snug tracking-tight text-foreground md:text-2xl">
        {heading}
      </p>
      <ul className="mt-5 flex flex-col gap-3 text-base leading-relaxed text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden
              className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary/60"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
