import "server-only";

import Stripe from "stripe";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { safetyEnrollments } from "@/lib/db/schema";
import { env } from "@/lib/env";
import {
  SAFETY_ENROLLMENT_AMOUNT_CENTS,
  SAFETY_ENROLLMENT_CURRENCY,
  SAFETY_ENROLLMENT_PLAN,
} from "@/lib/safety/constants";
import { assertEnrollmentAmount, parseStripeCheckoutCompleted } from "@/lib/safety/schemas";
import { provisionEngagement } from "@/lib/safety/server/enrollment";
import type { Result } from "@/lib/services/simplified/base.service";

function ok<T>(data: T): Result<T> {
  return { success: true, data };
}

function err(code: string, message: string): Result<never> {
  return { success: false, error: { code, message } };
}

function nowIso(): string {
  return new Date().toISOString();
}

function siteUrl(): string {
  return env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function createCheckoutSession(
  enrollmentId: string,
): Promise<Result<{ sessionId: string; url: string }>> {
  const secret = env.STRIPE_SECRET_KEY;
  if (!secret) {
    return err("stripe_unconfigured", "Stripe is not configured on this server.");
  }

  const [enrollment] = await db
    .select()
    .from(safetyEnrollments)
    .where(eq(safetyEnrollments.id, enrollmentId))
    .limit(1);

  if (!enrollment) {
    return err("not_found", "Enrollment not found.");
  }

  if (enrollment.status === "provisioned") {
    return err("already_provisioned", "This enrollment is already provisioned.");
  }

  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: enrollment.contact_email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: SAFETY_ENROLLMENT_CURRENCY,
            unit_amount: SAFETY_ENROLLMENT_AMOUNT_CENTS,
            product_data: {
              name: "SafeStart — AI Organizational Guidebook",
              description: "Two-week engagement ending in a ratified AI Organizational Guidebook.",
            },
          },
        },
      ],
      metadata: {
        enrollment_id: enrollmentId,
        safety_plan: SAFETY_ENROLLMENT_PLAN,
      },
      success_url: `${siteUrl()}/safestart/enroll/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl()}/safestart/enroll?cancelled=1`,
    });

    if (!session.url) {
      return err("stripe_error", "Stripe did not return a checkout URL.");
    }

    await db
      .update(safetyEnrollments)
      .set({
        stripe_checkout_session_id: session.id,
        updated_at: nowIso(),
      })
      .where(eq(safetyEnrollments.id, enrollmentId));

    return ok({ sessionId: session.id, url: session.url });
  } catch (e) {
    return err("stripe_error", e instanceof Error ? e.message : "Stripe checkout failed.");
  }
}

export async function handleStripeWebhook(
  rawBody: string,
  signature: string | null,
): Promise<Result<{ provisioned: boolean; enrollmentId?: string }>> {
  const secret = env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = env.STRIPE_SECRET_KEY;
  if (!secret || !stripeKey) {
    return err("stripe_unconfigured", "Stripe webhook is not configured.");
  }
  if (!signature) {
    return err("missing_signature", "Missing Stripe-Signature header.");
  }

  const stripe = new Stripe(stripeKey);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (e) {
    return err("invalid_signature", e instanceof Error ? e.message : "Invalid webhook signature.");
  }

  if (event.type !== "checkout.session.completed") {
    return ok({ provisioned: false });
  }

  const parsed = parseStripeCheckoutCompleted(event.data.object);
  if (!parsed.success) {
    return err("invalid_payload", "Checkout session payload failed validation.");
  }

  const session = parsed.data;
  const enrollmentId = session.metadata.enrollment_id;

  if (!assertEnrollmentAmount(session.amount_total ?? SAFETY_ENROLLMENT_AMOUNT_CENTS)) {
    return err("amount_mismatch", "Checkout amount does not match SafeStart price.");
  }

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  const paidAt = nowIso();

  const [enrollment] = await db
    .select()
    .from(safetyEnrollments)
    .where(eq(safetyEnrollments.id, enrollmentId))
    .limit(1);

  if (!enrollment) {
    return err("not_found", "Enrollment not found for checkout session.");
  }

  if (enrollment.status === "provisioned") {
    return ok({ provisioned: true, enrollmentId });
  }

  await db
    .update(safetyEnrollments)
    .set({
      status: "paid",
      paid_at: paidAt,
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: paymentIntentId,
      updated_at: paidAt,
    })
    .where(eq(safetyEnrollments.id, enrollmentId));

  const provision = await provisionEngagement(enrollmentId);
  if (!provision.success) {
    return err(provision.error.code, provision.error.message);
  }

  return ok({ provisioned: true, enrollmentId });
}
