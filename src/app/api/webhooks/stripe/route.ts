import { NextRequest, NextResponse } from "next/server";

import { handleStripeWebhook } from "@/lib/safety/server/stripe";

export const runtime = "nodejs";

/**
 * Stripe webhook — provisions SafeStart only on verified checkout.session.completed.
 */
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  const result = await handleStripeWebhook(rawBody, signature);
  if (!result.success) {
    const status =
      result.error.code === "invalid_signature" || result.error.code === "missing_signature"
        ? 400
        : result.error.code === "stripe_unconfigured"
          ? 503
          : 500;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ success: true, data: result.data });
}
