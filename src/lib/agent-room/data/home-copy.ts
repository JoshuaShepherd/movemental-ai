/**
 * Agent Room home screen copy SSOT — shared by live HomeScreen and SSR fallback.
 */
export const HOME_SCREEN_COPY = {
  headline: "Navigate AI without eroding the trust you spent decades earning.",
  bodyBeforePhrase:
    "We help mission-driven organizations respond to AI without losing",
  phrase: "the trust their work depends on",
  bodyAfterPhrase:
    ", through one ordered path: get safe, experiment, form your people, then build.",
  networkLine:
    "Built with and backed by movement leaders including Alan Hirsch, Brad Brisco, JR Woodward, Dave Ferguson, Josh Shepherd, and others in the network.",
} as const;

/** Primary opening chip label — safety-flow on-ramp. */
export const HOME_LEAD_CHIP_LABEL = "Get a clear next AI step" as const;

/** Honest no-JS message for `/agent` fallback. */
export const AGENT_ROOM_NOSCRIPT =
  "The full Movemental guide runs in your browser. Enable JavaScript to use the interactive room, or read the summary below." as const;

/** About screen lede — optional SSR fallback pointer. */
export const ABOUT_SCREEN_LEDE =
  "We help churches, nonprofits, and schools use AI without losing the trust their work depends on." as const;
