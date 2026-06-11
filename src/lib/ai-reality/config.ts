/**
 * AI Reality Dashboard CTA configuration — the next-step targets are
 * configurable, not hardcoded, so the same build serves the public front door
 * and a named engagement. Override per deployment via env; sensible defaults
 * match the existing agent flow (free Field Guide + the $1,000 Safety engagement).
 */
export interface AiRealityCta {
  label: string;
  description: string;
  href: string;
}

export interface AiRealityCtaConfig {
  free: AiRealityCta;
  paid: AiRealityCta;
}

export function getAiRealityCtaConfig(): AiRealityCtaConfig {
  return {
    free: {
      label: "Read the Field Guide",
      description: "It Starts With Safety — the free guide to the first move. No cost, no gate.",
      href: process.env.NEXT_PUBLIC_AI_REALITY_FREE_CTA_HREF || "/field-guide",
    },
    paid: {
      label: "Start the Safety engagement",
      description: "Work the first stage with us — $1,000, and your dashboard is set up within 24 hours.",
      href: process.env.NEXT_PUBLIC_AI_REALITY_PAID_CTA_HREF || "/agent",
    },
  };
}
