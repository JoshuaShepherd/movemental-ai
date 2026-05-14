import type { ReactNode } from "react";

import type { CitationId } from "@/lib/citations/claims";

import { Cite } from "./cite";

/**
 * Stat-cell composition: a hero-sized number with an inline citation chip
 * tucked tight against it. Used inside the home-page stat strip, where the
 * value is the primary visual element and the chip rides as a superscript
 * annotation.
 */

export type CitedNumberProps = {
  /** The headline value, e.g. "92%", "$893M", "1 in 3" */
  value: ReactNode;
  /** The citation that anchors the value */
  claimId: CitationId;
  /** Optional descriptive label rendered beneath the value */
  label?: ReactNode;
  className?: string;
};

export function CitedNumber({ value, claimId, label, className }: CitedNumberProps) {
  return (
    <div className={className}>
      <p className="stat-cell__value">
        {value}
        <Cite claimId={claimId} />
      </p>
      {label ? <p className="stat-cell__label">{label}</p> : null}
    </div>
  );
}
