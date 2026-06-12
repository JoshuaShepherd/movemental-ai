/**
 * Global hand-drawn SVG filter defs — mounted ONCE per `/agent` subtree (see
 * agent/layout.tsx). Deck gestures reference these by id (`filter: url(#rough)`,
 * `filter: url(#marker)`) instead of each instance carrying its own <defs>.
 *
 * Server component — pure markup, no client cost. `aria-hidden` + zero-size so
 * it never affects layout or the accessibility tree.
 */
export function InkFilters() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter id="rough" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves="2" seed="6" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="marker" x="-15%" y="-70%" width="130%" height="240%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.11" numOctaves="2" seed="9" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
