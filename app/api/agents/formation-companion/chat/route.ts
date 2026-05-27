import { NextRequest, NextResponse } from "next/server";

/**
 * Formation Companion chat API (stub).
 * Accepts conversation history and optional courseContext; returns a single assistant message.
 * Replace with real Formation Companion agent when backend is available.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const courseContext = body?.courseContext ?? {};

    // Stub: echo last user message with a short formation-oriented reply
    const lastUser = messages.filter((m: { role?: string }) => m.role === "user").pop();
    const lastContent = lastUser?.content ?? "";

    // Placeholder reply until real agent is wired; can be tuned for formation/reflection
    const reply =
      lastContent.length > 0
        ? `Thanks for sharing that. Reflecting on "${lastContent.slice(0, 40)}${lastContent.length > 40 ? "…" : ""}" — how might this connect to what you're learning in this section? Take a moment to name one concrete step you could take this week.`
        : "I'm here to support your formation in this course. What would you like to reflect on or apply from this section?";

    return NextResponse.json({
      success: true,
      data: { message: reply, courseContext },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
