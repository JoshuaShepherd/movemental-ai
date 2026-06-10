"use client";

import Script from "next/script";
import * as React from "react";

type CalendlyEmbedProps = {
  /** Full Calendly scheduling URL (may include UTM params). */
  url: string;
  className?: string;
};

/**
 * Inline Calendly widget via official embed markup (`widget.js` + `calendly-inline-widget`).
 */
export function CalendlyEmbed({ url, className }: CalendlyEmbedProps) {
  return (
    <div className={className}>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      <div
        key={url}
        className="calendly-inline-widget min-h-[min(720px,75vh)] w-full overflow-hidden rounded-xl bg-card ring-1 ring-border"
        data-url={url}
        style={{ minWidth: "320px", height: "min(720px, 75vh)" }}
      />
    </div>
  );
}
