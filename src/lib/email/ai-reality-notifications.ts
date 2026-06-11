import "server-only";

import type { MapRead } from "@/lib/agent-room/data/map-q";
import { mapStagePublicLabel } from "@/lib/ai-reality/copy";
import { resendFromHeader } from "@/lib/email/from";
import { getResend } from "@/lib/email/resend";
import { env } from "@/lib/env";
import {
  AI_REALITY_DASHBOARD_NAME,
  AI_REALITY_INSTRUMENT_NAME,
  type AiRealityOrgPayload,
} from "@/lib/ai-reality/types";

const SITE_NAME = "Movemental";

function siteUrl(): string {
  return env.NEXT_PUBLIC_SITE_URL ?? "https://movemental.com";
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&#39;");
}

const SHELL_OPEN = `<!DOCTYPE html><html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #19150f;">`;
const SHELL_CLOSE = `<p style="font-size: 14px; line-height: 1.6; color: #4a443a;">Josh<br />josh@movemental.ai</p></body></html>`;

/**
 * The map-result email — closes the "Phase 7" stub in the agent-room capture
 * route. Sends the single leader their reality map and the one next step it
 * points to. Plain, honest, no hype. Returns false when Resend isn't configured.
 */
export async function sendMapResultEmail(input: {
  email: string;
  firstName?: string | null;
  mapRead: MapRead;
}): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.warn("[ai-reality-email] RESEND_API_KEY not set, skipping map email.");
    return false;
  }

  const hello = input.firstName?.trim() ? `Hi ${esc(input.firstName.trim())},` : "Hi,";
  const gaps = (input.mapRead.gaps ?? []).filter((g) => g.stage !== "safety");
  const gapList =
    gaps.length > 0
      ? `<ul style="font-size: 15px; line-height: 1.6; padding-left: 20px;">${gaps
          .map(
            (g) =>
              `<li style="margin-bottom: 8px;"><strong>${esc(mapStagePublicLabel(g.stage))}:</strong> ${esc(g.line)}</li>`,
          )
          .join("")}</ul>`
      : `<p style="font-size: 15px; line-height: 1.6;">Nothing sharp surfaced across Sandbox, Training, or Technology.</p>`;

  const firstMoveUrl = `${siteUrl()}/agent`;
  const { error } = await resend.emails.send({
    from: resendFromHeader(),
    to: [input.email],
    subject: `Your AI reality map, ${SITE_NAME}`,
    html: `${SHELL_OPEN}
      <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 16px; letter-spacing: -0.02em;">Here's your map.</h1>
      <p style="font-size: 16px; line-height: 1.6;">${hello}</p>
      <p style="font-size: 16px; line-height: 1.6;">You cleared the Safety gate, the part almost no one does. Here's what surfaced across Sandbox, Training, and Technology, sharpest first:</p>
      ${gapList}
      <p style="font-size: 16px; line-height: 1.6;">Your next move is <strong>Sandbox</strong>: a bounded place to try AI against your real work and find what's worth keeping.</p>
      <a href="${esc(firstMoveUrl)}" style="display: inline-block; margin: 24px 0; padding: 12px 24px; background-color: #19150f; color: #faf6ee; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">Take the next step</a>
      ${SHELL_CLOSE}`,
    tags: [{ name: "flow", value: "ai_reality_map" }],
  });

  if (error) {
    console.error("[ai-reality-email] Failed to send map email:", error);
    return false;
  }
  return true;
}

/**
 * The org dashboard email — sends a leader a link to their team's
 * {@link AI_REALITY_DASHBOARD_NAME}. Only the public names are used in copy.
 */
export async function sendOrgDashboardEmail(input: {
  email: string;
  organizationName: string;
  dashboardUrl: string;
  payload: AiRealityOrgPayload;
}): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.warn("[ai-reality-email] RESEND_API_KEY not set, skipping dashboard email.");
    return false;
  }

  const p = input.payload;
  const { error } = await resend.emails.send({
    from: resendFromHeader(),
    to: [input.email],
    subject: `${esc(input.organizationName)}, your ${AI_REALITY_DASHBOARD_NAME}`,
    html: `${SHELL_OPEN}
      <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #6b6660;">${esc(AI_REALITY_INSTRUMENT_NAME)}</p>
      <h1 style="font-size: 24px; font-weight: 600; margin: 8px 0 16px; letter-spacing: -0.02em;">${esc(input.organizationName)}, ${AI_REALITY_DASHBOARD_NAME}</h1>
      <p style="font-size: 16px; line-height: 1.6;">${p.respondedCount} of ${p.invitedCount} responded${p.provisional ? ", this is a provisional read until the rest of your team answers" : ""}.</p>
      <p style="font-size: 16px; line-height: 1.6;">${esc(p.dominantGapLine)}</p>
      <a href="${esc(input.dashboardUrl)}" style="display: inline-block; margin: 24px 0; padding: 12px 24px; background-color: #19150f; color: #faf6ee; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">Open the dashboard</a>
      ${SHELL_CLOSE}`,
    tags: [{ name: "flow", value: "ai_reality_dashboard" }],
  });

  if (error) {
    console.error("[ai-reality-email] Failed to send dashboard email:", error);
    return false;
  }
  return true;
}
