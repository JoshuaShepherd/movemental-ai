import { ROSETTE_MARK, ROSETTE_SMALL } from "./rosette-mark";

/**
 * The Movemental mark, from the Brand boards on the Movemental canvas
 * (docs/handoff/brand-nav/README.md). The rosette is one continuous line drawn in currentColor.
 * Below 20 px the twelve-loop rosette takes over so the mark stays open.
 */
export function Rosette({
  size,
  strokePx = 1,
  className,
}: {
  size: number;
  strokePx?: number;
  className?: string;
}) {
  const d = size < 20 ? ROSETTE_SMALL : ROSETTE_MARK;
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ display: "block", flex: "0 0 auto", overflow: "visible" }}
    >
      <path
        className="mv-mark-line"
        d={d}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={(strokePx * 100) / size}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Direction B, the signet: the rosette beside the Instrument Serif wordmark. */
export function MvSignet({ size = 27, className }: { size?: number; className?: string }) {
  return (
    <span className={`mv-signet ${className ?? ""}`} style={{ gap: Math.round(size * 0.4) }}>
      <span className="mv-signet-turn">
        <Rosette size={Math.round(size * 1.15)} />
      </span>
      <span className="mv-signet-word" style={{ fontSize: size }}>
        movemental
      </span>
    </span>
  );
}
