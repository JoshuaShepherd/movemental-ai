export type ParsedCalendlyInviteeEvent = {
  /** ISO 8601 start time of the scheduled event */
  startTimeIso: string;
  /** Organization slug from embed UTM (`utm_content`) */
  organizationSlug: string;
  inviteeEmail: string | null;
  /** Stable URI for idempotent processing */
  inviteeUri: string | null;
};

function readStartTime(payload: Record<string, unknown>): string | null {
  const ev = payload.event;
  if (ev && typeof ev === "object") {
    const st = (ev as { start_time?: unknown }).start_time;
    if (typeof st === "string" && st) return st;
  }
  const sched = payload.scheduled_event;
  if (sched && typeof sched === "object") {
    const st = (sched as { start_time?: unknown }).start_time;
    if (typeof st === "string" && st) return st;
  }
  return null;
}

function readTrackingUtmContent(payload: Record<string, unknown>): string | null {
  const tr = payload.tracking;
  if (!tr || typeof tr !== "object") return null;
  const c = (tr as { utm_content?: unknown }).utm_content;
  return typeof c === "string" && c.trim() ? c.trim() : null;
}

function readInvitee(payload: Record<string, unknown>): { email: string | null; uri: string | null } {
  const inv = payload.invitee;
  if (!inv || typeof inv !== "object") return { email: null, uri: null };
  const email = (inv as { email?: unknown }).email;
  const uri = (inv as { uri?: unknown }).uri;
  return {
    email: typeof email === "string" ? email : null,
    uri: typeof uri === "string" ? uri : null,
  };
}

/**
 * Parse Calendly `invitee.created` (and similar) payloads for cohort scheduling.
 */
export function parseCalendlyInviteePayload(body: unknown): ParsedCalendlyInviteeEvent | null {
  if (!body || typeof body !== "object") return null;
  const root = body as Record<string, unknown>;
  const payload = root.payload;
  if (!payload || typeof payload !== "object") return null;
  const p = payload as Record<string, unknown>;

  const startTimeIso = readStartTime(p);
  const organizationSlug = readTrackingUtmContent(p);
  const { email, uri } = readInvitee(p);

  if (!startTimeIso || !organizationSlug) return null;

  return {
    startTimeIso,
    organizationSlug,
    inviteeEmail: email,
    inviteeUri: uri,
  };
}
