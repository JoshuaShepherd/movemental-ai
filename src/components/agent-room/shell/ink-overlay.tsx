"use client";

import { useAgentRoomRefs } from "../agent-room-context";
import styles from "../ink-band.module.css";

/**
 * The `#ink` overlay — an absolutely-positioned SVG covering the stage, into
 * which the gesture layer (AF-04) appends underline / circle / arrow strokes.
 *
 * The two filter defs are the hand-drawn texture the prototype uses (index.html
 * lines 17–24): `#rough` roughens gesture strokes (`.stroke { filter:url(#rough) }`)
 * and `#marker` gives the lead suggestion chip its highlighter bleed
 * (`.chip.lead::before { filter:url(#marker) }`). Both ids are global (not
 * CSS-module-scoped) so those `url(#…)` references resolve. Stroke geometry and
 * the rAF draw loop arrive in AF-04.
 */
export function InkOverlay() {
  const { inkSvg } = useAgentRoomRefs();
  return (
    <svg ref={inkSvg} className={styles.ink} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <filter id="rough" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves="2" seed="6" result="n" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="1.7"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="marker" x="-15%" y="-70%" width="130%" height="240%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.11"
            numOctaves="2"
            seed="9"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="3.4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
