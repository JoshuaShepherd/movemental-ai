/**
 * Lazy PostHog client — no-ops when the key is unset or init fails.
 * Never throws; analytics must not block the agent room.
 */

type PostHogCapture = {
  capture: (event: string, properties?: Record<string, unknown>) => void;
  identify: (distinctId: string, properties?: Record<string, unknown>) => void;
};

let client: PostHogCapture | null = null;
let initStarted = false;

function posthogKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  return key?.trim() ? key : undefined;
}

async function initClient(): Promise<PostHogCapture | null> {
  if (typeof window === "undefined") return null;
  const key = posthogKey();
  if (!key) return null;
  if (client) return client;
  if (initStarted) return null;
  initStarted = true;

  try {
    const mod = await import("posthog-js");
    const posthog = mod.default;
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://us.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false,
      capture_pageleave: false,
    });
    client = posthog;
    return client;
  } catch {
    return null;
  }
}

/** Fire-and-forget capture — safe to call from hot paths. */
export function posthogCapture(event: string, properties?: Record<string, unknown>): void {
  if (client) {
    try {
      client.capture(event, properties);
    } catch {
      /* non-fatal */
    }
    return;
  }
  void initClient()
    .then((ph) => {
      ph?.capture(event, properties);
    })
    .catch(() => {});
}

/** Bind anon/session ids once per room session. */
export function posthogIdentify(distinctId: string): void {
  void initClient()
    .then((ph) => {
      ph?.identify(distinctId);
    })
    .catch(() => {});
}

/** Test seam — inject a mock capture without PostHog. */
export function __setPostHogCaptureForTests(fn: PostHogCapture["capture"] | null): void {
  if (fn) {
    client = { capture: fn, identify: () => {} };
    initStarted = true;
    return;
  }
  client = null;
  initStarted = false;
}
