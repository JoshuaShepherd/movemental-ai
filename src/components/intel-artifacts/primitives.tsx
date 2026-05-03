import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { IntelField, IntelVariant } from "./types";

const ivLabel =
  "text-[0.625rem] font-semibold uppercase tracking-[0.05em] text-muted-foreground";

export function IntelView({
  field,
  variant = "full",
  className,
  children,
  style,
  "aria-label": ariaLabel,
  role = "img",
  embedded,
}: {
  field: IntelField;
  variant?: IntelVariant;
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
  "aria-label"?: string;
  role?: "img" | "region" | "presentation";
  embedded?: boolean;
}) {
  const hidden = Boolean(embedded);
  return (
    <div
      data-field={field}
      data-variant={variant}
      role={hidden ? "presentation" : role}
      aria-label={hidden ? undefined : ariaLabel}
      aria-hidden={hidden || undefined}
      className={cn(
        "relative isolate flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-md)] bg-card text-card-foreground shadow-ambient [container-type:inline-size]",
        /* Soft inner highlight + micro ring — gives depth without looking "skeuomorphic" */
        "ring-1 ring-inset ring-border/60",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-[1] before:h-px before:bg-[linear-gradient(90deg,transparent_0%,color-mix(in_srgb,var(--foreground)_8%,transparent)_50%,transparent_100%)]",
        variant === "full" && "gap-2 p-[clamp(0.5rem,3cqw,1rem)] sm:gap-3 sm:p-[clamp(0.65rem,3.5cqw,1.25rem)]",
        variant === "thumb" && "gap-0.5 p-1 sm:p-1.5",
        variant === "tile" && "gap-0.5 p-1",
        className,
      )}
      style={style}
    >
      <IvGrain />
      <div className="relative z-[2] flex min-h-0 min-w-0 flex-1 flex-col gap-[inherit]">
        {children}
      </div>
    </div>
  );
}

/**
 * Paper / grain texture layered beneath every IntelView.
 * Uses SVG `feTurbulence` for a repeatable, scale-invariant grain — no raster file,
 * tokenized opacity so it works on both light (bg-card) and midnight contexts.
 */
export function IvGrain({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.035] mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-screen",
        className,
      )}
    >
      <filter id="iv-grain" x="0" y="0">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#iv-grain)" />
    </svg>
  );
}

export function IvEyebrow({
  children,
  className,
  warm,
}: {
  children: ReactNode;
  className?: string;
  warm?: boolean;
}) {
  return (
    <span
      className={cn(
        ivLabel,
        warm && "text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Typographic primitive — replaces `IvBar` wherever a real headline, byline,
 * date, or chapter number will read more solidly than a gray placeholder.
 */
type IvTypeVariant = "title" | "subtitle" | "byline" | "chapter" | "date" | "meta" | "quote";
const ivTypeClass: Record<IvTypeVariant, string> = {
  title: "text-[0.78rem] font-semibold leading-tight tracking-tight text-foreground sm:text-sm",
  subtitle: "text-[0.68rem] font-medium leading-snug text-foreground/75 sm:text-xs",
  byline: "text-[0.58rem] font-medium tracking-wide text-muted-foreground sm:text-[0.65rem]",
  chapter: "text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-primary",
  date: "text-[0.55rem] font-mono tracking-tight text-muted-foreground",
  meta: "text-[0.55rem] font-medium text-muted-foreground sm:text-[0.6rem]",
  quote: "text-[0.68rem] leading-snug text-foreground/90 sm:text-xs",
};
export function IvType({
  as: Tag = "span",
  variant = "title",
  className,
  children,
}: {
  as?: "span" | "p" | "h3" | "h4";
  variant?: IvTypeVariant;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn(ivTypeClass[variant], className)}>{children}</Tag>;
}

export function IvChip({
  children,
  accent,
  className,
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center rounded-full bg-muted px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground",
        accent && "bg-primary/15 text-primary ring-1 ring-primary/20",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function IvRule({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block h-px w-full shrink-0 bg-border", className)}
    />
  );
}

const barBase =
  "block shrink-0 rounded-sm bg-foreground/15 motion-reduce:transition-none";

const barHeightClass: Record<NonNullable<IvBarHeight>, string> = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
  lg: "h-2.5",
  xl: "h-3",
};

type IvBarHeight = "xs" | "sm" | "md" | "lg" | "xl";

export function IvBar({
  widthPct,
  faint,
  strong,
  height = "md",
  className,
}: {
  /** Approximate width percentage (snapped to 5% steps for stable classnames). */
  widthPct: number;
  faint?: boolean;
  strong?: boolean;
  height?: IvBarHeight;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(10, Math.round(widthPct / 5) * 5));
  return (
    <span
      aria-hidden
      className={cn(
        barBase,
        barHeightClass[height],
        faint && "opacity-50",
        strong && "bg-foreground/35",
        className,
      )}
      style={{ width: `${clamped}%`, maxWidth: "100%" }}
    />
  );
}

export function IvRow({
  between,
  className,
  children,
}: {
  between?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-2",
        between && "justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function IvCol({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>{children}</div>;
}

const avatarSizeClass = {
  sm: "size-5 text-[0.55rem]",
  md: "size-7 text-[0.65rem]",
  lg: "size-9 text-[0.75rem]",
} as const;

export function IvAvatar({
  initials,
  accent,
  size = "md",
  unread,
  className,
}: {
  initials: string;
  accent?: boolean;
  size?: keyof typeof avatarSizeClass;
  unread?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full bg-elevated font-medium text-muted-foreground ring-1 ring-border/70",
        avatarSizeClass[size],
        accent && "bg-primary/20 text-primary ring-primary/25",
        className,
      )}
    >
      {initials.slice(0, 2)}
      {unread ? (
        <span
          aria-hidden
          className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-primary ring-1 ring-card"
        />
      ) : null}
    </span>
  );
}

export function IvNode({
  size = "md",
  tone = "outline",
  label,
  className,
}: {
  size?: "xs" | "sm" | "md" | "lg";
  tone?: "outline" | "filled" | "primary" | "muted";
  label?: string;
  className?: string;
}) {
  const sizeClass = {
    xs: "size-1.5",
    sm: "size-2.5",
    md: "size-3.5",
    lg: "size-5",
  }[size];
  const toneClass = {
    outline: "bg-card ring-1 ring-border",
    filled: "bg-foreground/70",
    primary:
      "bg-primary shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_22%,transparent),0_6px_18px_-4px_color-mix(in_srgb,var(--primary)_40%,transparent)]",
    muted: "bg-muted",
  }[tone];
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span
        aria-hidden
        className={cn("inline-block shrink-0 rounded-full", sizeClass, toneClass)}
      />
      {label ? (
        <span className="text-[0.55rem] font-medium uppercase tracking-[0.06em] text-muted-foreground">
          {label}
        </span>
      ) : null}
    </span>
  );
}

export function IvNodeGroup({
  count = 5,
  tone = "primary",
  className,
}: {
  count?: number;
  tone?: "primary" | "muted";
  className?: string;
}) {
  const toneClass =
    tone === "primary"
      ? "bg-primary/25 text-primary ring-1 ring-primary/35"
      : "bg-muted text-muted-foreground ring-1 ring-border";
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex size-8 items-center justify-center rounded-full text-[0.55rem] font-semibold",
        toneClass,
        className,
      )}
    >
      +{count}
    </span>
  );
}

export function IvPdfBadge({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground ring-1 ring-border",
        className,
      )}
    >
      PDF
    </span>
  );
}

export function IvPlayGlyph({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "size-6",
    md: "size-10",
    lg: "size-14",
  }[size];
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-inverse-surface/85 text-inverse-foreground ring-1 ring-inverse-foreground/15 shadow-[0_4px_14px_-4px_color-mix(in_srgb,var(--inverse-surface)_45%,transparent)]",
        sizeClass,
        className,
      )}
    >
      <svg viewBox="0 0 12 12" className="size-1/2 fill-primary" aria-hidden>
        <path d="M3 2l7 4-7 4z" />
      </svg>
    </span>
  );
}

export function IvSticky({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full rounded-[var(--radius-md)] p-3 shadow-ambient",
        "bg-[color-mix(in_srgb,var(--primary)_8%,var(--card))]",
        "[--tilt:-1deg] [transform:rotate(var(--tilt))]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function IvMeter({
  fillPct,
  className,
}: {
  fillPct: number;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, fillPct));
  return (
    <div
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}
      role="presentation"
    >
      <div
        className="h-full rounded-full bg-primary motion-safe:transition-[width] motion-safe:duration-500"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Platform-affordance glyphs — the shapes that tell your eye what kind  */
/* of artifact it's looking at before it reads any copy.                 */
/* ------------------------------------------------------------------ */

export function IvBookSpine({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-y-3 left-2 w-[3px] rounded-full bg-[linear-gradient(180deg,color-mix(in_srgb,var(--primary)_40%,transparent)_0%,color-mix(in_srgb,var(--primary)_10%,transparent)_100%)]",
        className,
      )}
    />
  );
}

export function IvWaveform({
  bars = 20,
  activeIndex,
  className,
}: {
  bars?: number;
  activeIndex?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("flex h-10 items-end justify-center gap-[2px]", className)}
    >
      {Array.from({ length: bars }, (_, i) => {
        const h = 18 + Math.abs(Math.sin(i * 0.78) + Math.cos(i * 0.31)) * 38;
        const isActive = activeIndex === i;
        return (
          <span
            key={i}
            className={cn(
              "w-[3px] rounded-t",
              isActive ? "bg-primary" : "bg-foreground/22",
            )}
            style={{ height: `${Math.min(100, h)}%` }}
          />
        );
      })}
    </div>
  );
}

export function IvChatTail({ side = "left" }: { side?: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 10 10"
      className={cn(
        "absolute bottom-0 h-2 w-2",
        side === "left" ? "-left-1" : "-right-1 scale-x-[-1]",
      )}
    >
      <path
        d="M0 10 Q 5 8 10 2 Q 10 10 0 10 Z"
        className="fill-current"
      />
    </svg>
  );
}

export function IvMailHeader({
  from,
  subject,
  time,
  unread,
  className,
}: {
  from: string;
  subject: string;
  time: string;
  unread?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <span
        aria-hidden
        className={cn(
          "mt-1 size-1.5 shrink-0 rounded-full",
          unread ? "bg-primary" : "bg-transparent",
        )}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <IvType variant="subtitle" className="truncate font-semibold">
            {from}
          </IvType>
          <IvType variant="date">{time}</IvType>
        </div>
        <IvType variant="meta" className="block truncate">
          {subject}
        </IvType>
      </div>
    </div>
  );
}

/**
 * Thin inline glyphs for platform affordance.
 * Intentionally tiny and monochrome — `currentColor` respects the surrounding tone.
 */
export function IvGlyph({
  kind,
  className,
}: {
  kind:
    | "book"
    | "podcast"
    | "video"
    | "mail"
    | "chat"
    | "doc"
    | "sheet"
    | "deck"
    | "module"
    | "rss"
    | "attachment";
  className?: string;
}) {
  const paths: Record<typeof kind, ReactNode> = {
    book: (
      <path d="M4 3h10a2 2 0 0 1 2 2v13l-2-1.5L4 17V3z" strokeWidth="1.2" />
    ),
    podcast: (
      <>
        <circle cx="10" cy="10" r="2.5" strokeWidth="1.2" />
        <path d="M5 10a5 5 0 0 1 10 0M7 10a3 3 0 0 1 6 0" strokeWidth="1.2" />
      </>
    ),
    video: (
      <>
        <rect x="3" y="5" width="12" height="10" rx="1.5" strokeWidth="1.2" />
        <path d="M14 8l4-2v8l-4-2z" strokeWidth="1.2" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="14" height="10" rx="1" strokeWidth="1.2" />
        <path d="M3 6l7 5 7-5" strokeWidth="1.2" />
      </>
    ),
    chat: (
      <path d="M3 5h14v8H8l-4 3v-3H3z" strokeWidth="1.2" />
    ),
    doc: (
      <>
        <path d="M5 3h7l4 4v10H5z" strokeWidth="1.2" />
        <path d="M12 3v4h4" strokeWidth="1.2" />
      </>
    ),
    sheet: (
      <>
        <rect x="3" y="4" width="14" height="12" rx="1" strokeWidth="1.2" />
        <path d="M3 8h14M3 12h14M8 4v12M13 4v12" strokeWidth="1.2" />
      </>
    ),
    deck: (
      <>
        <rect x="3" y="4" width="14" height="9" rx="1" strokeWidth="1.2" />
        <path d="M7 16h6M10 13v3" strokeWidth="1.2" />
      </>
    ),
    module: (
      <>
        <rect x="3" y="4" width="6" height="6" rx="1" strokeWidth="1.2" />
        <rect x="11" y="4" width="6" height="6" rx="1" strokeWidth="1.2" />
        <rect x="3" y="12" width="14" height="4" rx="1" strokeWidth="1.2" />
      </>
    ),
    rss: (
      <>
        <path d="M4 14a6 6 0 0 1 6 6M4 9a11 11 0 0 1 11 11" strokeWidth="1.2" />
        <circle cx="5.5" cy="18.5" r="1.5" strokeWidth="0" className="fill-current" />
      </>
    ),
    attachment: (
      <path d="M14 6l-6 6a2.5 2.5 0 0 0 3.5 3.5l6-6a4 4 0 1 0-5.5-5.5L6 10" strokeWidth="1.2" />
    ),
  };
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={cn("size-3.5 shrink-0 fill-none stroke-current", className)}
      vectorEffect="non-scaling-stroke"
    >
      {paths[kind]}
    </svg>
  );
}

/**
 * Confident SVG node — for richer diagrams. Renders a filled accent at the
 * origin with a soft glow, so the central spoke reads as a source, not a bullet.
 */
export function IvSvgHubNode({
  cx,
  cy,
  r = 6,
  primary,
}: {
  cx: number;
  cy: number;
  r?: number;
  primary?: boolean;
}) {
  return (
    <g>
      {primary ? (
        <circle
          cx={cx}
          cy={cy}
          r={r + 4}
          className="fill-primary/15"
        />
      ) : null}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        className={primary ? "fill-primary" : "fill-foreground/75"}
      />
      {primary ? (
        <circle
          cx={cx - r * 0.3}
          cy={cy - r * 0.3}
          r={r * 0.25}
          className="fill-white/40"
        />
      ) : null}
    </g>
  );
}
