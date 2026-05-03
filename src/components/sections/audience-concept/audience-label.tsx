import { cn } from "@/lib/utils";

/** Dot + uppercase label — parity with `docs/html/*-concept-modern` `.label`. */
export function AudienceLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  /** Override default `mb-4` when stacking labels (e.g. path “The sequence”). */
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground",
        className
      )}
    >
      <span
        className="size-1.5 shrink-0 rounded-full bg-foreground/80"
        aria-hidden
      />
      {children}
    </p>
  );
}
