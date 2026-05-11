import "server-only";

import { getResend } from "@/lib/email/resend";
import { env } from "@/lib/env";

function movementalFrom(): string {
  const email = env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  return `Movemental <${email}>`;
}

function siteUrl(): string {
  return env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://movemental.com";
}

export async function sendOnboardingWelcomeEmail(toEmail: string, firstName: string | null): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  const name = firstName?.trim() || "there";
  const dashboardUrl = `${siteUrl()}/dashboard`;
  await resend.emails.send({
    from: movementalFrom(),
    replyTo: "hello@movemental.com",
    to: toEmail,
    subject: "Welcome to Movemental — let's get started",
    text: [
      `${name},`,
      "",
      "Your Movemental workspace is ready. Sign in to open your dashboard and begin onboarding.",
      "",
      `Dashboard: ${dashboardUrl}`,
      "",
      "We will walk you through a short checklist covering agreement, payment confirmation, and cohort selection before deeper identity and content steps.",
      "",
      "Movemental",
    ].join("\n"),
  });
}

export async function sendOnboardingPhase1CompleteEmail(
  toEmail: string,
  firstName: string | null,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  const name = firstName?.trim() || "there";
  const welcomeUrl = `${siteUrl()}/welcome`;
  await resend.emails.send({
    from: movementalFrom(),
    replyTo: "hello@movemental.com",
    to: toEmail,
    subject: "Thanks — your engagement is confirmed",
    text: [
      `${name},`,
      "",
      "Your Phase 1 onboarding tasks are complete. You can continue identity and preparation steps when you are ready.",
      "",
      `Open onboarding: ${welcomeUrl}`,
      "",
      "Movemental",
    ].join("\n"),
  });
}

export async function sendCorpusReadyEmail(toEmail: string, firstName: string | null): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  const name = firstName?.trim() || "there";
  const url = `${siteUrl()}/onboarding/corpus`;
  await resend.emails.send({
    from: movementalFrom(),
    replyTo: "hello@movemental.com",
    to: toEmail,
    subject: "Your research corpus is ready for review",
    text: [
      `${name},`,
      "",
      "Your compiled corpus is ready for your review inside onboarding.",
      "",
      url,
      "",
      "Movemental",
    ].join("\n"),
  });
}

export async function sendAgentReadyEmail(toEmail: string, firstName: string | null): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  const name = firstName?.trim() || "there";
  const url = `${siteUrl()}/onboarding/agent`;
  await resend.emails.send({
    from: movementalFrom(),
    replyTo: "hello@movemental.com",
    to: toEmail,
    subject: "Your AI agent is ready to test",
    text: [
      `${name},`,
      "",
      "Your AI agent is available for a short test session inside onboarding.",
      "",
      url,
      "",
      "Movemental",
    ].join("\n"),
  });
}

export async function sendOnboardingPhase2ReminderEmail(
  toEmail: string,
  firstName: string | null,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  const name = firstName?.trim() || "there";
  const welcomeUrl = `${siteUrl()}/welcome`;
  await resend.emails.send({
    from: movementalFrom(),
    replyTo: "hello@movemental.com",
    to: toEmail,
    subject: "Reminder — continue your Movemental onboarding",
    text: [
      `${name},`,
      "",
      "Phase 1 is behind you. When you have a few minutes, continue the Identity steps in your onboarding checklist.",
      "",
      welcomeUrl,
      "",
      "Movemental",
    ].join("\n"),
  });
}

export async function sendPreCohortOnboardingReminderEmail(
  toEmail: string,
  firstName: string | null,
  cohortStartLabel: string,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  const name = firstName?.trim() || "there";
  const welcomeUrl = `${siteUrl()}/welcome`;
  await resend.emails.send({
    from: movementalFrom(),
    replyTo: "hello@movemental.com",
    to: toEmail,
    subject: `Reminder — cohort starts ${cohortStartLabel}`,
    text: [
      `${name},`,
      "",
      `Your cohort start is ${cohortStartLabel}. Your onboarding checklist is still open — finishing before cohort helps us prepare.`,
      "",
      welcomeUrl,
      "",
      "Movemental",
    ].join("\n"),
  });
}

export async function sendOnboardingCompletedEmail(
  toEmail: string,
  firstName: string | null,
  cohortDateLabel: string,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  const name = firstName?.trim() || "there";
  await resend.emails.send({
    from: movementalFrom(),
    replyTo: "hello@movemental.com",
    to: toEmail,
    subject: `You are fully onboarded — see you ${cohortDateLabel}`,
    text: [
      `${name},`,
      "",
      "Your onboarding checklist is complete. We will see you at cohort start.",
      "",
      `Dashboard: ${siteUrl()}/dashboard`,
      "",
      "Movemental",
    ].join("\n"),
  });
}
