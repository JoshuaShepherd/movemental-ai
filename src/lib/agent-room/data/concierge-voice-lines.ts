/**
 * Concierge persona voice lines (CON-01 SSOT).
 *
 * Stub + stream local choreography import from here so offline and live entry
 * greet identically. Engine scene layer (`HOST_SCENES.narration`) mirrors these
 * strings in movemental-ai-agents/scripts/seed-data/scenes/room-scenes.ts.
 */
export const CONCIERGE_VOICE = {
  /** Self-names once on entry — signature opening ink line. */
  openingGreeting:
    "I'm the Movemental Concierge — here to help you see where your organization stands with AI, and what to do next.",
  onRamp: "Want to see where you actually stand?",
  uncertainty:
    "I'm not certain I have that. I can put you in touch with a person who can answer it properly.",
  refusal:
    "That's outside what I can help with — I only work on where your organization stands with AI. If it's useful, I can put you in touch with a person.",
  farewell: "The path stays here whenever you're ready.",
  /** CON-02: in-persona stall recovery (stream/hybrid). */
  stallRecovery: "The line went quiet — let me try that again.",
  terminalError:
    "Something isn't connecting just now. I can put you in touch with a person if you'd rather talk live.",
} as const;

export type ConciergeVoiceKey = keyof typeof CONCIERGE_VOICE;
