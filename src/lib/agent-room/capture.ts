/**
 * Agent Room — capture (lead) surfaces. Ports the prototype's three capture
 * variants (map / paid / free) as DATA, plus the single integration seam.
 *
 * There is NO backend here. A valid submit lands in the in-memory `LEADS`
 * object and logs via `submitLead` — the one place a real POST gets wired later.
 * Mirrors the AF-01 "choreography as data" contract: the capture form is part of
 * the agent's screen set, presented and gestured-to by the runner.
 */

export type CaptureKind = "map" | "paid" | "free" | "discuss";

export interface CaptureField {
  key: string;
  label: string;
  type: "text" | "email";
  required: boolean;
  autoComplete: string;
  placeholder?: string;
}

export interface CaptureVariant {
  eyebrow: string;
  heading: string;
  sub: string;
  submit: string;
  fields: CaptureField[];
  /** Soft-gate escape (map only) — label for the "skip" affordance. */
  skip?: string;
}

/** The three capture surfaces, in the agent's own voice. */
export const CAPTURE_VARIANTS: Record<CaptureKind, CaptureVariant> = {
  map: {
    eyebrow: "Keep a copy",
    heading: "Email this to yourself",
    sub: "We’ll send your map and the one next step it points to.",
    submit: "Send",
    fields: [
      { key: "email", label: "Email", type: "email", required: true, autoComplete: "email", placeholder: "you@org.org" },
      { key: "first", label: "First name", type: "text", required: false, autoComplete: "given-name", placeholder: "Optional" },
    ],
  },
  paid: {
    eyebrow: "Stage 01 · Safety · With us",
    heading: "Let’s get your dashboard set up.",
    sub: "Tell us who you are; we provision within 24 hours.",
    submit: "Set up my dashboard",
    fields: [
      { key: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
      { key: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
      { key: "org", label: "Organization", type: "text", required: true, autoComplete: "organization" },
      { key: "role", label: "Your role", type: "text", required: false, autoComplete: "organization-title", placeholder: "Optional" },
    ],
  },
  free: {
    eyebrow: "Stage 01 · Safety · On your own",
    heading: "Where should we send it?",
    sub: "“It Starts With Safety,” to your inbox.",
    submit: "Send me the guide",
    fields: [
      { key: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
      { key: "org", label: "Organization", type: "text", required: false, autoComplete: "organization", placeholder: "Optional" },
    ],
  },
  // INT-09 — the long-form Discuss capture. The room's highest-intent surface:
  // when a visitor wants to talk something through, the team picks it up. Same
  // `submitLead` seam as the others; reuses the on-brand form-cell.
  discuss: {
    eyebrow: "Pick this up properly",
    heading: "Want me to have the team pick this up with you?",
    sub: "Leave your email and we’ll follow up — a real person, not a form.",
    submit: "Send this to the team",
    fields: [
      { key: "email", label: "Email", type: "email", required: true, autoComplete: "email", placeholder: "you@org.org" },
      { key: "org", label: "Organization", type: "text", required: false, autoComplete: "organization", placeholder: "Optional" },
      { key: "role", label: "Your role", type: "text", required: false, autoComplete: "organization-title", placeholder: "Optional" },
    ],
  },
};

export function isCaptureKind(v: unknown): v is CaptureKind {
  return v === "map" || v === "paid" || v === "free" || v === "discuss";
}

/** Inline email check (no `<form>` native validation; we own the UX). */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadPayload = Record<string, unknown>;

/** In-memory captures (no storage). Keyed by variant; latest submit wins. */
export const LEADS: Record<CaptureKind, LeadPayload | null> = {
  map: null,
  paid: null,
  free: null,
  discuss: null,
};

/* ===========================================================================
 * THE ONLY INTEGRATION SEAM — the real POST to the capture endpoint.
 * Everything above is presentation + in-memory state; this is the one network
 * boundary. Maps the form payload (field keys from `CAPTURE_VARIANTS`) onto the
 * `/api/agent-room/capture` shape and fails soft — never throws past the runner.
 * ======================================================================== */
const CAPTURE_ENDPOINT = "/api/agent-room/capture";

function asString(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

export async function submitLead(kind: string, payload: LeadPayload): Promise<void> {
  if (!isCaptureKind(kind)) {
    console.warn("[lead] unknown capture kind; skipping", kind);
    return;
  }
  const p = payload as Record<string, unknown>;
  const email = asString(p.email);
  if (!email) {
    // Free/map variants require email; nothing to persist without it.
    console.warn("[lead] capture missing email; skipping POST", kind);
    return;
  }

  const body = {
    kind,
    email,
    first: asString(p.first),
    name: asString(p.name),
    org: asString(p.org),
    role: asString(p.role),
    source: asString(p.source) ?? "agent-room",
    sessionId: asString(p.sessionId),
    anonId: asString(p.anonId),
    mapAnswers: p.mapAnswers ?? undefined,
    metadata: p.mapRead !== undefined ? { mapRead: p.mapRead } : undefined,
  };

  try {
    const res = await fetch(CAPTURE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error("[lead] capture POST failed", kind, res.status);
    }
  } catch (err) {
    console.error("[lead] capture POST error", kind, err);
  }
}
