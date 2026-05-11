import { cn } from "@/lib/utils";

/**
 * A small horizontal series mast that names the four-volume field guide line
 * and highlights the active volume. Rendered near the top of pathway pages so
 * readers see Volume One and Volume Two as part of a coherent publication line.
 */
export function FieldGuideSeriesMast({
  active,
  className,
}: {
  active: "vol-01" | "vol-02";
  className?: string;
}) {
  const volumes: ReadonlyArray<{
    slug: "vol-01" | "vol-02" | "vol-03" | "vol-04";
    label: string;
    title: string;
    state: "available" | "gated" | "forthcoming";
  }> = [
    {
      slug: "vol-01",
      label: "Vol. 01 · Safety",
      title: "It Starts With Safety",
      state: "available",
    },
    {
      slug: "vol-02",
      label: "Vol. 02 · Sandbox",
      title: "It Continues With Exploration",
      state: "gated",
    },
    {
      slug: "vol-03",
      label: "Vol. 03 · Skills",
      title: "Forthcoming",
      state: "forthcoming",
    },
    {
      slug: "vol-04",
      label: "Vol. 04 · Solutions",
      title: "Forthcoming",
      state: "forthcoming",
    },
  ];

  return (
    <div className={cn("border-y border-border/40 bg-background", className)}>
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-3 px-6 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <p className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
          The Movemental Field Guides
        </p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-[0.7rem] sm:flex sm:flex-wrap sm:items-center sm:gap-6">
          {volumes.map((v) => {
            const isActive = v.slug === active;
            return (
              <li
                key={v.slug}
                className={cn(
                  "flex items-baseline gap-2",
                  v.state === "forthcoming" && "text-muted-foreground/70",
                )}
              >
                <span
                  className={cn(
                    "font-semibold uppercase tracking-eyebrow",
                    isActive ? "text-pathway-accent" : "text-muted-foreground",
                  )}
                >
                  {v.label}
                </span>
                <span
                  className={cn(
                    "font-serif-display italic",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {v.title}
                </span>
                {isActive ? (
                  <span aria-hidden className="text-pathway-accent">
                    ←
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
